//@ts-nocheck
"use client";
import gqlClient from "@/services/gql";
import { gql } from "graphql-request";
import { useEffect, useState } from "react";

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
  const [userBlog, setUserBlog] = useState<any[]>([]);

  useEffect(() => {
    async function getCurrentUserBlogs() {
      try {
        const data = await gqlClient.request(CURRENT_USER_BLOG);
        if (data && data.currentUserBlogs) {
          setUserBlog(data.currentUserBlogs);
        }
      } catch (err) {
        console.error("Error fetching user blogs:", err);
      }
    }
    getCurrentUserBlogs();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">My Blogs</h2>
      {userBlog.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <div className="grid gap-6">
          {userBlog.map((blog) => (
            <div key={blog.id} className="border rounded-lg p-4 shadow">
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <p className="mt-2">{blog.content}</p>
              {blog.image_url && (
                <img
                  src={blog.image_url}
                  alt={blog.title}
                  className="mt-4 w-full max-w-xs rounded"
                />
              )}
              <p className="text-xs text-gray-500 mt-2">
                Created at: {new Date(blog.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
