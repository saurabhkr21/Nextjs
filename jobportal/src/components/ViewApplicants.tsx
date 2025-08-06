//@ts-nocheck
"use client";
import { useUserContext } from "@/contexts/UserContextProvider";
import { Button, Card, Dialog, Flex, Spinner, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { application } from "../../generated/prisma";

export default function ViewApplicants({ job }) {
  const { userData } = useUserContext();
  const [applicants, setApplicants] = useState<application[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false); // Track dialog open state

  useEffect(() => {
    async function getApplicants() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/applicants/" + job.id);
        const data = await res.json();
        console.log("Fetched applicants data:", data); // Log the raw data
        if (data.success) {
          setApplicants(data.data);
        } else {
          console.error("API request was not successful:", data.message);
          setApplicants([]); // Set to empty array on failure
        }
      } catch (err) {
        console.error("Failed to fetch applicants", err);
        setApplicants([]); // Also set to empty array on catch
      } finally {
        setIsLoading(false);
      }
    }

    if (open) {
      getApplicants(); // Only fetch when dialog opens
    }
  }, [open, job.id]);

  // Show only if the current user is the employer
  if (userData?.company?.id === job.company.id) {
    return null;
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button variant="solid" color="blue">
          View Applicants
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Job Applicants</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          List of top Applicants
        </Dialog.Description>

        <Flex direction="column" gap="3">
          {isLoading && <Spinner size="3" />}
          {!isLoading && (!applicants || applicants.length === 0) && (
            <Text color="gray">No applicants yet or failed to load.</Text>
          )}
          {applicants?.map((app: application) => (
            <Card key={app.id}>
              <Flex direction="column" gap="1">
                <Text size="2">
                  <strong>Applicant ID:</strong> {app.id}
                </Text>
                <Text size="2">
                  <strong>User ID:</strong> {app.userId}
                </Text>
                <Text size="2">
                  <strong>Status:</strong> <Badge color={app.status === 'APPLIED' ? 'blue' : 'green'}>{app.status}</Badge>
                </Text>
              </Flex>
            </Card>
          ))}
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Close
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
