import { getUserFromCookies } from "@/helper";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getUserFromCookies();

  if (!user) {
    return NextResponse.json({
      success: false,
      message: "User not found",
    });
  }

  let company = null;
  if (user.company && user.company.id) {
    company = user.company;
  }

  return NextResponse.json({
    success: true,
    data: { ...user, company },
  });
}
