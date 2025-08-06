import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    
    // Protect routes that require authentication
    const protectedPaths = ["/", "/jobs", "/company", "/saved"];
    const isProtectedPath = protectedPaths.some(path =>
        request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(path + "/")
    );
    
    // Allow access to auth pages without token
    const authPaths = ["/login", "/signup"];
    const isAuthPath = authPaths.some(path => request.nextUrl.pathname.startsWith(path));
    
    if (isProtectedPath && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    
    // Redirect authenticated users away from auth pages
    if (isAuthPath && token) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
