"use client";
import {
  Badge,
  Button,
  Card,
  Dialog,
  Flex,
  Spinner,
  Text,
  TextField,
} from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
// import { JobWithCompany } from "@/types";
import { useUserContext } from "@/contexts/UserContextProvider";
import { application,job, } from "../../generated/prisma";

export default function ViewApplicants({ job }) {
  const { userData } = useUserContext();
  const [applicants, setApplicants] = useState<application[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getApplicants() {
      setIsLoading(true);
      const res = await fetch("/api/applicants/" + job.id);
      const data = await res.json();
      if (data.success) {
        setApplicants(data?.data);
      }
      setIsLoading(false);
    }
    getApplicants();
  }, []);

  if (userData?.company?.id === job.company.id) {
    return null;
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button className="bg-btn-primary hover:bg-btn-hover text-white px-4 py-2 ">
          View Applicants
        </button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Job Applicants</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          List of top Applicants
        </Dialog.Description>

        <Flex direction="column" gap="3">
          {isLoading && <Spinner size={"3"} />}
          {applicants?.map((app: application) => (
            <Card key={app.id}>
              <Badge>{app.id}</Badge>
            </Card>
          ))}
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}