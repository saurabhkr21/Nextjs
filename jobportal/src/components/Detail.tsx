//@ts-nocheck
"use client";
import { useRouter } from "next/navigation";
import SaveJob from "./SaveJob";

export default function Detail({ job }) {
    const router = useRouter();
    return (
        <div
            className="max-w-4xl mx-auto p-6 bg-white rounded shadow"
            key={job.job_id}
        >
            {/* Header Section */}
            <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                    {job.employer_logo && (
                        <img
                            src={job.employer_logo}
                            alt={`${job.employer_name} Logo`}
                            className="h-16 w-16 rounded-xl object-contain"
                            onError={(e) => {
                                e.target.style.display = "none";
                            }}
                        />
                    )}
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{job.job_title}</h1>
                        <p className="text-xl text-gray-700">{job.employer_name}</p>
                        <p className="text-lg text-gray-600">{job.job_location}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <SaveJob item={job} />
                    <button
                        onClick={() => router.back()}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
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
                            {job.job_employment_type}
                        </span>
                    </div>

                    {(job.job_min_salary || job.job_max_salary) && (
                        <div>
                            <span className="font-semibold">Salary: </span>
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                                {job.job_min_salary && job.job_max_salary
                                    ? `$${job.job_min_salary} - $${job.job_max_salary}`
                                    : job.job_max_salary
                                        ? `Up to $${job.job_max_salary}`
                                        : job.job_min_salary
                                            ? `From $${job.job_min_salary}`
                                            : "Not specified"}
                                {job.job_salary_period &&
                                    ` per ${job.job_salary_period.toLowerCase()}`}
                            </span>
                        </div>
                    )}

                    <div>
                        <span className="font-semibold">Posted: </span>
                        <span className="text-gray-600">{job.job_posted_at}</span>
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

            {/* Job Highlights */}
            {job.job_highlights && (
                <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-3">Job Highlights</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {job.job_highlights.Qualifications && (
                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-blue-600">
                                    Qualifications
                                </h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    {Array.isArray(job.job_highlights.Qualifications) ? (
                                        job.job_highlights.Qualifications.map((qual, index) => (
                                            <li key={index} className="text-gray-700">
                                                {qual}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-gray-700">
                                            {job.job_highlights.Qualifications}
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}

                        {job.job_highlights.Responsibilities && (
                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-green-600">
                                    Responsibilities
                                </h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    {Array.isArray(job.job_highlights.Responsibilities) ? (
                                        job.job_highlights.Responsibilities.map((resp, index) => (
                                            <li key={index} className="text-gray-700">
                                                {resp}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-gray-700">
                                            {job.job_highlights.Responsibilities}
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}

                        {job.job_highlights.Benefits && (
                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-purple-600">
                                    Benefits
                                </h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    {Array.isArray(job.job_highlights.Benefits) ? (
                                        job.job_highlights.Benefits.map((benefit, index) => (
                                            <li key={index} className="text-gray-700">
                                                {benefit}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-gray-700">
                                            {job.job_highlights.Benefits}
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Apply Section */}
            {job.job_apply_link && (
                <div className="border-t pt-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Ready to Apply?</h3>
                            <p className="text-gray-600">
                                Click the button below to apply for this position.
                            </p>
                        </div>
                        <a
                            href={job.job_apply_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
                        >
                            Apply Now
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
