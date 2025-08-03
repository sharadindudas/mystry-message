import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export const config = {
    matcher: ["/", "/login", "/signup", "/verify-otp", "/dashboard"]
};

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const pathname = request.nextUrl.pathname;

    const isAuthPage =
        pathname === "/" ||
        pathname === "/login" ||
        pathname === "/signup" ||
        pathname === "/verify-otp";
    const isProtectedRoute = pathname.startsWith("/dashboard");

    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (!token && isProtectedRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}
