'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AddCompany = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImage_url] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validation
    if (!name.trim()) {
      setError("Company name is required");
      setLoading(false);
      return;
    }
    if (!description.trim()) {
      setError("Company description is required");
      setLoading(false);
      return;
    }

    try {
      const companyData = {
        name: name.trim(),
        description: description.trim(),
        image_url: image_url.trim() || null,
      };

      const response = await fetch("/api/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(companyData),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess("Company added successfully!");
        // Reset form
        setName("");
        setDescription("");
        setImage_url("");
        
        // Redirect to company page or dashboard after 2 seconds
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setError(result.message || "Failed to add company");
      }
    } catch (err) {
      setError("Failed to add company. Please try again.");
      console.error("Error adding company:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Add Company
      </h2>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Company Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Company Name *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter company name"
            required
          />
        </div>

        {/* Company Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description *
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter company description"
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label
            htmlFor="image_url"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Company Logo URL
          </label>
          <input
            type="url"
            id="image_url"
            value={image_url}
            onChange={(e) => setImage_url(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/logo.png"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md font-medium ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white transition duration-200`}
        >
          {loading ? "Adding Company..." : "Add Company"}
        </button>
      </form>
    </div>
  );
};

export default AddCompany;
