"use client";
import { useUserContext } from "@/contexts/UserContextProvider";
import DeleteJobBtn from "./DeleteJobBtn";
import EditJobBtn from "./EditJobBtn";

export default function EditDeleteJob({
  job,
  jobId,
}: {
  job: any;
  jobId: string;
}) {
  const { userData } = useUserContext();

  // Only render if user is company owner
  if (userData?.company?.id === job.company.id) {
    return (
      <div className="ml-auto flex items-center gap-2">
        <EditJobBtn job={job} />
        <DeleteJobBtn jobId={jobId} job={job} />
      </div>
    );
  }
  return null;
}
