"use client";

import { PRODUCT_UPDATE } from "@/lib/gql/mutation";
import gqlClient from "@/lib/services/gql";
import {
  Button,
  Dialog,
  Flex,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import { Edit2 } from "lucide-react";
import { useState } from "react";
import { Product } from "../../../generated/prisma";

export default function EditProductBtn({ product }: { product?: Product }) {
  const [title, setTitle] = useState(product?.title || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState<number>(product?.price || 0);
  const [stock, setStock] = useState<number>(product?.stock || 0);
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");
  const [category, setCategory] = useState(product?.category || "others");

  async function handleUpdateProduct() {
    try {
      const updatedProduct: { updateProduct: Product } =
        await gqlClient.request(PRODUCT_UPDATE, {
          updateProductId: product?.id,
          title,
          description,
          category,
          price,
          stock,
          imageUrl,
        });
      if (updatedProduct?.updateProduct) {
        alert("product updated successfully");
      } else {
        alert("error in updating product");
      }
    } catch {
      alert("error in updating product");
    }
  }

  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button>
            <Edit2 />
          </Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Add Product</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Add new product
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Title
              </Text>
              <TextField.Root
                placeholder="Enter your title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                description
              </Text>
              <TextField.Root
                placeholder="Enter your description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                price
              </Text>
              <TextField.Root
                placeholder="Enter your price"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                stock
              </Text>
              <TextField.Root
                placeholder="Enter your stock"
                value={stock}
                onChange={(e) => setStock(parseInt(e.target.value))}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                imageUrl
              </Text>
              <TextField.Root
                placeholder="Enter your imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
            <Select.Root value={category} onValueChange={setCategory}>
              <Select.Trigger />
              <Select.Content>
                <Select.Group>
                  <Select.Label>Category:</Select.Label>
                  <Select.Item value="electronics">Electronics</Select.Item>
                  <Select.Item value="beauty">Beauty</Select.Item>
                  <Select.Item value="food">Food</Select.Item>
                  <Select.Item value="accessories">Accessories</Select.Item>
                  <Select.Item value="clothing">Clothing</Select.Item>
                  <Select.Item value="decor">Decor</Select.Item>
                  <Select.Item value="other">Other</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={handleUpdateProduct}>Save</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
