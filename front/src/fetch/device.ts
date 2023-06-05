import { cookies } from "next/headers";

export const getDevicesByCompany = async (id: string) => {
 const res = await fetch(`${process.env.API_HOST}/company/purchases/${id}`, {
  cache: "no-store",
 });
 return await res.json();
};

export const getDevice = async (id: string) => {
 const res = await fetch(`${process.env.API_HOST}/company/device/${id}`, {
  cache: "no-store",
 });
 return (await res.json()) as IDevice;
};

export const getPurchase = async (id: string) => {
 const res = await fetch(`${process.env.API_HOST}/company/purchase/${id}`, {
  headers: {
   Cookie: `COOKIE_AUTH=${cookies().get("COOKIE_AUTH")?.value || ""}`,
  },
  cache: "no-store",
 });
 return (await res.json()) as IPurchase;
};
