import { DELETE_PRODUCT } from "@/lib/gql/mutation";
import gqlClient from "@/lib/services/gql";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { TrashIcon } from "lucide-react";
import React from "react";
import { ProductsWithSales } from "@/type";

export default function DeleteProduct({
  product,
}: {
  product: {id: string};
}) {
  async function handleDelete() {
    try {
      const res: { deleteProduct: boolean } = await gqlClient.request(
        DELETE_PRODUCT,
        {
          deleteProductId: product.id,
        }
      );
      if (res.deleteProduct) {
        alert("Product deleted successfully");
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
    console.log("Product deleted:", product.id);
  }
  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button color="gray">
            <TrashIcon />
          </Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Delete Product</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Are you sure you want to delete this product?
          </Dialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close onClick={handleDelete}>
              <Button>Delete</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
