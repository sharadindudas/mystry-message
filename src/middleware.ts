import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export const config = {
    matcher: ["/dashboard", "/login", "/signup", "/", "/verify-otp"]
};

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const pathname = request.nextUrl.pathname;

    if (
        token &&
        (pathname.startsWith("/login") ||
            pathname.startsWith("/signup") ||
            pathname.startsWith("/verify-otp"))
    ) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (!token && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}
