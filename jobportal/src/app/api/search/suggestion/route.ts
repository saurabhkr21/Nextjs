import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const q = sp.get("q");

  if (!q) {
    return NextResponse.json({
      success: true,
      suggestion: [],
    });
  }

  const suggest = await prismaClient.job.findMany({
    where: {
      job_title: {
        contains: q,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      job_title: true,
    },
    take: 10,
  });
  const suggestions = suggest.map((item) => ({
    id: item.id,
    title: item.job_title,
  }));
  return NextResponse.json({
    success: true,
    suggestion: suggestions,
  });
}
