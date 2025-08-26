'use client'
import { useRouter, useSearchParams } from "next/navigation";
export default function NextPage({ disabled }: { disabled?: boolean }) {
  const searchParams = useSearchParams();
  const router=useRouter();
  const query = searchParams.get("q");
  const ms =searchParams.get("ms");
  const max =searchParams.get("max");
  const type = searchParams.get("type") || "";
  const page = Number(searchParams.get("page")) || 1;
  function handleNext(){
    const url=`/search?q=${query}&ms=${ms}&max=${max}&page=${page+1}`;
    router.push(url);
  }

  return (
    <button disabled={disabled}>Next</button>
  );
}
