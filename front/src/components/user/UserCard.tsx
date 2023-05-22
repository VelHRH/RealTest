import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface UserCardProps {
 _id: string;
 login: string;
 role: string;
 avatarUrl?: string;
}

const UserCard: FC<UserCardProps> = ({ _id, login, avatarUrl, role }) => {
 return (
  <Link
   href={`/user/${_id}`}
   className="w-full h-64 bg-gradient-to-r from-amber-400 to-amber-400 hover:to-amber-600 p-1 rounded-2xl"
  >
   <div className="w-full h-full flex flex-col rounded-2xl bg-zinc-900 cursor-pointer items-center">
    <Image
     alt="Profile image"
     src={`${process.env.API_HOST}/${
      avatarUrl || "uploads/default-user-image.webp"
     }`}
     width={700}
     height={700}
     priority
     className="w-full h-2/3 object-cover rounded-t-xl"
    />
    <h1 className="text-xl font-bold text-white py-2 border-b-2 border-zinc-700 w-full text-center">
     {login}
    </h1>
    <h2 className={`text-lg font-medium text-zinc-200 py-1`}>{role}</h2>
   </div>
  </Link>
 );
};

export default UserCard;
