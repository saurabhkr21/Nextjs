//@ts-nocheck
"use client";
import React, { useState } from "react";
export default function SideBar() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      name: "Business",
      count: 25730,
      icon: "💼",
      color: "bg-blue-50 border-blue-200 text-blue-700",
    },
    {
      name: "Other",
      count: 11821,
      icon: "📦",
      color: "bg-gray-50 border-gray-200 text-gray-700",
    },
    {
      name: "Advertising",
      count: 4251,
      icon: "📢",
      color: "bg-green-50 border-green-200 text-green-700",
    },
    {
      name: "Data",
      count: 3750,
      icon: "📊",
      color: "bg-purple-50 border-purple-200 text-purple-700",
    },
    {
      name: "Tools",
      count: 3603,
      icon: "🛠️",
      color: "bg-orange-50 border-orange-200 text-orange-700",
    },
    {
      name: "Artificial Intelligence/Machine Learning",
      count: 3097,
      icon: "🤖",
      color: "bg-pink-50 border-pink-200 text-pink-700",
    },
  ];

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(
      selectedCategory === categoryName ? null : categoryName
    );
  };

  return (
    <div className="flex flex-col  bg-gradient-to-b from-white to-blue-50 shadow-xl border-r border-blue-100 h-screen overflow-y-auto">
      {/* Header Section */}
      <div className="p-6 border-b border-blue-100 bg-gradient-to-r from-blue-500 to-blue-600">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="text-2xl">🔍</span>
            API Explorer
          </h2>
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-xs font-medium text-white">Categories</span>
          </div>
        </div>
        <p className="text-blue-100 text-sm mt-2 opacity-90">
          Discover and explore available APIs
        </p>
      </div>

      {/* Search/Filter Section */}
      <div className="p-4 border-b border-blue-100">
        <div className="relative">
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="p-4 border-b border-blue-100">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">
            📈 Total APIs
          </h3>
          <div className="text-2xl font-bold text-blue-600">
            {categories
              .reduce((sum, cat) => sum + cat.count, 0)
              .toLocaleString()}
          </div>
          <div className="text-xs text-blue-500 mt-1">
            Across all categories
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="flex-1 p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          API Categories
        </h3>

        <div className="space-y-2">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(category.name)}
              className={`
                group cursor-pointer transition-all duration-200 rounded-lg border p-3 hover:shadow-md transform hover:scale-[1.02]
                ${
                  selectedCategory === category.name
                    ? `${category.color} shadow-lg scale-[1.02]`
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="text-lg flex-shrink-0">{category.icon}</span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`
                      text-sm font-medium truncate
                      ${
                        selectedCategory === category.name
                          ? "text-current"
                          : "text-gray-700 group-hover:text-gray-900"
                      }
                    `}
                    >
                      {category.name}
                    </p>
                    {category.name ===
                      "Artificial Intelligence/Machine Learning" && (
                      <p className="text-xs text-gray-500 mt-1">AI/ML</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span
                    className={`
                    inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                    ${
                      selectedCategory === category.name
                        ? "bg-white/30 text-current"
                        : "bg-blue-100 text-blue-700 group-hover:bg-blue-200"
                    }
                  `}
                  >
                    {category.count.toLocaleString()}
                  </span>

                  <svg
                    className={`
                      w-4 h-4 transition-transform duration-200
                      ${
                        selectedCategory === category.name
                          ? "rotate-90 text-current"
                          : "text-gray-400 group-hover:text-gray-600"
                      }
                    `}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>

              {/* Expandable content for selected category */}
              {selectedCategory === category.name && (
                <div className="mt-3 pt-3 border-t border-white/30">
                  <div className="text-xs opacity-75">
                    <p>• Active APIs available</p>
                    <p>• Documentation included</p>
                    <p>• Rate limiting applied</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div className="p-4 border-t border-blue-100 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">Need help finding APIs?</p>
          <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg">
            💬 Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
