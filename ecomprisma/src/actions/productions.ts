"use server";
import products from "@/constants/data";
import prismaClient from "@/services/prisma";
export async function addProductToDb(productData:any) {
  try {
    await prismaClient.product.create({
      data: productData,
    });
    return {
      success: true,
      data: products
    };
  } catch (err) {
    return {
      success: false,
      message: "something wrong",
    };
  }
}
