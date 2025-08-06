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
      companyName: body.name,
      companyDescription: body.description,
      companyOwnerId: user.id,
    };
    const newCompany = await prismaClient.company.create({
      data: company,
    });
    return NextResponse.json({
      success: true,
      message: "Company created successfully",
      data: newCompany,
    });
  } catch (err : any) {
    return NextResponse.json({
      success: false,
      message: err.message,
    });
  }
}