"use client";
import EditBlog from "@/components/Button/EditBlog";
import gqlClient from "@/services/gql";
import { gql } from "graphql-request";
import { CalendarIcon, ImageIcon, Trash2Icon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { blog } from "../../../../generated/prisma";

const CURRENT_USER_BLOG = gql`
  query CurrentUserBlogs {
    currentUserBlogs {
      id
      title
      content
      image_url
      createdAt
    }
  }
`;

export default function MyBlogPage() {
  const [userBlog, setUserBlog] = useState<blog[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function getCurrentUserBlogs() {
      try {
        const data: { currentUserBlogs: blog[] } = await gqlClient.request(CURRENT_USER_BLOG);
        if (data && data.currentUserBlogs) {
          setUserBlog(data.currentUserBlogs);
        }
      } catch (err) {
        console.error("Error fetching user blogs:", err);
      }
    }
    getCurrentUserBlogs();
  }, []);

  async function handleDelete(blogId: string) {
    alert("Delete functionality not implemented.");
  }

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <h2 className="text-3xl font-extrabold mb-8 text-blue-700 dark:text-blue-400 text-center tracking-tight">
        My Blogs
      </h2>
      {userBlog.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-300">
          <ImageIcon className="w-12 h-12 mb-4" />
          <span className="text-lg font-semibold">No blogs found</span>
          <span className="text-sm mt-2">
            Start writing and sharing your thoughts!
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {userBlog.map((blog) => (
            <div
              key={blog.id}
              className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition cursor-pointer h-[420px]"
              onClick={() => router.push(`/blog/${blog.id}`)}
              style={{ minHeight: 420 }}
            >
              <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-2 line-clamp-1">
                {blog.title}
              </h3>
              {blog.image_url && (
                <div className="flex justify-center items-center mb-2">
                  <img
                    src={blog.image_url}
                    alt={blog.title}
                    className="rounded-lg shadow object-cover h-[160px] w-full max-w-xs"
                    style={{ height: 160, objectFit: "cover" }}
                  />
                </div>
              )}
              <p className="mt-2 text-gray-700 line-clamp-3 dark:text-gray-200 flex-1">
                {blog.content}
              </p>
              <div className="flex items-center justify-between mt-4 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <CalendarIcon className="w-4 h-4" />
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <UserIcon className="w-4 h-4" />
                  You
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
