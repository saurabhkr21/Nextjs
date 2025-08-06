//@ts-nocheck
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React from "react";

export default function DeleteJobBtn() {
  async function handleDelete({ job }) {
    try {
      const res = await fetch("http://localhost:3000/api/job/" + job.id, {
        method: "DELETE",
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      alert(err.message);
    }
  }
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <button className="bg-red-400 hover:bg-red-500 cursor-pointer px-4 text-sm font-medium py-2 text-nowrap rounded-sm w-25">Delete Job</button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Delete Job</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure? This Job will no longer be accessible and any existing
          sessions will be expired.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button onClick={handleDelete} variant="solid" color="red">
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}