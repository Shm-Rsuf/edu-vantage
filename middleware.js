import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { LOGIN, PUBLIC_ROUTE, ROOT } from "./lib/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // req.auth
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;

  const isPublicRoute =
    PUBLIC_ROUTE.find((route) => nextUrl.pathname.startsWith(route)) ||
    nextUrl.pathname === ROOT;

  if (!isAuthenticated && !isPublicRoute) {
    return Response.redirect(new URL(LOGIN, nextUrl));
  }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
