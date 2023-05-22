import UserProfile from "@/components/user/UserProfile";
import { checkAuth } from "@/middleware";
import { cookies } from "next/headers";

interface pageProps {
 params: {
  id: string;
 };
}

const getUser = async (id: string) => {
 const res = await fetch(`${process.env.API_HOST}/user/getOne/${id}`, {
  cache: "no-store",
 });
 const user = await res.json();
 return user;
};

const getCompany = async (login: string, role: string) => {
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

const page = async ({ params }: pageProps) => {
 const user = (await getUser(params.id)) as IUser;
 const company =
  user.role !== "User" ? await getCompany(user.login, user.role) : null;
 const me = (await checkAuth(cookies().get("COOKIE_AUTH")?.value)) as IUser;
 return (
  <UserProfile
   name={user.name}
   avatarUrl={user.avatarUrl}
   role={user.role}
   email={me._id === user._id ? user.email : undefined}
   login={user.login}
   company={user.role !== "User" ? company! : undefined}
  />
 );
};

export default page;
