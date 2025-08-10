//@ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  Eye,
  User,
  DeleteIcon,
  Edit2Icon,
} from "lucide-react";
import { gql } from "graphql-request";
import gqlClient from "@/services/gql";
import EditBlog from "./Button/EditBlog";

const DELETE_BLOG = gql`
  mutation Mutation($deleteBlogId: String!) {
    deleteBlog(id: $deleteBlogId)
  }
`;

export default function BlogDetail({ blog }) {
  const darkMode = true; // Replace with your dark mode state
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  async function handleDelete() {
    const confirmed = confirm("Are you sure you want to delete this blog?");
    if (confirmed) {
      try {
        const data = await gqlClient.request(DELETE_BLOG, {
          deleteBlogId: blog.id,
        });
        if (data.deleteBlog) {
          alert("Blog deleted successfully.");
        } else {
          alert("Failed to delete blog.");
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  }

  function onBack() {
    window.history.back();
  }

  // Calculate reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      full: date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      short: date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const getReadingTime = (text) => {
    const wordsPerMinute = 200;
    const words = text.split(" ").length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.content.slice(0, 100) + "...",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  const dateInfo = formatDate(blog.createdAt);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
      }`}
    >
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200/20 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Header Actions */}
      <div
        className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 ${
          darkMode
            ? "bg-gray-900/80 border-gray-700"
            : "bg-white/80 border-gray-200"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                darkMode
                  ? "text-gray-300 hover:text-white hover:bg-gray-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <ArrowLeft size={20} />
              Back
            </button>

            <div className="flex items-center gap-2">
              <EditBlog blog={blog} />
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isBookmarked
                    ? "text-blue-500 bg-blue-50 dark:bg-blue-500/20"
                    : darkMode
                    ? "text-gray-400 hover:text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <Bookmark
                  size={20}
                  fill={isBookmarked ? "currentColor" : "none"}
                />
              </button>

              <button
                onClick={handleDelete}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  darkMode
                    ? "text-gray-400 hover:text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <DeleteIcon size={20} />
              </button>

              <button
                onClick={handleShare}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  darkMode
                    ? "text-gray-400 hover:text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Article Header */}
        <header className="mb-8">
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div
              className={`flex items-center gap-2 text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <Calendar size={16} />
              <time dateTime={blog.createdAt} title={dateInfo.full}>
                {dateInfo.short}
              </time>
            </div>

            <div
              className={`flex items-center gap-2 text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <Clock size={16} />
              <span>{getReadingTime(blog.content)} min read</span>
            </div>

            <div
              className={`flex items-center gap-2 text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <Eye size={16} />
              <span>1,234 views</span>
            </div>
          </div>

          {/* Title */}
          <h1
            className={`text-4xl md:text-5xl font-bold leading-tight mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {blog.title}
          </h1>

          {/* Author Info */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <User
                size={20}
                className={darkMode ? "text-gray-400" : "text-gray-600"}
              />
            </div>
            <div>
              <p
                className={`font-medium ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Saurabh Kumar
              </p>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Published on {dateInfo.short} at {dateInfo.time}
              </p>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {blog.image_url && (
          <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative">
              <img
                src={blog.image_url}
                alt={blog.title}
                className={`w-full h-auto object-cover transition-opacity duration-500 `}
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div
          className={`prose prose-lg max-w-none ${
            darkMode
              ? "prose-invert prose-headings:text-white prose-p:text-gray-300 prose-a:text-blue-400"
              : "prose-gray prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600"
          }`}
        >
          <div className="whitespace-pre-wrap leading-relaxed text-lg">
            {blog.content}
          </div>
        </div>

        {/* Tags Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3
            className={`text-lg font-semibold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {["React", "JavaScript", "Web Development", "Frontend"].map(
              (tag) => (
                <span
                  key={tag}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    darkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  #{tag}
                </span>
              )
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div
          className={`mt-12 p-8 rounded-2xl border ${
            darkMode
              ? "bg-gray-800/50 border-gray-700"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="text-center">
            <h3
              className={`text-xl font-bold mb-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Enjoyed this article?
            </h3>
            <p
              className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Subscribe to get notified about new posts and updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200">
                Subscribe
              </button>
              <button
                className={`px-6 py-3 font-medium rounded-lg transition-colors duration-200 ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300"
                }`}
              >
                Share Article
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

// // Demo Component
// const BlogDetailDemo = () => {
//   const [darkMode, setDarkMode] = useState(false);
//   const [showDetail, setShowDetail] = useState(true);

//   const sampleBlog = {
//     id: "1",
//     title: "The Complete Guide to Modern React Development",
//     content: `Welcome to the comprehensive guide on modern React development! This article will take you through everything you need to know to build scalable, maintainable React applications in 2025.

// React has evolved significantly over the years, and with it, the patterns and practices we use to build applications. From the introduction of hooks to the latest concurrent features, React continues to push the boundaries of what's possible in frontend development.

// In this guide, we'll explore:

// • Component composition and reusability patterns
// • State management strategies for different application sizes
// • Performance optimization techniques
// • Testing methodologies and best practices
// • Modern tooling and development workflows

// Whether you're just starting with React or looking to level up your existing skills, this guide will provide you with the knowledge and practical examples you need to succeed.

// Let's dive into the world of modern React development and discover how to build applications that are not only functional but also maintainable, scalable, and performant.

// The journey of learning React is ongoing, and staying updated with the latest patterns and practices is crucial for any developer looking to excel in frontend development. By the end of this article, you'll have a solid understanding of the current React ecosystem and be well-equipped to tackle any React project that comes your way.`,
//     image_url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
//     createdAt: "2025-01-10T10:30:00Z"
//   };

//   if (!showDetail) {
//     return (
//       <div className={`min-h-screen flex items-center justify-center ${
//         darkMode ? 'bg-gray-900' : 'bg-gray-50'
//       }`}>
//         <div className="text-center">
//           <h2 className={`text-2xl font-bold mb-4 ${
//             darkMode ? 'text-white' : 'text-gray-900'
//           }`}>
//             Blog Detail Component Demo
//           </h2>
//           <button
//             onClick={() => setShowDetail(true)}
//             className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
//           >
//             View Blog Detail
//           </button>
//           <br />
//           <button
//             onClick={() => setDarkMode(!darkMode)}
//             className={`mt-4 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
//               darkMode
//                 ? 'bg-gray-700 text-white hover:bg-gray-600'
//                 : 'bg-white text-gray-900 hover:bg-gray-100 shadow-md'
//             }`}
//           >
//             {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <BlogDetail
//       blog={sampleBlog}
//       darkMode={darkMode}
//       onBack={() => setShowDetail(false)}
//     />
//   );
// };

// export default BlogDetailDemo;
