//@ts-nocheck
import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }) {
  const id = params.id;
  console.log("Fetching job details show for ID in routes:", id);
  try {
    const job = await prismaClient.job.findUnique({
      where: {
        id: id,
      },
      include: {
        company: true,
      },
    });

    if (job) {
      const finalData = {
        ...job,
      };
    }

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
  { params }: { params: { id: string } }
) {
  try {
    const jobId = params.id;
    const res = await prismaClient.job.delete({
      where: {
        id: jobId,
      },
    });
    return NextResponse.json({
      success: true,
      message: "Job deleted successfully",
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
