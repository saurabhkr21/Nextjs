"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useContext as useReactContext } from "react";
import { ThemeContext } from "../contexts/theme-context";
import { UserContext } from "../contexts/UserContextProvider";

export default function Header() {
  const { user } = useContext(UserContext);
  const { isDark, setIsDark } = useReactContext(ThemeContext);
  function handleLogOut() {
    if (confirm("Are you sure to log out...")) {
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/login";
    }
  }

  function handleThemeToggle() {
    if (setIsDark) setIsDark(!isDark);
  }
  return (
    <header className="flex justify-between items-center px-6 py-3 z-88 shadow-md rounded-b-2xl   dark:shadow-slate-800">
      <div className="flex items-center gap-4">
        <Link
          href={"/"}
          className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500 shadow-lg"
        >
          <Image
            fill
            sizes="(max-width: 56px) 100vw, 56px"
            src="https://cdn-icons-png.flaticon.com/512/12474/12474329.png"
            alt="Logo"
            className="object-cover"
            priority
          />
        </Link>
      </div>
      <div className="flex gap-3 items-center ">
        <button
        aria-label="Toggle theme"
        onClick={handleThemeToggle}
        className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-blue-400 dark:border-blue-600 bg-blue-50 shadow transition-colors hover:bg-blue-100 dark:bg-slate-400 "
      >
        {isDark ? (
          <Moon className="w-6 h-6 text-blue-700" />
        ) : (
          <Sun className="w-6 h-6 text-yellow-400" />
        )}
      </button>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Box className="cursor-pointer">
            <Card className="bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors shadow-lg px-4 py-2 rounded-xl">
              <Flex gap="3" align="center">
                <Avatar
                  size="3"
                  src={user?.avatar || "/default-avatar.png"}
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
        <DropdownMenu.Content className="bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-slate-700 rounded-xl shadow-xl p-2 min-w-[200px] border border-gray-200 dark:border-slate-700 z-[9999]">
          <DropdownMenu.Separator className="my-2" />
          <DropdownMenu.Item
            className="px-3 py-2 rounded hover:bg-blue-50 dark:hover:bg-slate-700 text-blue-200 cursor-pointer"
            onClick={() => {
              window.location.href = "/profile";
            }}
          >
            Profile
          </DropdownMenu.Item>
          <DropdownMenu.Item className="px-3 py-2 rounded hover:bg-blue-50 text-blue-200 dark:hover:bg-slate-700 cursor-pointer">
            Favorites
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="my-2 " />
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className="px-3 py-2 rounded hover:bg-blue-100 text-blue-200 dark:hover:bg-slate-700 cursor-pointer">
              More
            </DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent className="bg-white dark:bg-slate-800 text-blue-200 rounded-xl shadow-xl p-2 border border-gray-200 dark:border-slate-700">
              <DropdownMenu.Item className="px-3 py-2 rounded  cursor-pointer">
                Move to project…
              </DropdownMenu.Item>
              <DropdownMenu.Item className="px-3 py-2 rounded cursor-pointer">
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
      </div>
    </header>
  );
}
