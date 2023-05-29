"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSadTear } from "@fortawesome/free-solid-svg-icons";

export default function Error({
 error,
 reset,
}: {
 error: Error;
 reset: () => void;
}) {
 return (
  <div className="flex w-full flex-col items-center mt-10 gap-5">
   <h2 className="text-zinc-100 text-6xl font-bold">Something went wrong!</h2>
   <FontAwesomeIcon icon={faFaceSadTear} className="text-7xl text-zinc-200" />
   <button
    className="font-semibold text-4xl text-zinc-200 hover:text-zinc-400 duration-300"
    onClick={() => reset()}
   >
    Try again
   </button>
  </div>
 );
}
