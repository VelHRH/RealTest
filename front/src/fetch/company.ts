import { cookies } from "next/headers";

export const getCompany = async (id: string) => {
 const res = await fetch(`${process.env.API_HOST}/company/${id}`, {
  cache: "no-store",
 });
 return (await res.json()) as ICompany;
};

export const getCompanies = async () => {
 const res = await fetch(`${process.env.API_HOST}/company`, {
  cache: "no-store",
 });
 return (await res.json()) as ICompany[];
};

export const getMyCompanies = async () => {
 const res = await fetch(`${process.env.API_HOST}/company/my/getAll`, {
  cache: "no-store",
  headers: {
   Cookie: `COOKIE_AUTH=${cookies().get("COOKIE_AUTH")?.value}`,
  },
 });
 return (await res.json()) as ICompany[];
};

export const getCompanyUnderControl = async (login: string, role: string) => {
 const res = await fetch(`${process.env.API_HOST}/company`, {
  cache: "no-store",
 });
 const companies = (await res.json()) as ICompany[];
 for (let company of companies) {
  if (role === "Owner") {
   if (company.owner === login) {
    return company;
   }
  } else {
   if (company.admins.includes(login)) {
    return company;
   }
  }
 }
};
