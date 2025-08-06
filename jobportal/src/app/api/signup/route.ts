import { createToken } from "@/services/jwt";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const body = await req.json();
  const userToCreate = {
    email: body.email,
    password: body.password,
  };
  try {
    const user = await prismaClient.user.create({
      data: userToCreate,
    });
    const userTokenData = {
      id: user.id,
    };
    const token = createToken(userTokenData);
    const res = NextResponse.json({
      success: true,
      message: "User created successfully",
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3600,
    });
    return res;
  } catch (err) {
    console.error("Error creating user:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Error creating user",
      },
      { status: 500 }
    );
  }
}
