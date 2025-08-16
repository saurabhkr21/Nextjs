"use client";

import { Avatar, Badge, Box, Card, Flex, Text } from "@radix-ui/themes";
import { DessertIcon, Info, Mail, User as UserIcon } from "lucide-react";
import EditUserBtn from "../Botton/EditUserBtn";
import Link from "next/link";

export default function UserCard({
  user,
}: {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    role: string;
    username: string;
    password: string;
  };
}) {
  return (
    <Box maxWidth="320px" className="transition-transform hover:scale-105">
      <Card className="bg-white dark:bg-slate-900 shadow-md rounded-xl border border-gray-200 dark:border-slate-800 p-4 hover:shadow-lg transition-shadow">
        <Flex gap="3" align="center">
          <Avatar
            size="4"
            src=""
            radius="full"
            fallback={user?.name?.charAt(0).toUpperCase() || "U"}
            className="border-2 border-blue-400"
          />
          <Box>
            <Flex align="center" gap="2">
              <UserIcon size={16} className="text-blue-500" />
              <Text
                as="div"
                size="2"
                weight="bold"
                className="text-blue-700 dark:text-blue-300"
              >
                {user?.name || "Unknown User"}
              </Text>
            </Flex>

            <Flex align="center" gap="2" mt="1">
              <Mail size={14} className="text-gray-500 dark:text-gray-400" />
              <Text as="div" size="1" color="gray">
                {user?.email || "No email available"}
              </Text>
            </Flex>

            <div className="mt-3 flex items-center gap-2">
              {user?.role && (
                <Badge
                  color="blue"
                  variant="soft"
                  className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow-sm border border-blue-300 dark:border-blue-700 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                >
                  {user.role}
                </Badge>
              )}
              <Link href={`/user/${user.id}`}>
                <Info size={16} className="text-gray-500 dark:text-gray-400" />
              </Link>
            </div>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
}
