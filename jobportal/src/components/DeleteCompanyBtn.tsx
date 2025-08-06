"use client";
// import { useUserContext } from "@/contexts/UserContextProvider";
import { DeleteIcon, Trash } from "lucide-react";
import { redirect } from "next/navigation";
import { company } from "../../generated/prisma";

export default function DeleteCompanyBtn({
  id,
  company,
}: {
  id: string;
  company: company;
}) {
//   const { userData } = useUserContext();
  async function handleDelete() {
    const res = await fetch("http://localhost:3000/api/company/" + id, {
      method: "DELETE",
    });
    const data = await res.json();
    alert(data.message);
    redirect("/company");
  }

  return (
    <>
      {userData?.id === company.ownerId ? (
        <button
          className="flex items-center gap-2 px-2 p-1 bg-btn-primary hover:bg-btn-hover w-fit rounded-md cursor-pointer font-medium"
          onClick={handleDelete}
        >
          Delete Company <Trash />
        </button>
      ) : null}
    </>
  );
}