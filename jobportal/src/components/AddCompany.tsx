import { useState } from "react";

export default function AddCompany() {
  const [showModal, setShowModal] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [companyImageUrl, setCompanyImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const data = {
      name: companyName,
      description: companyDescription,
      image_url: companyImageUrl || null,
    };

    try {
      const res = await fetch("http://localhost:3000/api/company", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      
      const result = await res.json();
      
      if (result.success) {
        alert("Company added successfully!");
        setShowModal(false);
        setCompanyName("");
        setCompanyDescription("");
        setCompanyImageUrl("");
      } else {
        alert(result.message || "Failed to add company");
      }
    } catch (error) {
      console.error("Error adding company:", error);
      alert("Failed to add company. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        className="bg-slate-100 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 px-3 py-2 rounded-lg text-xs md:text-sm font-medium text-gray-700 transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md"
        onClick={() => setShowModal(true)}
      >
        🏢 Add Company
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
            <h2 className="text-xl font-bold mb-2">Add Company</h2>
            <p className="mb-4 text-gray-600">Add your company details.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Company Name *</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter company name"
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Description *</label>
                <textarea
                  value={companyDescription}
                  onChange={(e) => setCompanyDescription(e.target.value)}
                  placeholder="Enter company description"
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Company Logo URL</label>
                <input
                  type="url"
                  value={companyImageUrl}
                  onChange={(e) => setCompanyImageUrl(e.target.value)}
                  placeholder="https://example.com/logo.png"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  onClick={() => setShowModal(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
