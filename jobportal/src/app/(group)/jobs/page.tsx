
import prismaClient from "@/services/prisma";
import JobCard from "@/components/JobCard";
import SideBarSort from "../../../components/card/SideBarSort";
import { JobWithDetails } from "@/lib/type";

interface SearchParams {
  query?: string;
  ms?: string;
  max?: string;
  type?: string;
  page?: string;
}

export default async function Page({ searchParams }: { searchParams?: SearchParams }) {
  const query = searchParams?.query?.toLowerCase() || "";
  const ms = parseInt(searchParams?.ms || "0");
  const max = parseInt(searchParams?.max || "10000000");
  const jobType = searchParams?.type?.toLowerCase() || "";
  const page = parseInt(searchParams?.page || "1");

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
  console.log("jobs in jobs main:", jobs);
  if (!jobs) {
    return (
      <div className="text-center text-gray-500">
        No jobs found matching your filters.
      </div>
    );
  }
  return (
    <div className="flex ">
      <div
        className="hidden sm:flex top-10 w-xs
      left-0 h-screen z-40 mt-8 p-2"
      >
        <SideBarSort />
      </div>
      <div className="flex-1  p-5">
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2 p-3 shadow-2xl  hover:onfocus:shadow-2xl">
          {jobs.length > 0 ? (
            jobs.map((item) => <JobCard key={item.id} item={item} />)
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No jobs found matching your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
