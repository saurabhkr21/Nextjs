import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const updateProd = {
    title: body.title,
    description: body.description,
    price: body.price,
    thumbnail: body.image_url,
    category: body.category,
  };

  const updatedProduct=await prismaClient.product.update({
    where: {
      id: body.id,
    },
    data: updateProd,
  });
  return NextResponse.json({
    success: true,
    data: updatedProduct,
    
  });

}
