"use client";
import { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "../app/i18n/client";

interface ResultProps {
 appoaches: IApproach[];
 resultSatrt: string;
 resultEnd: string;
 lng: string;
}

const Result: FC<ResultProps> = ({
 appoaches,
 resultEnd,
 resultSatrt,
 lng,
}) => {
 const [isFull, setIsFull] = useState<boolean>(false);
 const { t } = useTranslation(lng);
 const [hydrated, setHydrated] = useState(false);
 useEffect(() => {
  setHydrated(true);
 }, []);
 if (!hydrated) {
  return null;
 }
 return (
  <div
   className={`w-full rounded-2xl p-4 ${
    appoaches.length > 0
     ? appoaches.length < 3
       ? "bg-green-950"
       : appoaches.length >= 3 && appoaches.length < 5
       ? "bg-green-800"
       : "bg-green-700"
     : "bg-zinc-800"
   } text-white flex flex-col`}
  >
   <h1 className="font-bold text-2xl mb-3">
    {new Date(resultSatrt).toLocaleString()} -{" "}
    {new Date(resultEnd).toLocaleString()}
   </h1>
   {isFull ? (
    <ul className="font-semibold">
     {appoaches.map((approach, i) => (
      <li key={i}>{`${t("Approach of a person at a distance")} ${
       approach.approach
      } ${t("cm for")} ${approach.duration} ${t("seconds")}`}</li>
     ))}
    </ul>
   ) : (
    appoaches.length > 0 && (
     <FontAwesomeIcon
      onClick={() => setIsFull(true)}
      icon={faChevronDown}
      className="text-2xl"
     />
    )
   )}
  </div>
 );
};

export default Result;
