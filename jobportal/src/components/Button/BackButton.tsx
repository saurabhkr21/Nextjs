"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <div className="flex items-center">
      <button
        className="p-2 mb-8 rounded-full bg-slate-700 hover:bg-slate-800 active:bg-slate-900 shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 group"
        onClick={() => router.back()}
        aria-label="Go back"
        title="Go back"
      >
        <ArrowLeft
          size={24}
          className="text-white group-hover:text-slate-300"
        />
      </button>
    </div>
  );
}
