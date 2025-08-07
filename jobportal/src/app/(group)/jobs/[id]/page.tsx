import Detail from "@/components/Detail";
import ViewApplicants from "@/components/ViewApplicants";
import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { notFound } from "next/navigation";

export default async function JobDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUserFromCookies();
  const { id } = params;
  const res = await fetch(`http://localhost:3000/api/job/` + id);
  console.log("Fetching job details for ID:", id);
  const data = await res.json();
  console.log("Job details data:", data);

  if (!data?.success) {
    notFound();
  }
  let userHasApplied = false;
  if (user) {
    const application = await prismaClient.application.findMany({
      where: {
        job_id: id,
        user_id: user?.id,
      },
    });
    if (application.length > 0) {
      userHasApplied = true;
    }
  }

  const job = data?.data;

  return (
    <div className="w-full flex flex-col min-h-screen">
      <h1 className="w-full  text-black backdrop-blur-md border-b-2 mb-2 text-4xl flex items-center justify-center font-bold pt-10">
        Job Details
      </h1>

      <Detail job={job} p={userHasApplied} />
      <div className="flex flex-col bg-amber-500 text-black gap-4 px-10">
        {/* <EditDeleteJob job={job} /> */}
      </div>
    </div>
  );
}
