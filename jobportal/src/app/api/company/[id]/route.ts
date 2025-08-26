import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;
  try {
    const company = await prismaClient.company.findUnique({
      where: {
        id: id,
      },
      include: {
        owner: {
          include: {
            reviews: true,
          },
          omit: {
            password: true,
          },
        },
        jobs: {
          include: {
            company: {
              include: {
                owner: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: company,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
    });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;
  console.log("Deleting company with ID:", id);
  const user = await getUserFromCookies();

  if (user?.company?.id == id) {
    await prismaClient.company.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  } else {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
