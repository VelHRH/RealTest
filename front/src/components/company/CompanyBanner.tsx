import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

const CompanyBanner: FC<CompanyProps> = ({
 name,
 _id,
 owner,
 tests,
 avatarUrl,
 description,
}) => {
 return (
  <Link
   href={`/company/${_id}`}
   className="w-full flex flex-col cursor-pointer hover:scale-105 duration-300 h-80 shadow-lg"
  >
   <Image
    alt="Company image"
    src={avatarUrl}
    width={700}
    height={700}
    className="w-full h-2/5 object-cover rounded-t-md"
   />
   <div className="flex-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-b-md">
    <div className="w-full h-full bg-black text-white opacity-70 p-4 flex flex-col font-bold items-center">
     <div className="flex w-full justify-between items-center pb-3 border-b-2 border-amber-100">
      <div className="text-2xl">
       {name.length > 13 ? `${name.slice(0, 11)}...` : name}
      </div>
      <div className="text-lg font-semibold text-amber-200">
       {owner.length > 7 ? `${owner.slice(0, 7)}...` : owner}
      </div>
     </div>
     <div className="flex-grow w-full mt-3 font-medium">
      {description.length > 60 ? `${description.slice(0, 59)}...` : description}
     </div>
     {tests.length >= 0 && (
      <div className="py-1 px-2 rounded-lg bg-blue-700 justify-self-end self-start">
       3+ tests
      </div>
     )}
    </div>
   </div>
  </Link>
 );
};

export default CompanyBanner;
