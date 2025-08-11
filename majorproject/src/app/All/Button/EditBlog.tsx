"use client";

import gqlClient from "@/services/gql";
import { gql } from "graphql-request";
import { Edit2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const UPDATE_BLOG = gql`
  mutation UpdateBlog(
    $updateBlogId: String!
    $title: String
    $content: String
    $imageUrl: String
  ) {
    updateBlog(
      id: $updateBlogId
      title: $title
      content: $content
      image_url: $imageUrl
    ) {
      id
      title
      content
      image_url
      createdAt
    }
  }
`;

// Accept onAdd prop
export default function EditBlog({
  onAdd,
  blog,
}: {
  onAdd?: () => void;
  blog: any;
}) {
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [image_Url, setImageUrl] = useState(blog.image_url || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const blogData: any = await gqlClient.request(UPDATE_BLOG, {
        updateBlogId: blog.id,
        title,
        content,
        image_Url,
      });
      console.log("Updated Blog Data", blogData);

      if (blogData.updateBlog) {
        setMessage("Blog post updated!");
        setTitle("");
        setContent("");
        setImageUrl("");
        dialogRef.current?.close();
        router.refresh();
        if (onAdd) onAdd(); // Close parent dialog
      } else {
        setMessage("Something went wrong.");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update blog post. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div>
      <span
        onClick={() => dialogRef.current?.showModal()}
        className="dark:text-slate-300 text-slate-800 w-full px-2 py-2 items-center justify-center flex flex-1 rounded-md hover:bg-slate-600"
      >
        <Edit2Icon size={16} />
      </span>

      <dialog
        ref={dialogRef}
        className="rounded-lg left-100 top-30 p-6 backdrop:bg-black/30 opacity-85 max-w-xl w-full"
      >
        <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
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
