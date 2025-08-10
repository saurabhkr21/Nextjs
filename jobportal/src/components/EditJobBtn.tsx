//@ts-nocheck
"use client";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { use, useState } from "react";
import { AddJob } from "../../../generated/prisma";
import { useUserContext } from "@/contexts/UserContextProvider";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditJobBtn({ job }) {
  const [job_title, setTitle] = useState<string>(job.job_title);
  const [job_type, setJobType] = useState<string>(job.job_type);
  const [job_description, setDescription] = useState<string>(
    job.job_description
  );
  const [job_salary, setSalary] = useState<string>(job.job_salary.toString());
  const [employment_type, setEmpType] = useState<string>(job.employment_type);
  const [job_location, setLocation] = useState<string>(job.job_location);
  const [employerName, setEmployerName] = useState<string>(job.employer_name);
  const [employerLogoUrl, setEmployerLogoUrl] = useState<string>(
    job.employer_logo
  );
  const router = useRouter();
  async function handleEditJob() {
    const parsedSalary = parseFloat(job_salary) || 0;
    const jobData: EditJob = {
      job_title,
      job_type,
      job_description,
      job_salary: parsedSalary,
      employment_type,
      job_location,
    };

    try {
      const res = await fetch("http://localhost:3000/api/job/" + job.id, {
        method: "POST",
        body: JSON.stringify(jobData),
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      alert(err.message);
    }

    router.refresh();

  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button className=" px-2 py-2 text-sm font-medium rounded bg-btn-primary hover:bg-btn-hover dark:hover:bg-gray-700 transition cursor-pointer ">
          <Edit size={16} />
        </button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Edit Job</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Edit Job
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Job Title
            </Text>
            <TextField.Root
              value={job_title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter job title"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Job Description
            </Text>
            <TextField.Root
              value={job_description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter job description"
            />
          </label>
          {/* <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Job Type
            </Text>
            <select
              required
              value={job_type}
              onChange={(e) => setJobType(e.target.value)}
              className="select select-info bg-transparent w-full "
            >
              <option value="" disabled>
                Select job type
              </option>
              <option value="On site">On-site</option>
              <option value="Remote">Remote</option>
            </select>
          </label> */}

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Salary (in lakhs)
            </Text>
            <TextField.Root
              type="number"
              min="0"
              value={job_salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="Enter salary"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Employer Name
            </Text>
            <TextField.Root
              value={employerName}
              onChange={(e) => setEmployerName(e.target.value)}
              placeholder="Enter employer name"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Employment Type
            </Text>
            {/* <TextField.Root
              value={employment_type}
              onChange={(e) => setEmpType(e.target.value)}
              placeholder="Enter employment type"
            /> */}
            <select
              required
              value={employment_type}
              onChange={(e) => setEmpType(e.target.value)}
              className="select select-info bg-transparent w-full "
            >
              <option value="" disabled>
                Select employment type
              </option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
              <option value="Internship">Internship</option>
            </select>
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Location
            </Text>
            <TextField.Root
              value={job_location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, Country"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Company Logo URL
            </Text>
            <TextField.Root
              value={employerLogoUrl}
              onChange={(e) => setEmployerLogoUrl(e.target.value)}
              placeholder="Enter company logo URL"
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={handleEditJob}>Update</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
