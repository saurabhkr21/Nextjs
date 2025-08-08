// @ts-nocheck
"use client";
import { useRouter } from "next/navigation";
import SaveJob from "./SaveJob";
import JobApplyBtn from "./jobApplyBtn";
import ViewApplicants from "./ViewApplicants";
import { Briefcase, MapPin, Building2, ArrowLeft } from "lucide-react";

export default function Detail({ job, p }) {
  const router = useRouter();

  return (
    <div className=" mx-auto p-6 my-6 rounded-xl shadow-md w-full   dark:border-zinc-700 transition-colors duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          {job.employer_logo && (
            <img
              src={job.employer_logo}
              alt={`${job.employer_name} Logo`}
              className="h-16 w-16 rounded-xl object-contain border"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          )}
          <div>
            <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">
              {job.job_title}
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-300 flex items-center gap-1">
              <Building2 size={16} />
              {job.employer_name}
            </p>
            <p className="text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
              <MapPin size={16} />
              {job.job_location || "Remote"}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <ViewApplicants job={job} />
          <SaveJob item={job} />
          <JobApplyBtn job={job} />
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-sm bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-100 px-3 py-1 rounded hover:bg-zinc-300 dark:hover:bg-zinc-600"
          >
            <ArrowLeft size={14} />
            Back
          </button>
          
        </div>
      </div>

      {/* Info Section */}
      <div className="flex justify-between gap-4 mb-6">
        <InfoItem label="Employment Type" value={job.employment_type} color="blue" />
        <InfoItem label="Job Type" value={job.job_type} color="purple" />
      </div>
      <div className="flex justify-between gap-4 mb-6">
        <InfoItem label="Salary" value={`$${job.job_salary}`} color="green" />
      </div>
      {/* Description */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
          Job Description
        </h2>
        <p className="whitespace-pre-line leading-relaxed text-zinc-600 dark:text-zinc-300">
          {job.job_description}
        </p>
      </section>

      {job.jobApplyLink && (
        <section className="border-t pt-6 mt-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-1">
                Ready to Apply?
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                Click the button below to apply directly.
              </p>
            </div>
            
          </div>
        </section>
      )}
    </div>
  );
}

// Reusable info item
function InfoItem({ label, value, color }) {
  const bg = {
    blue: "bg-blue-100 dark:bg-blue-900",
    green: "bg-green-100 dark:bg-green-900",
    purple: "bg-purple-100 dark:bg-purple-900",
  }[color];

  const text = {
    blue: "text-blue-700 dark:text-blue-300",
    green: "text-green-700 dark:text-green-300",
    purple: "text-purple-700 dark:text-purple-300",
  }[color];

  return (
    <div>
      <span className="font-medium text-zinc-700 dark:text-zinc-200">
        {label}:{" "}
      </span>
      <span className={`inline-block px-2 py-1 rounded text-sm ${bg} ${text}`}>
        {value || "N/A"}
      </span>
    </div>
  );
}
