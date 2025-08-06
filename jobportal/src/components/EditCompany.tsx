'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Company {
  id: string;
  name: string;
  description: string;
  image_url: string;
  ownerId: string;
}

export default function EditCompany({ params }: { params: { id: string } }) {
  const { id } = params;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImage_url] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  // Fetch company data on component mount
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await fetch(`/api/company/${id}`);
        const result = await response.json();

        if (result.success) {
          const company: Company = result.data;
          setName(company.name || "");
          setDescription(company.description || "");
          setImage_url(company.image_url || "");
        } else {
          setError(result.message || "Failed to fetch company");
        }
      } catch (err) {
        setError("Failed to fetch company data");
        console.error("Error fetching company:", err);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

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

      const response = await fetch(`/api/company/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(companyData),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess("Company updated successfully!");
        
        // Redirect to company page or dashboard after 2 seconds
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setError(result.message || "Failed to update company");
      }
    } catch (err) {
      setError("Failed to update company. Please try again.");
      console.error("Error updating company:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete company
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this company? This action cannot be undone.")) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/company/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        setSuccess("Company deleted successfully!");
        
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setError(result.message || "Failed to delete company");
      }
    } catch (err) {
      setError("Failed to delete company. Please try again.");
      console.error("Error deleting company:", err);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">Loading company data...</div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Edit Company
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

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 py-2 px-4 rounded-md font-medium ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white transition duration-200`}
          >
            {loading ? "Updating..." : "Update Company"}
          </button>
          
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className={`flex-1 py-2 px-4 rounded-md font-medium ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            } text-white transition duration-200`}
          >
            {loading ? "Deleting..." : "Delete Company"}
          </button>
        </div>
      </form>
    </div>
  );
}

