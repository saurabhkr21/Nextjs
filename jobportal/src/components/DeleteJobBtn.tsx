//@ts-nocheck
import { AlertDialog, Button, Flex } from "@radix-ui/themes";

export default function DeleteJobBtn({ job }) {
  async function handleDelete() {
    try {
      const res = await fetch("http://localhost:3000/api/job/" + job.id, {
        method: "DELETE",
      });
      const data = await res.json();
      alert(data.message);
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  }
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger >
        <button className="hover:bg-red-500 cursor-pointer px-4 text-sm font-medium py-2 text-nowrap rounded-sm flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
          </svg>
          
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Content >
        <AlertDialog.Title>Delete Job</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure? This Job will no longer be accessible and any existing
          sessions will be expired.
        </AlertDialog.Description>

        <Flex
          gap="3"
          mt="4"
          justify="end"
          align="center"
                  >
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
