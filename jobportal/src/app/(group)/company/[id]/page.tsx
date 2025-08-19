//@ts-nocheck
import DeleteCompanyBtn from "@/components/DeleteCompanyBtn";
import Detail from "@/components/Detail";
import JobCard from "@/components/JobCard";
import Reviews from "@/components/Reviews";
import ViewCompanyDetail from "@/components/ViewCompanyDetail";
// import Reviews from "@/components/sections/Reviews";
// import DeleteCompanyBtn from "@/components/ui/DeleteCompanyBtn";
import { Box, Tabs, Text, TextArea } from "@radix-ui/themes";
import { notFound } from "next/navigation";

export default async function page({ params }) {
  const id = params.id;
  if (!id) {
    notFound();
  }
  const res = await fetch("http://localhost:3000/api/company/" + id);
  const data = await res.json();
  const company = data.data;
  if (!company) {
    notFound();
  }

  return (
    <div className="py-10 min-h-screen px-10 flex flex-col gap-4  items-center">
      <ViewCompanyDetail company={company} />
      <Tabs.Root defaultValue="account" className="w-full">
        <Tabs.List>
          <Tabs.Trigger value="openings">Jobs</Tabs.Trigger>
          <Tabs.Trigger value="reviews">Reviews</Tabs.Trigger>
        </Tabs.List>

        <Box pt="3">
          <Tabs.Content value="openings">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-medium">Recent Jobs </h2>
              {/* @ts-ignore */}
              {company.jobs.map((job) => (
                <JobCard key={job.id} item={job} />
              ))}
            </div>
          </Tabs.Content>

          <Reviews company={company} reviews={company.owner.review}/>
        </Box>
      </Tabs.Root>
    </div>
  );
}
