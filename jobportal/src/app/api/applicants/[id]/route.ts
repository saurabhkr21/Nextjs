import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const job_id =params.id;
  try {
    const applications = await prismaClient.application.findMany({
      where: {
        job_id: job_id,
      },
      include: {
        user: true,
      },
    });
    console.log("Fetched applications in route:", applications); // Log the fetched applications
    return NextResponse.json({
      success: true,
      data: applications,
    });
  } catch (err: any) {
    console.error("API Error:", err.message);
    return NextResponse.json({
      success: false,
      message: err.message || "failed",
    });
  }
}
