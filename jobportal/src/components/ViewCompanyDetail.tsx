"use client";
import { CompanyWithDetails } from "@/lib/type";
import { ArrowLeft, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";
import ViewApplicants from "./card/ViewApplicants";
import SaveJob from "./SaveJob";

export default function ViewCompanyDetail({
  company,
}: {
  company: CompanyWithDetails;
}) {
  const router = useRouter();

  return (
    <div className="mx-auto p-8 my-8 rounded-2xl shadow-lg w-full max-w-6xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start justify-between mb-8 gap-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {company.image_url && (
            <img
              src={company.image_url}
              alt={`${company.name} Logo`}
              className="h-20 w-20 rounded-2xl object-contain border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800"
            />
          )}
          <div>
            <h1 className="text-4xl font-extrabold text-zinc-800 dark:text-zinc-100 mb-2">
              {company.name}
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-300 flex items-center gap-2">
              <Building2 size={18} />
              {company.owner.email}
            </p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          <ViewApplicants job={company} />
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-sm bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-100 px-4 py-2 rounded hover:bg-zinc-300 dark:hover:bg-zinc-600 transition"
          >
            <ArrowLeft size={18} />
          </button>
        </div>
      </div>

      <hr className="mb-8 border-zinc-200 dark:border-zinc-700" />

      {/* Description */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
          Company Description
        </h2>
        <p className="whitespace-pre-line leading-relaxed text-zinc-600 dark:text-zinc-300 text-base">
          {company.description}
        </p>
      </section>
    </div>
  );
}

// Reusable info item
type InfoColor = "blue" | "green" | "purple";

interface InfoItemProps {
  label: string;
  value: string;
  color: InfoColor;
  icon: React.ReactNode;
}

function InfoItem({ label, value, color, icon }: InfoItemProps) {
  const bg: Record<InfoColor, string> = {
    blue: "bg-blue-100 dark:bg-blue-900",
    green: "bg-green-100 dark:bg-green-900",
    purple: "bg-purple-100 dark:bg-purple-900",
  };

  const text: Record<InfoColor, string> = {
    blue: "text-blue-700 dark:text-blue-300",
    green: "text-green-700 dark:text-green-300",
    purple: "text-purple-700 dark:text-purple-300",
  };

  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="font-medium text-zinc-700 dark:text-zinc-200">
        {label}:
      </span>
      <span
        className={`inline-block px-2 py-1 rounded text-sm ${bg[color]} ${text[color]}`}
      >
        {value || "N/A"}
      </span>
    </div>
  );
}
