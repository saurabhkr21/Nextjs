import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query") || "";
  console.log("Search query:", query);
  const ms = parseInt(searchParams.get("ms") || "0", 10);
  const max = parseInt(searchParams.get("max") || "1000000", 10);
  const type = searchParams.get("type") || "";
  const page = Number.parseInt(searchParams.get("page") || "1");

  const limit = 10;
  const data = await prismaClient.job.findMany({
    where: {
      job_title: {
        contains: query,
        mode: "insensitive",
      },
      job_salary: {
        gte: ms,
        lte: max,
      },
      employment_type: {
        contains: type,
        mode: "insensitive",
      },
    },
    take: limit,
    skip: (page - 1) * limit,
  });
  return NextResponse.json({
    success: true,
    data: data,
  });
}
