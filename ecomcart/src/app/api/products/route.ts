//@ts-nocheck
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";
import { title } from "process";

export async function GET(req) {
  const res = await prismaClient.product.findMany();
  return NextResponse.json({
    success: true,
    data: res,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body.title);
  const productToSave = {
    title: body.title,
    description: body.description,
    price: body.price,
    thumbnail: body.image_url,
  };
  const products = await prismaClient.product.create({
    data: productToSave,
  });
  return NextResponse.json({
    success: true,
    data: products,
  });
}
