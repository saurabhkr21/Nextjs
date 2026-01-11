import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const user = await getUserFromCookies();

  if (!user) {
    return NextResponse.json(
      { success: false, message: "Authentication required" },
      { status: 401 }
    );
  }

  const reviewToSave = {
    ...body,
    user_id: user.id,
  };

  try {
    await prismaClient.review.create({
      data: reviewToSave,
    });
    return NextResponse.json({
      success: true,
      data: reviewToSave,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message,
    });
  }
}
