//@ts-nocheck
"use client";
import { useRouter } from "next/navigation";
import SaveJob from "./SaveJob";
import JobApplyBtn from "./jobApplyBtn";
import { View } from "lucide-react";
import ViewApplicants from "./ViewApplicants";

export default function Detail({ job }) {
  const router = useRouter();
  return (
    <div className="max-w-4xl mx-auto p-6 border-slate-100 border  rounded shadow" key={job.id}>
      {/* Header Section */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          {/* {job.employer_logo && (
            <img
              src={job.employer_logo}
              alt={`${job.employer_name} Logo`}
              className="h-16 w-16 rounded-xl object-contain"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          )} */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{job.job_title}</h1>
            <p className="text-xl text-gray-700">{job.job_employer_name}</p>
            <p className="text-lg text-gray-600">{job.location}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <ViewApplicants job={job} />
          <SaveJob item={job} />
          <button
            onClick={() => router.back()}
            className="bg-gray-500 text-white px-1 py-0.5 rounded hover:bg-gray-600"
          >
            Back
          </button>
        </div>
      </div>

      {/* Job Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-3">
          <div>
            <span className="font-semibold">Employment Type: </span>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
              {job.employment_type}
            </span>
          </div>

          <div>
            <span className="font-semibold">Salary: </span>
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
              ${job.job_salary}
            </span>
          </div>
        </div>
      </div>

      {/* Job Description */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Job Description</h2>
        <div className="prose max-w-none">
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
            {job.job_description}
          </p>
        </div>
      </div>

      {/* Apply Section */}
          <JobApplyBtn job={job} />

      {/* {job.jobApplyLink && (
        <div className="border-t pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Ready to Apply?</h3>
              <p className="text-gray-600">
                Click the button below to apply for this position.
              </p>
            </div>
            <a
              href={job.jobApplyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Apply Now
            </a>
          </div>
        </div>
      )} */}
    </div>
  );
}
