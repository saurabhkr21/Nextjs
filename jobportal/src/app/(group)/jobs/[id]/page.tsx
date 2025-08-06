
import Detail from "@/components/Detail";
import { notFound } from "next/navigation";

export default async function JobDetailPage({ params }: {
  params: { id: string };
}) {
  const { id } = params;
  const res = await fetch(`http://localhost:3000/api/job/${id}`);
  const data = await res.json();
  

  if (!data?.success) {
    notFound();
  }
  const job = data.data;
 

  return (
    <div className="w-full flex flex-col min-h-screen">
      <h1 className="w-full bg-black backdrop-blur-md h-50 text-4xl text-white flex items-center justify-center font-bold pt-10">Job Details</h1>
      {/* <ViewApplicants job={job} /> */}
      <Detail job={job}/>
      <div className="flex flex-col gap-4 px-10">
      <h3 className="text-2xl font-medium flex flex-col gap-10">Job Description</h3>
         <p>{job.job_description}</p>
          {/* <EditDeleteJob job={job} /> */}
      </div>
     
    </div>
  );
}
