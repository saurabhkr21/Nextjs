// @ts-nocheck

import prismaClient from "@/services/prisma";
// import JobCard from "../../components/JobCard";
import JobCard from "@/components/JobCard";
import JobsPageClient from "@/components/JobsPageClient";
import { Suspense } from "react";

export default async function Page({ searchParams }) {
  const query = searchParams?.q?.toLowerCase() || "";

  const ms = parseInt(searchParams?.ms || "0");
  const max = parseInt(searchParams?.max || "100000");
  const jobType = searchParams?.type?.toLowerCase() || "";
  const page = parseInt(searchParams?.page || 1);

  const jobs = await prismaClient.job.findMany({
    where: {
      job_title: {
        contains: query,
        mode: "insensitive",
      },
      job_salary: {
        gte: ms,
        lte: max,
      },
      employment_type: {
        contains: jobType,
        mode: "insensitive",
      },
    },
    include: {
      company: true,
    },
  });
  if (!jobs) {
    return (
      <div className="text-center text-gray-500">
        No jobs found matching your filters.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-7 lg:grid-cols-2 p-3 shadow-2xl  hover:onfocus:shadow-2xl">
      {jobs.length > 0 ? (
        jobs.map((item) => <JobCard key={item.id} item={item} />)
      ) : (
        <div className="col-span-full text-center text-gray-500">
          No jobs found matching your filters.
        </div>
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <JobsPageClient disabled={jobs.length < 10} />
      </Suspense>
    </div>
  );
}
