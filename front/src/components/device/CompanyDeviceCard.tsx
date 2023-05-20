import { FC } from "react";
import Link from "next/link";

interface CompanyDeviceCardProps {
 children: string;
 _id: string;
 isFree: boolean;
}

const CompanyDeviceCard: FC<CompanyDeviceCardProps> = ({
 children,
 _id,
 isFree,
}) => {
 return (
  <Link
   href={`/device/bought/${_id}`}
   className={`py-2 px-3 font-bold bg-gradient-to-r ${
    isFree ? "from-green-500 to-green-700" : "from-red-500 to-red-700"
   } duration-300 hover:scale-105 text-center rounded-md cursor-pointer`}
  >
   {children}
  </Link>
 );
};

export default CompanyDeviceCard;
