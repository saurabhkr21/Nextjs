"use client";

import { useRef, useState } from "react";

// Accept onAdd prop
export default function AddBlog({ onAdd }: { onAdd?: () => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, image_url: imageUrl }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Blog post added!");
      setTitle("");
      setContent("");
      setImageUrl("");
      dialogRef.current?.close();
      if (onAdd) onAdd(); // Close parent dialog
    } else {
      setMessage(data.error || "Something went wrong.");
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
        className="rounded-lg left-140 top-40 p-6 backdrop:bg-black/30 opacity-85 max-w-xl w-full"
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
            value={imageUrl}
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
