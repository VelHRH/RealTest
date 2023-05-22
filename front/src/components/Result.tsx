"use client";
import { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface ResultProps {
 appoaches: IApproach[];
 resultSatrt: string;
 resultEnd: string;
}

const Result: FC<ResultProps> = ({ appoaches, resultEnd, resultSatrt }) => {
 const [isFull, setIsFull] = useState<boolean>(false);
 return (
  <div
   className={`w-full rounded-2xl p-4 ${
    appoaches.length > 0
     ? appoaches.length < 3
       ? "bg-green-950"
       : appoaches.length >= 3 && appoaches.length < 5
       ? "bg-green-800"
       : "bg-grenn-700"
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
      <li
       key={i}
      >{`Approach of a person at a distance ${approach.approach}cm for ${approach.duration} seconds`}</li>
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
