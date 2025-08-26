"use client";
import { useUserContext } from "@/contexts/UserContextProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteJobBtn({ job, jobId }: { job: any; jobId: string }) {
  const { userData } = useUserContext();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/job/${jobId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      alert(data.message);
      router.push("/jobs");
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className=" hover:bg-red-400 flex justify-center text-white text-sm items-center mx-auto font-medium py-2 px-4 rounded transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-trash"
          viewBox="0 0 16 16"
        >
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
        </svg>
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-zinc-700 rounded-lg shadow-xl p-6 w-full max-w-sm">
            <h2 className="text-sm font-semibold text-zinc-800 dark:text-white mb-2">
              Delete Job
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              Are you sure? This action cannot be undone.
            </p>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className={`px-4 py-2 text-sm rounded text-white ${
                  loading
                    ? "bg-red-300 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
