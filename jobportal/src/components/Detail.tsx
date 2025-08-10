// @ts-nocheck
"use client";
import {
  ArrowLeft,
  BadgeInfo,
  Building2,
  CalendarCheck,
  DollarSign,
  MapPin,
} from "lucide-react";
import { useRouter } from "next/navigation";
import JobApplyBtn from "./jobApplyBtn";
import SaveJob from "./SaveJob";
import ViewApplicants from "./ViewApplicants";
import DeleteJobBtn from "./DeleteJobBtn";
import { useUserContext } from "@/contexts/UserContextProvider";
import Reviews from "./Reviews";

export default function Detail({ job }) {
  const router = useRouter();
  const { userData } = useUserContext();

  const isOwner = userData?.id && job?.id === userData.id;
  console.log("Job Detail:", isOwner);
  console.log("user data:", userData?.id);
  console.log("Job User ID:", job?.id);
  return (
    <div className="mx-auto p-8 my-8 rounded-2xl shadow-lg w-full max-w-4xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start justify-between mb-8 gap-6">
        <div className="flex items-center gap-6">
          {job.employer_logo && (
            <img
              src={job.employer_logo}
              alt={`${job.employer_name} Logo`}
              className="h-20 w-20 rounded-2xl object-contain border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          )}
          <div>
            <h1 className="text-4xl font-extrabold text-zinc-800 dark:text-zinc-100 mb-2">
              {job.job_title}
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-300 flex items-center gap-2">
              <Building2 size={18} />
              {job.employer_name}
            </p>
            <p className="text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
              <MapPin size={18} />
              {job.job_location || "Remote"}
            </p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          <SaveJob item={job} />

          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-sm bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-100 px-4 py-2 rounded hover:bg-zinc-300 dark:hover:bg-zinc-600 transition"
          >
            <ArrowLeft size={16} />
          </button>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap items-center">
        <JobApplyBtn job={job} />
        <ViewApplicants job={job} />
      </div>

      <hr className="mb-8 border-zinc-200 dark:border-zinc-700" />

      {/* Info Section */}
      <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
        <InfoItem
          label="Employment Type"
          value={job.employment_type}
          color="blue"
          icon={<BadgeInfo size={16} />}
        />
        <InfoItem
          label="Job Type"
          value={job.job_type}
          color="purple"
          icon={<CalendarCheck size={16} />}
        />
        <InfoItem
          label="Salary"
          value={job.job_salary ? `$${job.job_salary.toLocaleString()}` : "N/A"}
          color="green"
          icon={<DollarSign size={16} />}
        />
      </div>

      {/* Description */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
          Job Description
        </h2>
        <p className="whitespace-pre-line leading-relaxed text-zinc-600 dark:text-zinc-300 text-base">
          {job.job_description}
        </p>
      </section>

      {job.jobApplyLink && (
        <section className="border-t pt-8 mt-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-1">
                Ready to Apply?
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                Click the button below to apply directly.
              </p>
            </div>
            <a
              href={job.jobApplyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
            >
              Apply Now
            </a>
          </div>
        </section>
      )}

      {isOwner && (
        <div className="flex items-center z-100 gap-2">
          <DeleteJobBtn jobId={job.id} job={job} />
        </div>
      )}

      <hr className="mb-8 border-zinc-200 dark:border-zinc-700" />
      {/* <Reviews company={job} reviews={user.owner.reviews} /> */}
    </div>
  );
}

// Reusable info item
function InfoItem({ label, value, color, icon }) {
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
    <div className="flex items-center gap-2">
      {icon}
      <span className="font-medium text-zinc-700 dark:text-zinc-200">
        {label}:
      </span>
      <span className={`inline-block px-2 py-1 rounded text-sm ${bg} ${text}`}>
        {value || "N/A"}
      </span>
    </div>
  );
}
