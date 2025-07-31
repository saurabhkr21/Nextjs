//@ts-nocheck
"use client";
import { deleteProdFromDb } from "@/actions/productions";
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
    <button onClick={handleDelete} className="border rounded-2xl bg-amber-200">
        Delete
    </button>
  );
}
