import { verifyToken } from "@/services/jwt";
import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ user: null });
    const data = verifyToken(token) as { id?: string } | null;
    if (!data || !data.id) return NextResponse.json({ user: null });
    const user = await prismaClient.user.findUnique({
      where: {
        id: data.id,
      },
      include: {
        company: true,
      },
    });
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Prisma error:", error);
    return NextResponse.json({
      user: null,
      error: "Database connection error",
    });
  }
}
