import { UPDATE_USER_ROLE } from "@/lib/gql/mutation";
import gqlClient from "@/lib/services/gql";
import { Button, Dialog, Flex, Select } from "@radix-ui/themes";
import React from "react";
import { User } from "../../../generated/prisma";
import { UserCog, UserCog2 } from "lucide-react";

export default function UpdateUserRole({ user }: { user: User }) {
  const [role, setRole] = React.useState<string>(user.role);
  async function handleUpdateRole() {
    try {
      const res: { updateUserRole: boolean } = await gqlClient.request(
        UPDATE_USER_ROLE,
        {
          userId: user.id,
          role,
        }
      );
      if (res.updateUserRole) {
        alert("User role updated successfully");
      } else {
        alert("Failed to update user role");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  }
  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white dark:text-white px-6 py-4 rounded-lg shadow"
            style={{ width: "fit-content" }}
            size={"4"}
          >
            <UserCog2 size={18} className="align-middle" />
          </Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Update Role</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Make changes to personnel role.
          </Dialog.Description>

          <Select.Root value={role} onValueChange={setRole}>
            <Select.Trigger />
            <Select.Content>
              <Select.Group>
                <Select.Label>Role:</Select.Label>
                <Select.Item value="manager">Manager</Select.Item>
                <Select.Item value="staff">Staff</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={handleUpdateRole}>Save</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
