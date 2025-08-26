import { createToken } from "@/services/jwt";
import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const user = await prismaClient.user.findUnique({
      where: { email: body.email },
      include: { company: true },
    });

    if (user && user.password === body.password) {
      const userTokenData = {
        id: user.id,
      };
      const token = createToken(userTokenData);
      const userCookies = await cookies();
      userCookies.set({
        name: "token",
        value: token,
        path: "/",
        maxAge: 3600,
      });

      return NextResponse.json({
        success: true,
        message: "Login successful",
        data: {
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
            company: user.company,
          },
          token,
        },
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 }
    );
  }
}
