import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { job_id: string } }
) {
  const id = params.job_id;
  try {
    const job = await prismaClient.job.findUnique({
      where: {
        id: id,
      },
      include: {
        company: true,
      },
    });
    return NextResponse.json({
      success: true,
      data: job,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message,
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { job_id: string } }
) {
  try {
    const jobId = params.job_id;
    const res = await prismaClient.job.delete({
      where: {
        id: jobId,
      },
    });
    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message,
    });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const jobId = params.id;
  const body = await req.json();

  try {
    const res = await prismaClient.job.update({
      where: {
        id: jobId,
      },
      data: body,
    });
    return NextResponse.json({
      success: true,
      message: "Job updated successfully",
    });
  } catch (err: any) {
    return NextResponse.json({
      message: err.message,
    });
  }
}