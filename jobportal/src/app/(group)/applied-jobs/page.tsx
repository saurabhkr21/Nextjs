import ApplyDeleteBtn from "@/components/ApplyDeleteBtn";
import JobCard from "@/components/JobCard";
import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import Link from "next/link";

export default async function page() {
  const user = await getUserFromCookies();
  if (!user) {
    return (
      <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
          Please log in
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          You need to be logged in to see your applied jobs.
        </p>
        <p className="p-2">
          <Link
            href="/login"
            className="px-4 py-2 mt-10 bg-blue-600 text-white rounded-md"
          >
            Log in
          </Link>
        </p>
      </div>
    );
  }
  const applications = await prismaClient.application.findMany({
    where: {
      user_id: user.id,
    },
    include: {
      job: {
        include: {
          company: true,
        },
      },
    },
  });
  if (!applications || applications.length === 0) {
    return (
      <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
          No Applied Jobs
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          You have not applied to any jobs yet.
        </p>
      </div>
    );
  }
  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col gap-1">
        <div className="flex items-center-safe justify-between">
          <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
            Applications
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          Here are the jobs you have applied for:
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {applications.map((application) =>
          application.job ? (
            <div
              key={application.id}
              className="relative flex gap-0.5 shadow-md"
            >
              <JobCard key={application.id} item={application.job} />
              <ApplyDeleteBtn job={application.job} />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
