import { Button, Dialog, Spinner } from "@radix-ui/themes";
import { useEffect, useState } from "react";

type Applicant = {
  id?: string;
  user?: {
    id?: string;
    name?: string;
    email?: string;
  };
};

export default function ViewJobApplicationBtn({
  job,
}: {
  job: { id: string };
}) {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getApplications() {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/applicants/${job.id}`);
      const data = await res.json();
      if (data?.success) {
        setApplicants(data?.data);
      }
      setLoading(false);
    }
    getApplications();
  }, [job.id]);

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>View Job</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>View Job</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make changes to your profile.
        </Dialog.Description>
        {loading && (
          <p>
            <Spinner />
          </p>
        )}

        <div>
          {applicants.length === 0 && !loading && (
            <p className="text-gray-500">No applicants found.</p>
          )}
          {applicants.map((application) => (
            <div
              key={application.id || application.user?.id}
              className="border-b py-2"
            >
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {application.user?.name || "Unknown"}
              </p>
              {application.user?.email && (
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {application.user.email}
                </p>
              )}
            </div>
          ))}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
