import { useState } from "react";

export default function AddJob() {
  const [showModal, setShowModal] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [salaryNum, setSalaryNum] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [job_location, setJob_location] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      job_title: jobTitle,
      job_description: jobDescription,
      job_salary: salaryNum,
      job_type: jobType,
      employment_type: jobCategory,
      job_location: job_location,
    };

    const res = await fetch("http://localhost:3000/api/job", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const x = await res.json();
    if (x.success) {
      alert("saved");
      setShowModal(false);
      setJobTitle("");
      setJobDescription("");
      setSalaryNum("");
      setJobCategory("");
      setJobType("");
      setJob_location("");
    }
  }

  return (
    <>
      <button
        className="bg-slate-100 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 px-3 py-2 rounded-lg text-xs md:text-sm font-medium text-gray-700 transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md"
        onClick={() => setShowModal(true)}
      >
        🏪 Add Job
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2">Add Job</h2>
            <p className="mb-4 text-gray-600">Add your job details.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Title</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Enter job title"
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Description</label>
                <input
                  type="text"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Description"
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Salary</label>
                <input
                  type="number"
                  value={salaryNum}
                  onChange={(e) => setSalaryNum(e.target.value)}
                  placeholder="Salary"
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">
                  Employment Type
                </label>
                <input
                  type="text"
                  value={jobCategory}
                  onChange={(e) => setJobCategory(e.target.value)}
                  placeholder="e.g. Full-time, Part-time"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Job Type</label>
                <input
                  type="text"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  placeholder="e.g. Tech, Marketing"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Location</label>
                <input
                  type="text"
                  value={job_location}
                  onChange={(e) => setJob_location(e.target.value)}
                  placeholder="Location"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
