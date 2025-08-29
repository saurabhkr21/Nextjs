"use client";
import { ArrowLeft, Briefcase, Building, DollarSign, MapPin, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddJob() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobSalary, setJobSalary] = useState("");
  const [jobCategory, setJobCategory] = useState("fullTime");
  const [jobType, setJobType] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [employerLogo, setEmployerLogo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const employmentTypes = [
    { value: "fullTime", label: "Full-time" },
    { value: "partTime", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "freelance", label: "Freelance" },
    { value: "internship", label: "Internship" },
  ];

  async function handleSubmit(e: any) {
    if (e && e.preventDefault) e.preventDefault();
    setIsSubmitting(true);

    const data = {
      job_title: jobTitle,
      job_description: jobDescription,
      job_salary: parseInt(jobSalary),
      job_type: jobType,
      employment_type: jobCategory,
      job_location: jobLocation,
      employer_name: employerName,
      employer_logo: employerLogo,
    };

    try {
      const res = await fetch(`http://localhost:3000/api/job`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      const result = await res.json();

      if (result.success) {
        setJobTitle("");
        setJobDescription("");
        setJobSalary("");
        setJobCategory("fullTime");
        setJobType("");
        setJobLocation("");
        setEmployerName("");
        setEmployerLogo("");
        alert("Job posted successfully!");
      } else {
        alert("Error posting job: " + (result.message || "Unknown error"));
      }
    } catch (error: any) {
      alert("Error posting job: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  }
  const router = useRouter();

  function handleReset() {
    setJobTitle("");
    setJobDescription("");
    setJobSalary("");
    setJobCategory("fullTime");
    setJobType("");
    setJobLocation("");
    setEmployerName("");
    setEmployerLogo("");
  }
  function handleBack() {
    router.back();
  }

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
        <div
          className={`relative w-full max-h-[100vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100`}
        >
          <div className="sticky top-0 z-10 bg-slate-800 flex items-center justify-between p-4 backdrop-blur-sm">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Post New Job
              </h2>
            <button
              onClick={handleBack}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
               <ArrowLeft size={20} />
            </button>
          </div>

          <div className="p-3 space-y-3">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-semibold text-sm">
                  <Briefcase size={16} />
                  Job Title *
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Senior React Developer"
                  className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 font-semibold text-sm">
                  <MapPin size={16} />
                  Location *
                </label>
                <input
                  type="text"
                  value={jobLocation}
                  onChange={(e) => setJobLocation(e.target.value)}
                  placeholder="e.g. San Francisco, CA"
                  className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 font-semibold text-sm">
                <Briefcase size={16} />
                Job Description *
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Describe the role, responsibilities, and requirements..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-semibold text-sm">
                  <DollarSign size={16} />
                  Salary
                </label>
                <input
                  type="number"
                  value={jobSalary}
                  onChange={(e) => setJobSalary(e.target.value)}
                  placeholder="50000"
                  className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 font-semibold text-sm">
                  Employment Type
                </label>
                <select
                  value={jobCategory}
                  onChange={(e) => setJobCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {employmentTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 font-semibold text-sm">
                  Job Category
                </label>
                <input
                  type="text"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  placeholder="e.g. Technology, Marketing"
                  className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-semibold text-sm">
                  <Building size={16} />
                  Company Name
                </label>
                <input
                  type="text"
                  value={employerName}
                  onChange={(e) => setEmployerName(e.target.value)}
                  placeholder="e.g. Tech Corp Inc."
                  className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-semibold text-sm">
                  Company Logo URL
                </label>
                <input
                  type="url"
                  value={employerLogo}
                  onChange={(e) => setEmployerLogo(e.target.value)}
                  placeholder="https://example.com/logo.png"
                  className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex flex-col-reverse md:flex-row justify-end gap-3 pt-6 border-t">
              <button
                type="button"
                onClick={handleReset}
                className="px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Posting...
                  </div>
                ) : (
                  "Post Job"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}