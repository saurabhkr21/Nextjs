"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import Link from "next/link";
import { redirect } from "next/dist/server/api-utils";

export default function Header() {
  const { user } = useContext(UserContext);
  function handleLogOut() {
    if (confirm("Are you sure to log out...")) {
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      alert("Logging out...");
      window.location.href = "/login";
    }
  }
  return (
    <header className="flex justify-between items-center px-6 py-3 z-88 shadow-md rounded-b-2xl bg-white dark:bg-slate-900 dark:shadow-slate-800">
      <Link
        href={"/"}
        className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500 shadow-lg"
      >
        <Image
          fill
          src="https://cdn-icons-png.flaticon.com/512/12474/12474329.png"
          alt="Logo"
          className="object-cover"
        />
      </Link>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Box className="cursor-pointer">
            <Card className="bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors shadow-lg px-4 py-2 rounded-xl">
              <Flex gap="3" align="center">
                <Avatar
                  size="3"
                  src=""
                  radius="full"
                  fallback={user?.name?.charAt(0) || "U"}
                  className="border-2 border-blue-400"
                />
                <Box>
                  <Text
                    as="div"
                    size="2"
                    weight="bold"
                    className="text-blue-700 dark:text-blue-400"
                  >
                    {user?.name || "Unknown User"}
                  </Text>
                  <Text
                    as="div"
                    size="1"
                    color="gray"
                    className="text-gray-500 dark:text-gray-300"
                  >
                    {user?.role || "Unknown Role"}
                  </Text>
                </Box>
              </Flex>
            </Card>
          </Box>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-2 min-w-[200px] border border-gray-200 dark:border-slate-700 z-[9999]">
          <DropdownMenu.Separator className="my-2" />
          <DropdownMenu.Item className="px-3 py-2 rounded hover:bg-blue-50 dark:hover:bg-slate-700 cursor-pointer" onClick={() => {window.location.href = '/profile'}}>
            Profile
          </DropdownMenu.Item>
          <DropdownMenu.Item className="px-3 py-2 rounded hover:bg-blue-50 dark:hover:bg-slate-700 cursor-pointer">
            Favorites
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="my-2 " />
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className="px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-slate-700 cursor-pointer">
              More
            </DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-2 border border-gray-200 dark:border-slate-700">
              <DropdownMenu.Item className="px-3 py-2 rounded hover:bg-blue-50 dark:hover:bg-slate-700 cursor-pointer">
                Move to project…
              </DropdownMenu.Item>
              <DropdownMenu.Item className="px-3 py-2 rounded hover:bg-blue-50 dark:hover:bg-slate-700 cursor-pointer">
                Move to folder…
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="my-2" />
              <DropdownMenu.Item className="px-3 py-2 rounded hover:bg-blue-50 dark:hover:bg-slate-700 cursor-pointer">
                Advanced options…
              </DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
          <DropdownMenu.Separator className="my-2" />
          <DropdownMenu.Item
            onClick={handleLogOut}
            className="px-3 py-2 rounded hover:bg-red-100  dark:hover:bg-red-900 text-red-600 hover:text-white dark:text-red-400 cursor-pointer"
          >
            Log Out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </header>
  );
}
