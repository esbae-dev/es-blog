import { NextResponse } from "next/server";

export function middleware(request) {
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  const isLoggedIn =
    request.cookies.get("admin_auth")?.value === process.env.ADMIN_PASSWORD;

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
