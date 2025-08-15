//@ts-nocheck
import { NextResponse } from "next/server";

export default function middleware(req) {
  const user = req.cookies.get("token1")?.value;
  const pathName = req.nextUrl.pathname;
  const protectedPaths = ["/", "/blog", "/search"];

  if (protectedPaths.includes(pathName)) {
    if (!user) {
      return NextResponse.redirect("http://localhost:3000/login");
    } else if (pathName === "/login" || pathName === "/signup") {
      return NextResponse.redirect("http://localhost:3000/");
    }
  }
  return NextResponse.next();
}
