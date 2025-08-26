import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const companyId = params.id;
  try {
    const reviews = await prismaClient.review.findMany({
      where: {
        company_id: companyId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    console.log("Fetched Reviews:", reviews);
    return NextResponse.json({
      success: true,
      data: reviews,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message,
    });
  }
}
