import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  console.log("Fetching applications for job ID:", id); // Log the job ID being fetched
  try {
    const applications = await prismaClient.application.findMany({
      where: {
        job_id: id,
      },
      include: {
        job: true,
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
