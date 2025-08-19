//@ts-nocheck
"use client";
import { UpdateProdInDb } from "@/actions/productions";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { EditIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditProdBtn({ item }:{item:any}) {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);
  const [imageUrl, setImageUrl] = useState(item.image_url);
  const [category, setCategory] = useState(item.category);
  const router = useRouter();

  async function handleSubmit(id: string) {
    const ParsePrice = Number.parseFloat(price);
    const data = {
      title,
      description,
      price: ParsePrice,
      category,
      image_url: imageUrl,
    };
    // console.log("Submitting data:", data);

    const res = await UpdateProdInDb(data,item.id);
    if (res.success) {
      alert("Product updated successfully!");
      router.refresh();
    } else {
      console.error("Error updating product:", res.error);
      alert(`Error: ${res.error}`);
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button><EditIcon size={20} height={25}/></Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Update Products</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Update your products.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Title
            </Text>
            <TextField.Root
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your full name"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Description
            </Text>
            <TextField.Root
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Price
            </Text>
            <TextField.Root
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="price"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Image_url
            </Text>
            <TextField.Root
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="ImageUrl"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Category
            </Text>
            <TextField.Root
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
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
            <Button onClick={handleSubmit}>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
