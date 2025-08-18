import UserProvider from "@/components/contexts/UserContextProvider";
import Header from "@/components/UI/Header";
import SideBarRight from "@/components/UI/SideBarRight";
import { getUserFromCookies } from "@/helper";
import { redirect } from "next/navigation";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromCookies();
  if (!user) {
    redirect("/login");
  }
  return (
    <UserProvider user={user}>
      <Header />
      {children}
    </UserProvider>
  );
}
