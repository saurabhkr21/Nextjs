//@ts-nocheck
"use client";

import { useUserContext } from "@/contexts/UserContextProvider";
import { DeleteIcon, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { application } from "../../generated/prisma";

export default function ViewApplicants({ job }) {
  const { userData } = useUserContext();
  const [applicants, setApplicants] = useState<application[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function getApplicants() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/applicants/" + job.id);
        const data = await res.json();
        console.log("Applicants data:", data);
        if (data.success) {
          setApplicants(data.data);
        } else {
          setApplicants([]);
        }
      } catch (err) {
        console.error("Failed to fetch applicants", err);
        setApplicants([]);
      } finally {
        setIsLoading(false);
      }
    }

    if (open) {
      getApplicants();
    }
  }, [open, job.id]);

  // if (userData?.company?.id === job.company.id) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 text-sm bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-100 px-4 py-2 rounded hover:bg-zinc-300 dark:hover:bg-zinc-600 transition"
      >
        View Applicants
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 dark:bg-opacity-80"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md p-4 rounded-lg shadow-lg overflow-y-auto max-h-[90vh] bg-white dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Job Applicants
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <DeleteIcon />
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              List of top Applicants
            </p>

            {isLoading ? (
              <div className="flex justify-center items-center h-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : applicants?.length > 0 ? (
              <div className="flex flex-col gap-3 ">
                {applicants.map((app) => (
                  <div
                    key={app.id}
                    className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-700 dark:text-gray-200">
                        <strong>Applicant ID:</strong> {app.id}
                      </p>
                      <button
                        onClick={() => console.log("Delete applicant", app.id)}
                        className=" hover:text-red-700"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-200">
                      <strong>User ID:</strong> {app.user.email || app.user.id}
                    </p>
                    <p className="text-sm">
                      <strong>Status:</strong>{" "}
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                          app.status === "APPLIED"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {app.status}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No applicants yet or failed to load.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
