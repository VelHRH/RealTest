import UserProfile from "@/components/user/UserProfile";
import { getCompanyUnderControl } from "@/fetch/company";
import { getUser } from "@/fetch/user";
import { checkAuth } from "@/middleware";
import { cookies } from "next/headers";

export async function generateMetadata({ params }: IParams) {
 const user = await getUser(params.id);
 return { title: user.login };
}

const User = async ({ params }: IParams) => {
 const user = await getUser(params.id);
 const company =
  user.role !== "User"
   ? await getCompanyUnderControl(user.login, user.role)
   : null;
 const me = await checkAuth(cookies().get("COOKIE_AUTH")?.value);
 return (
  <UserProfile
   name={user.name}
   avatarUrl={user.avatarUrl}
   role={user.role}
   email={me._id === user._id ? user.email : undefined}
   login={user.login}
   company={user.role !== "User" ? company! : undefined}
   lng={params.lng}
  />
 );
};

export default User;
