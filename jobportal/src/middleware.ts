//@ts-nocheck

import { NextResponse } from "next/server";

export default function middleware(request) {
    const key = request.cookies.get("password")?.value;
    if (request.nextUrl.pathname == "/") {
        if (!key) {
            return NextResponse.redirect("http://localhost:3000/login");
        }
    }
    return NextResponse.next();
}
