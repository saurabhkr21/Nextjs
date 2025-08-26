"use client"
import { useState } from "react";
import {
  Moon,
  Sun,
  X,
  Briefcase,
  MapPin,
  DollarSign,
  Building,
} from "lucide-react";

export default function AddJob() {
  const [isDark, setIsDark] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/job`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      const result = await res.json();

      if (result.success) {
        // Reset form
        setJobTitle("");
        setJobDescription("");
        setJobSalary("");
        setJobCategory("fullTime");
        setJobType("");
        setJobLocation("");
        setEmployerName("");
        setEmployerLogo("");
        setShowModal(false);
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

  const theme = isDark ? "dark" : "";

  return (
    <div className={theme}>
      <div className="flex items-center gap-3">
        <button
          className={`relative group overflow-hidden rounded-xl  text-md transition-all duration-300 transform hover:scale-105 ${
            isDark ? "text-white border-gray-700 " : "border-gray-300"
          }`}
          onClick={() => setShowModal(true)}
        >
          <div className="absolute inset-0 bg-white opacity-0 hover:text-blue-600 transition-opacity duration-300"></div>
          <div className="relative flex items-center gap-2 hover:text-blue-400">
            {/* <Briefcase size={16} /> */}
            Add Job
          </div>
        </button>

        {/* <button
          onClick={() => setIsDark(!isDark)}
          className={`p-2 rounded-lg transition-all duration-300 ${
            isDark
              ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button> */}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
          <div
            className={`relative w-full max-w-2xl max-h-[100vh] overflow-y-auto rounded-2xl shadow-2xl transform transition-all duration-300 scale-100 ${
              isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
            }`}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b backdrop-blur-sm bg-opacity-90 ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'}">
              <div>
                <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Post New Job
                </h2>
              </div>
              <button
                className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                  isDark
                    ? "text-gray-400 hover:text-white hover:bg-gray-800"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setShowModal(false)}
                disabled={isSubmitting}
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-3 space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    className={`flex items-center gap-2 font-semibold text-sm ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <Briefcase size={16} />
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Senior React Developer"
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDark
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:bg-gray-750"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-gray-50"
                    }`}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className={`flex items-center gap-2 font-semibold text-sm ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <MapPin size={16} />
                    Location *
                  </label>
                  <input
                    type="text"
                    value={jobLocation}
                    onChange={(e) => setJobLocation(e.target.value)}
                    placeholder="e.g. San Francisco, CA"
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDark
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:bg-gray-750"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-gray-50"
                    }`}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  className={`flex items-center gap-2 font-semibold text-sm ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <Briefcase size={16} />
                  Job Description *
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Describe the role, responsibilities, and requirements..."
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                    isDark
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:bg-gray-750"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-gray-50"
                  }`}
                  required
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label
                    className={`flex items-center gap-2 font-semibold text-sm ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <DollarSign size={16} />
                    Salary
                  </label>
                  <input
                    type="number"
                    value={jobSalary}
                    onChange={(e) => setJobSalary(e.target.value)}
                    placeholder="50000"
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDark
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:bg-gray-750"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-gray-50"
                    }`}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className={`flex items-center gap-2 font-semibold text-sm ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Employment Type
                  </label>
                  <select
                    value={jobCategory}
                    onChange={(e) => setJobCategory(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDark
                        ? "bg-gray-800 border-gray-700 text-white focus:bg-gray-750"
                        : "bg-white border-gray-300 text-gray-900 focus:bg-gray-50"
                    }`}
                  >
                    {employmentTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    className={`flex items-center gap-2 font-semibold text-sm ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Job Category
                  </label>
                  <input
                    type="text"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    placeholder="e.g. Technology, Marketing"
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDark
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:bg-gray-750"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-gray-50"
                    }`}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    className={`flex items-center gap-2 font-semibold text-sm ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <Building size={16} />
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={employerName}
                    onChange={(e) => setEmployerName(e.target.value)}
                    placeholder="e.g. Tech Corp Inc."
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDark
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:bg-gray-750"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-gray-50"
                    }`}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className={`flex items-center gap-2 font-semibold text-sm ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Company Logo URL
                  </label>
                  <input
                    type="url"
                    value={employerLogo}
                    onChange={(e) => setEmployerLogo(e.target.value)}
                    placeholder="https://example.com/logo.png"
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDark
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:bg-gray-750"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-gray-50"
                    }`}
                  />
                </div>

                
              </div>

              <div
                className={`flex flex-col-reverse md:flex-row justify-end gap-3 pt-6 border-t ${
                  isDark ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <button
                  type="button"
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                    isDark
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                  }`}
                  onClick={() => setShowModal(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  className={`px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                    isDark
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                  }`}
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
      )}
    </div>
  );
}
