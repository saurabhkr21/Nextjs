import { createToken } from "@/services/jwt";
import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const user = await prismaClient.user.create({
      data: body,
    });

    if (user) {
      const userTokenData = {
        id: user.id,
      };
      const token = createToken(userTokenData);
      const userCookies = await cookies();
      userCookies.set("userIdToken", token);

      return NextResponse.json({
        success: true,
        message: "user registered successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (err: any) {
    console.error("error in cerating error : ", err.message);
    return NextResponse.json(
      {
        success: false,
        message: "error creating user",
      },
      { status: 500 }
    );
  }
}