import prismaClient from "@/lib/services/prisma";
import { ProductCategory } from "../../../../../generated/prisma";

export async function addProducts(
  _: any,
  args: {
    title: string;
    description: string;
    imageUrl: string;
    category: ProductCategory;
    price: number;
    stock: number;
  }
) {
  try {
    const createdProduct = await prismaClient.product.create({
      data: args,
    });
    return createdProduct;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product");
  }
}

export async function getAllProducts() {
  try {
    const products = await prismaClient.product.findMany();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}

export async function getProduct(_: any, args: { id: string }) {
  const id = args.id;
  try {
    const product = await prismaClient.product.findUnique({
      where: {
        id: id,
      },
      include: {
        sales: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
    if (product) {
      return product;
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to fetch product");
  }
}

export async function createSale(
  _: any,
  args: {
    id: string;
    quantity: number;
  }
) {
  try {
    const sale = await prismaClient.sale.create({
      data: {
        productId: args.id,
        quantity: args.quantity,
      },
    });
    if (sale) {
      await prismaClient.product.update({
        where: { id: args.id },
        data: {
          stock: {
            decrement: args.quantity,
          },
        },
      });
    }
    return true;
  } catch (error) {
    console.error("Error creating sale:", error);
    throw new Error("Failed to create sale");
  }
}

export async function updateProduct(
  _: any,
  args: {
    id: string;
    title?: string;
    description?: string;
    category?: string;
    price?: number;
    stock?: number;
    imageUrl?: string;
  }
) {
  try {
    const updatedProduct = await prismaClient.product.update({
      where: { id: args.id },
      data: {
        title: args.title,
        description: args.description,
        category: args.category as ProductCategory,
        price: args.price,
        stock: args.stock,
        imageUrl: args.imageUrl,
      },
    });
    return updatedProduct;
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product");
  }
}

export async function deleteProduct(_: any, args: { id: string }) {
  try {
    const saleCount = await prismaClient.sale.count({
      where: { productId: args.id },
    });
    if (saleCount > 0) {
      await prismaClient.sale.deleteMany({
        where: { productId: args.id },
      });
    }
    const deletedProduct = await prismaClient.product.delete({
      where: { id: args.id },
    });
    if (deletedProduct) {
      return true;
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product");
  }
}
