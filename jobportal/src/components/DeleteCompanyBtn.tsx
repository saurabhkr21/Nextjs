"use client";
import { useUserContext } from "@/contexts/UserContextProvider";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { company } from "../../generated/prisma";

export default function DeleteCompanyBtn({
  id,
  company,
}: {
  id: string;
  company: company;
}) {
  const { userData } = useUserContext();
  const router = useRouter();

  async function handleDelete() {
    const res = await fetch(`http://localhost:3000/api/company/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    alert(data.message);
    router.refresh(); // Refresh the page to show the updated list
  }

  return (
    <>
      {userData?.id === company.ownerId ? (
        <button
          className="flex  items-center gap-2 px-2 p-1 hover:bg-red-500 w-fit rounded-md cursor-pointer font-medium"
          onClick={handleDelete}
        >
          <Trash size={16} />
        </button>
      ) : null}
    </>
  );
}
