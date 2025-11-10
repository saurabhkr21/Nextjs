"use client";
import { Job } from "@/lib/type";
import { Button } from "@radix-ui/themes";
import { Delete, Trash } from "lucide-react";

export default function ApplyDeleteBtn({ job }: { job: Job }) {
  async function handleDelete() {
    try {
      const res = await fetch(`/api/job/apply/${job?.id}`, {
        method: "DELETE",
      });
      const contentType = res.headers.get("content-type");
      if (
        !res.ok ||
        !contentType ||
        !contentType.includes("application/json")
      ) {
        alert("Server error: Unexpected response format");
        return;
      }
      const data = await res.json();
      if (data.success) {
        alert("Application withdrawed Successfully");
        window.location.reload();
      }
    } catch (err: any) {
      alert("An error occured while withdrawing for job: " + err?.message);
    }
  }

  return (
    <div>
      <Button onClick={handleDelete}>
        <Trash size={16} />
      </Button>
    </div>
  );
}
