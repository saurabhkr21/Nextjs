import { getUserFromCookies } from "@/helper";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromCookies();
  if (user) {
    redirect("/");
  }
  return <div>{children}</div>;
}
