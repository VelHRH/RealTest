"use client";
import { languages } from "@/app/i18n/settings";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const LanguageSwitcher = ({ lng }: { lng?: string }) => {
 const [isLoading, setIsLoading] = useState(false);
 const pathname = usePathname();
 return (
  <div
   onClick={() => setIsLoading(true)}
   className="cursor-pointer hover:to-amber-600 duration-300 rounded-full font-bold text-2xl px-2 pt-1 pb-2 text-zinc-900 bg-gradient-to-r from-amber-400 to-amber-500"
  >
   {languages
    .filter((l) => lng !== l)
    .map((l, index) => {
     return (
      <span key={l}>
       {index > 0 && " or "}
       <Link href={`/${l}${pathname.slice(3)}`}>
        {!isLoading ? (
         l
        ) : (
         <FontAwesomeIcon
          icon={faSpinner}
          className="animate-spin text-black"
         />
        )}
       </Link>
      </span>
     );
    })}
  </div>
 );
};
