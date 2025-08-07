import JobCard from "@/components/JobCard";
import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";

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
      </div>
    );
  }
  const applications = await prismaClient.application.findMany({
    where: {
      user_id: user?.id,
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
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        Applied Jobs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {applications.map((application) => (
          <JobCard key={application.id} item={application.job} />
        ))}
      </div>
    </div>
  );
}
