"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function SearchBarInput() {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<
    { id: string; title: string }[]
  >([]);

  useEffect(() => {
    async function getSuggestions() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/search/suggestion?q=${input}`
      );
      const data = await res.json();
      if (data.success) {
        setSuggestions(data.suggestion);
      }
    }
    let debounce = null;
    if (input) {
      debounce = setTimeout(() => {
        getSuggestions();
      }, 1000);
    } else {
      setSuggestions([]);
    }
    return () => {
      if (debounce) clearTimeout(debounce);
    };
  }, [input]);

  return (
    <form action="/jobs" className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
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
        <input
          type="text"
          name="query"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search jobs..."
          className="w-full pl-10 pr-4 py-2.5 border-1  border-amber-200 hover:border-amber-300 focus:border-amber-500 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 transition-all duration-200"
        />
        {
          suggestions.length > 0 && (
            <div className="absolute left-0 right-0 mt-2  border border-amber-300 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto animate-fade-in">
              {suggestions.map((item) => (
                <p
                  key={item.id}
                  className="px-4 py-2 bg-slate-200 text-gray-900 transition-colors duration-150 cursor-pointer text-base font-medium"
                  style={{ borderBottom: "1px solid #ffe0b2" }}
                >
                  <Link href={`/jobs/${item.id}`}>
                    {item.title}
                  </Link>
                </p>
              ))}
            </div>
          )}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <button
            type="submit"
            className="text-amber-600 hover:text-amber-700 transition-colors duration-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5-5 5M6 12h12"
              />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
}
