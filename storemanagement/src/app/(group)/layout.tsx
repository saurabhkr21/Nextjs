import UserProvider from "@/components/contexts/UserContextProvider";
import Header from "@/components/UI/Header";
import { getUserFromCookies } from "@/helper";
import { redirect } from "next/navigation";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromCookies();

  return (
    <div>
      <UserProvider user={user}>
        <Header />
        {children}
      </UserProvider>
    </div>
  );
}
