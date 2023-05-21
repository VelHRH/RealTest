import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const checkAuth = async (cookie: string | undefined) => {
 const res = await fetch(`${process.env.API_HOST}/user/me`, {
  headers: {
   Cookie: `COOKIE_AUTH=${cookie}`,
  },
  cache: "no-store",
 });
 const user = await res.json();
 return user;
};

export const checkAdmin = async ({
 userLogin,
 companyId,
}: {
 userLogin: string;
 companyId?: string;
}) => {
 const res = await fetch(`${process.env.API_HOST}/company/${companyId}`, {
  cache: "no-store",
 });
 const company = await res.json();
 if (
  company.owner === userLogin ||
  company.admins.find((a: string) => a === userLogin)
 ) {
  return true;
 }
 return false;
};

export const checkOwner = async ({
 userLogin,
 companyId,
}: {
 userLogin: string;
 companyId: string;
}) => {
 const res = await fetch(`${process.env.API_HOST}/company/${companyId}`, {
  cache: "no-store",
 });
 const company = await res.json();
 if (company.owner === userLogin) {
  return true;
 }
 return false;
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
   return NextResponse.redirect(new URL("/user/login", request.url));
  }
  if (request.nextUrl.pathname.includes("/test")) {
   return NextResponse.redirect(new URL("/user/login", request.url));
  }
 }
}

export const config = {};
