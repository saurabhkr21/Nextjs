import { createToken } from "@/services/jwt";
import prismaClient from "@/services/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    const existingUser = await prismaClient.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User with this email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prismaClient.user.create({
      data: {
        email,
        password: hashedPassword,
      },
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
