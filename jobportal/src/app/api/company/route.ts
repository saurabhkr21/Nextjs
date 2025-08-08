import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await getUserFromCookies();

  if (!user) {
    return NextResponse.json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const body = await req.json();
    const company = {
      name: body.name,
      description: body.description,
      image_url: body.image_url || null,
      ownerId: user.id,
    };
    const newCompany = await prismaClient.company.create({
      data: company,
    });
    return NextResponse.json({
      success: true,
      message: "Company created successfully",
      data: newCompany,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message,
    });
  }
}
