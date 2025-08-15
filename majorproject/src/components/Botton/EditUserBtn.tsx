import { EDIT_USER } from "@/lib/gql/mutation";
import gqlClient from "@/lib/services/gql";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { Edit2Icon } from "lucide-react";
import { useState } from "react";
import { userWithoutRole } from "@/type";

export default function EditUserBtn({ user }: { user: userWithoutRole }) {
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState(user?.avatar || "");

  async function handleEditUser() {
    try {
      const data: { updateUserProfile: boolean } = await gqlClient.request(
        EDIT_USER,
        {
          userId: user.id,
          name,
          email,
          username,
          avatar,
        }
      );
      if (data.updateUserProfile) {
        window.location.reload();
        alert("User edited successfully");
      }
    } catch (error) {
      console.error("Error editing user:", error);
    }
  }

  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button
            color="blue"
            variant="soft"
            className="mt-2 text-xs tracking-wide px-3 py-1 rounded-full flex items-center"
            size="1"
          >
            <Edit2Icon size={18} className="align-middle" />
          </Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Edit Employee</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Edit the employee details in the form below.
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Name
              </Text>
              <TextField.Root
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Username
              </Text>
              <TextField.Root
                placeholder="Enter your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Email
              </Text>
              <TextField.Root
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Avatar URL
              </Text>
              <TextField.Root
                placeholder="Enter your avatar URL"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
              />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={handleEditUser}>Save</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
