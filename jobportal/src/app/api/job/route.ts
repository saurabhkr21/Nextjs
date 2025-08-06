//@ts-nocheck
import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromCookies();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const company = await prismaClient.company.findUnique({
      where: { ownerId: user.id },
    });

    if (!company) {
      return NextResponse.json(
        {
          success: false,
          message: "User does not have a company. Please create one first.",
        },
        { status: 400 }
      );
    }

    const body = await req.json();
    const {
      job_title,
      job_description,
      job_salary,
      job_type,
      employment_type,
      job_location,
      employer_logo,
      jobApplyLink,
    } = body;

    if (!job_title || !job_description || !job_salary || !job_location) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing required fields: title, description, salary, and location are required.",
        },
        { status: 400 }
      );
    }

    const newJob = await prismaClient.job.create({
      data: {
        job_title,
        job_description,
        job_salary: parseInt(job_salary, 10),
        job_type,
        employment_type,
        job_location,
        employer_logo,
        jobApplyLink,
        companyId: company.id,
        employer_name: company.name,
      },
    });

    return NextResponse.json({
      success: true,
      data: newJob,
      message: "Job added successfully!",
    });
  } catch (error: any) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const url = req.url;
  const urlObj = new URL(url);
  const query = urlObj.searchParams.get("q") || "";
  const jobType = urlObj.searchParams.get("type") || "";
  const minSalary = urlObj.searchParams.get("ms")
    ? parseFloat(urlObj.searchParams.get("ms"))
    : undefined;
  const maxSalary = urlObj.searchParams.get("max")
    ? parseFloat(urlObj.searchParams.get("max"))
    : undefined;

  const where: any = {
    OR: [
      {
        job_title: {
          contains: query,
          mode: "insensitive",
        },
      },
      {
        company: {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
      },
    ],
    job_salary: {},
  };

  if (minSalary !== undefined) {
    where.job_salary.gte = minSalary;
  }
  if (maxSalary !== undefined) {
    where.job_salary.lte = maxSalary;
  }
  if (Object.keys(where.job_salary).length === 0) {
    delete where.job_salary;
  }

  if (jobType) {
    where.job_type = jobType;
  }

  try {
    const jobs = await prismaClient.job.findMany({
      where: where,
      include: {
        company: {
          include: {
            owner: true,
          },
        },
      },
    });
    return NextResponse.json({
      success: true,
      data: jobs,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message,
    });
  }
}
