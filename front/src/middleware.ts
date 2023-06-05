import { NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages } from "./app/i18n/settings";
import type { NextRequest } from "next/server";

export const config = {
 matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};

const cookieName = "i18next";

export const checkAuth = async (cookie: string | undefined) => {
 const res = await fetch(`${process.env.API_HOST}/user/me`, {
  headers: {
   Cookie: `COOKIE_AUTH=${cookie}`,
  },
  cache: "no-store",
 });
 const user = await res.json();
 return user as IUser;
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
  company.admins?.find((a: string) => a === userLogin)
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

 let lng;
 if (request.cookies.has(cookieName))
  lng = acceptLanguage.get(request.cookies.get(cookieName)?.value);
 if (!lng) lng = acceptLanguage.get(request.headers.get("Accept-Language"));
 if (!lng) lng = fallbackLng;

 if (
  !languages.some((loc) => request.nextUrl.pathname.startsWith(`/${loc}`)) &&
  !request.nextUrl.pathname.startsWith("/_next")
 ) {
  return NextResponse.redirect(
   new URL(`/${lng}${request.nextUrl.pathname}`, request.url)
  );
 }

 if (request.headers.has("referer")) {
  const refererUrl = new URL(request.headers.get("referer") || "");
  const lngInReferer = languages.find((l) =>
   refererUrl.pathname.startsWith(`/${l}`)
  );
  const response = NextResponse.next();
  if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
  return response;
 }

 return NextResponse.next();
}
