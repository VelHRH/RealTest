import { FC } from "react";
import Image from "next/image";
import Headline from "../ui/Headline";
import Link from "next/link";
import ChangePassword from "./ChangePassword";

interface UserProfileProps {
 name: string;
 avatarUrl?: string;
 role: string;
 email?: string;
 login: string;
 company?: ICompany;
}

const UserProfile: FC<UserProfileProps> = ({
 name,
 avatarUrl,
 role,
 login,
 email,
 company,
}) => {
 return (
  <div className="w-1/2 mt-5 ml-1/2 translate-x-[50%] bg-gradient-to-r from-amber-400 to-amber-600 p-2 rounded-3xl">
   <div className="w-full h-full flex flex-col rounded-3xl bg-zinc-900 items-center text-white p-5 text-2xl font-semibold">
    <Image
     alt="Profile image"
     src={`${process.env.API_HOST}/${
      avatarUrl || "uploads/default-user-image.webp"
     }`}
     width={700}
     height={700}
     priority
     className="w-1/3 aspect-square object-cover rounded-full"
    />
    <Headline color="yellow" classes="font-bold text-4xl">
     {login}
    </Headline>
    {email && (
     <h1 className="pt-2 border-t-2 border-zinc-700 w-full text-center mt-2">
      {email}
     </h1>
    )}
    <h1 className="font-bold pt-2 border-t-2 border-zinc-700 w-full text-center mt-2">
     {name}
    </h1>
    <h2 className="pt-2 border-t-2 border-zinc-700 w-full text-center mt-2">
     {role === "User" ? (
      role
     ) : (
      <div>
       {role} of{" "}
       {
        <Link
         href={`/company/${company?._id}`}
         className="duration-300 hover:underline"
        >
         {company?.name}
        </Link>
       }
      </div>
     )}
    </h2>
    {email && <ChangePassword />}
   </div>
  </div>
 );
};

export default UserProfile;
