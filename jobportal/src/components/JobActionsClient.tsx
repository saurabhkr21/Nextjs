"use client";
import ViewApplicants from "./card/ViewApplicants";
import EditDeleteJob from "./Edit-DeleteJob";

export default function JobActionsClient({
  job,
  jobId,
}: {
  job: any;
  jobId: string;
}) {
  return (
    <>
      <EditDeleteJob job={job} jobId={jobId} />
      <ViewApplicants job={job} />
    </>
  );
}
