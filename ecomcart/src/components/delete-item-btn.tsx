//@ts-nocheck
"use client";
import { deleteProdFromDb } from "@/actions/productions";
import { DeleteIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteItem({ id }: { id: string }) {
  const router=useRouter();
  async function handleDelete() {
    const res = await deleteProdFromDb(id);
    console.log("clicked")
    console.log(res)
    if(res.success){
        alert("deleted");
        router.refresh();
    }
}

  return (
    <button onClick={handleDelete} className="p-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors">
        <DeleteIcon />
    </button>
  );
}
