import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const checkAuth = async (cookie: string | undefined) => {
 const res = await fetch(`${process.env.API_HOST}/user/me`, {
  headers: {
   Cookie: `COOKIE_AUTH=${cookie}`,
  },
 });
 const user = await res.json();
 return user;
};

export async function middleware(request: NextRequest) {
 const user = await checkAuth(request.cookies.get("COOKIE_AUTH")?.value);
 if (user.login) {
  if (
   request.nextUrl.pathname.startsWith("/user/login") ||
   request.nextUrl.pathname.startsWith("/user/register")
  ) {
   return NextResponse.redirect(new URL("/", request.url));
  }
 } else {
  if (request.nextUrl.pathname.includes("/add")) {
   return NextResponse.redirect(new URL("/", request.url));
  }
 }
}

export const config = {
 matcher: ["/user/login", "/user/regidter"],
};
