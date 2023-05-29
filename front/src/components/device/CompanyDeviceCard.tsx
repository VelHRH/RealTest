"use client";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "../../app/i18n/client";

interface CompanyDeviceCardProps {
 children: string;
 _id: string;
 isFree: boolean;
 lng: string;
}

const CompanyDeviceCard: FC<CompanyDeviceCardProps> = ({
 children,
 _id,
 isFree,
 lng,
}) => {
 const { t } = useTranslation(lng);
 const [hydrated, setHydrated] = useState(false);
 useEffect(() => {
  setHydrated(true);
 }, []);
 if (!hydrated) {
  return null;
 }
 return (
  <Link
   href={`${lng}/device/bought/${_id}`}
   className={`py-2 px-3 font-bold bg-gradient-to-r ${
    isFree ? "from-green-500 to-green-700" : "from-red-500 to-red-700"
   } duration-300 hover:scale-105 text-center rounded-md cursor-pointer`}
  >
   {t(children)}
  </Link>
 );
};

export default CompanyDeviceCard;
