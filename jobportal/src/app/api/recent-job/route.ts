import prismaClient from "@/services/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const recentJobs = await prismaClient.job.findMany({
      orderBy: {
        id: "desc",
      },
      take: 5,
      include: {
        company: true,
      },
    });
    return NextResponse.json({
      success: true,
      data: recentJobs,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message,
    });
  }
}