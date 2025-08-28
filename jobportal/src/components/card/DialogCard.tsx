"use client";
import { Avatar, Box, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
export default function DialogCard() {
  type User = {
    name?: string;
    email?: string;
    role?: string;
    company:{
      id: string;
      name: string;
    };
  };
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        if (data && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  function handleLogOut() {
    if (window.confirm("Are you sure you want to log out?")) {
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/login";
    }
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Box className="cursor-pointer">
          <Flex
            gap="1"
            align="center"
            className="px-2 py-1 rounded-lg hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors"
          >
            <Avatar
              src={""}
              alt={user?.name || "User Avatar"}
              size="2"
              className="border border-gray-300 dark:border-slate-700"
              fallback={user?.name?.charAt(0) || "G"}
            />
            <Box className="hidden sm:flex flex-col">
              <Text
                as="div"
                size="1"
                weight="bold"
                className="text-blue-700 dark:text-blue-400"
              >
                {loading ? "Loading..." : user?.name || "Guest"}
              </Text>
              {/* <Text
                as="div"
                size="1"
                color="gray"
                className="text-gray-500 dark:text-gray-300"
              >
                {loading ? "" : user?.role}
              </Text> */}
            </Box>
          </Flex>
        </Box>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="rounded-xl shadow-xl p-2 min-w-[200px] border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 z-[9999]">
        <DropdownMenu.Item
          className="px-3 py-2 rounded hover:bg-blue-50 dark:hover:bg-slate-700 cursor-pointer"
          onClick={() => {
            window.location.href = "/profile";
          }}
        >
          Profile
        </DropdownMenu.Item>
        {
          user?.company && (
            <DropdownMenu.Item
              className="px-3 py-2 rounded hover:bg-blue-50 dark:hover:bg-slate-700 cursor-pointer"
              onClick={() => {
                window.location.href = `/company/${user.company.id}`;
              }}
            >
              {user.company.name}
            </DropdownMenu.Item>
          )
        }
        {
          !user?.company && (
            <DropdownMenu.Item
              className="px-3 py-2 rounded hover:bg-blue-50 dark:hover:bg-slate-700 cursor-pointer"
              onClick={() => {
                window.location.href = "/AddCompany";
              }}
            >
              Add Company
            </DropdownMenu.Item>
          )
        }
        <DropdownMenu.Item
          className="px-3 py-2 rounded hover:bg-blue-50 dark:hover:bg-slate-700 cursor-pointer"
          onClick={() => {
            window.location.href = "/company";
          }}
        >
          Company
        </DropdownMenu.Item>
        <DropdownMenu.Item
          onClick={handleLogOut}
          className="px-3 py-2 rounded hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400 hover:text-white cursor-pointer"
        >
          Log Out
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
