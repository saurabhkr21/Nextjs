import { addProductToDb } from "@/actions/productions";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";

export default function AddProdBtn() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");

  async function handleSubmit() {
    const ParsePrice = Number.parseFloat(price);
    const data = {
      title,
      description,
      price: ParsePrice,
      category,
      image_url: imageUrl,
    };

    // const res = await fetch("http://localhost:3000/api/products", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    // });
    // const x= await res.json();
    // if(x.success){
    //   alert("saved")
    // }

    console.log("Submitting data:", data);
    const res = await addProductToDb(data);
    if (res.success) {
      alert("Product added successfully!");
      // Reset form
      setTitle("");
      setDescription("");
      setPrice("");
      setImageUrl("");
      setCategory("");
    } else {
      console.error("Error adding product:", res.message);
      alert(`Error: ${res.message}`);
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Add Product</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add Products</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Add your products.
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
