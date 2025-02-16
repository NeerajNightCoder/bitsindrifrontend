import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("supabase_session");

  // List of protected routes
  const protectedRoutes = ["/dashboard", "/profile", "/print","buyandsell"];

  // Check if request matches a protected route
  const isProtected = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route));

  if (isProtected) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Mark the response as dynamic (forces server-side rendering)
    const response = NextResponse.next();
    response.headers.set("x-middleware-force-dynamic", "true");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/print/:path*","/buyandsell/:path*"], // Add all protected routes
};
