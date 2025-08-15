"use client";

import gqlClient from "@/lib/services/gql";
import { gql } from "graphql-request";
import { useRef, useState } from "react";

const CREATE_BLOG = gql`
  mutation CreateBlog($title: String!, $content: String!, $imageUrl: String) {
    createBlog(title: $title, content: $content, image_url: $imageUrl) {
      id
      title
      content
      image_url
      createdAt
    }
  }
`;

export default function AddBlog({ onAdd }: { onAdd?: () => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image_Url, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const blogData: any = await gqlClient.request(CREATE_BLOG, {
        title,
        content,
        image_url: image_Url ? image_Url : null,
      });
      console.log("Blog Data", blogData);

      if (blogData.createBlog) {
        setMessage("Blog post added!");
        setTitle("");
        setContent("");
        setImageUrl("");
        dialogRef.current?.close();
        if (onAdd) onAdd(); // Close parent dialog
      } else {
        setMessage("Something went wrong.");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Failed to create blog post. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div>
      <button
        onClick={() => dialogRef.current?.showModal()}
        className="dark:text-white text-slate-800 w-full px-2 py-2 items-center justify-center flex flex-1 hover:border-2 rounded hover:bg-blue-500"
      >
        Add Blog
      </button>

      <dialog
        ref={dialogRef}
        className="rounded-lg left-100 top-30 p-6 backdrop:bg-black/30 opacity-85 max-w-xl w-full"
      >
        <h2 className="text-2xl font-bold mb-4">Add Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded p-2"
            required
          />

          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded p-2 h-40"
            required
          />

          <input
            type="text"
            placeholder="Image URL"
            value={image_Url}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full border rounded p-2"
            required
          />

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="px-4 py-2 border rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="dark:bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>

          {message && <p className="text-green-600 mt-2">{message}</p>}
        </form>
      </dialog>
    </div>
  );
}
