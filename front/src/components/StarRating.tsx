"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FC, useState } from "react";

interface StarRatingProps {
 defaultRating: number;
 companyId: string;
}

const rateCompany = async ({
 rating,
 companyId,
}: {
 rating: number;
 companyId: string;
}) => {
 const res = await fetch(`${process.env.API_HOST}/company/rate/${companyId}`, {
  method: "POST",
  headers: {
   "Content-Type": "application/json;charset=utf-8",
  },
  credentials: "include",
  body: JSON.stringify({
   rating,
  }),
 });
 const company = await res.json();
 return company;
};

const deleteCompanyRating = async ({ companyId }: { companyId: string }) => {
 const res = await fetch(`${process.env.API_HOST}/company/rate/${companyId}`, {
  method: "DELETE",
  headers: {
   "Content-Type": "application/json;charset=utf-8",
  },
  credentials: "include",
 });
 const company = await res.json();
 return company;
};

const StarRating: FC<StarRatingProps> = ({ defaultRating, companyId }) => {
 const [curHover, SetCurHover] = useState(0);
 const [rating, setRating] = useState(defaultRating);
 const handleClick = async (r: number) => {
  if (r === 0) {
   const company = await deleteCompanyRating({ companyId });
   if (company._id) {
    setRating(r);
   }
  } else {
   if (rating === 0) {
    const company = await rateCompany({ rating: r, companyId });
    if (company._id) {
     setRating(r);
    }
   }
  }
 };
 return (
  <div className="flex">
   <div className="flex text-2xl cursor-pointer mr-2">
    <FontAwesomeIcon
     icon={faStar}
     onMouseOver={() => rating === 0 && SetCurHover(1)}
     onMouseOut={() => rating === 0 && SetCurHover(0)}
     onClick={() => handleClick(1)}
     className={`mr-1 duration-200 ${
      curHover >= 1 || rating >= 1 ? "text-yellow-600" : "text-zinc-700"
     }`}
    />
    <FontAwesomeIcon
     icon={faStar}
     onMouseOver={() => rating === 0 && SetCurHover(2)}
     onMouseOut={() => rating === 0 && SetCurHover(0)}
     onClick={() => handleClick(2)}
     className={`mr-1 duration-200 ${
      curHover >= 2 || rating >= 2 ? "text-yellow-600" : "text-zinc-700"
     }`}
    />
    <FontAwesomeIcon
     icon={faStar}
     onMouseOver={() => rating === 0 && SetCurHover(3)}
     onMouseOut={() => rating === 0 && SetCurHover(0)}
     onClick={() => handleClick(3)}
     className={`mr-1 duration-200 ${
      curHover >= 3 || rating >= 3 ? "text-yellow-600" : "text-zinc-700"
     }`}
    />
    <FontAwesomeIcon
     icon={faStar}
     onMouseOver={() => rating === 0 && SetCurHover(4)}
     onMouseOut={() => rating === 0 && SetCurHover(0)}
     onClick={() => handleClick(4)}
     className={`mr-1 duration-200 ${
      curHover >= 4 || rating >= 4 ? "text-yellow-600" : "text-zinc-700"
     }`}
    />
    <FontAwesomeIcon
     icon={faStar}
     onMouseOver={() => rating === 0 && SetCurHover(5)}
     onMouseOut={() => rating === 0 && SetCurHover(0)}
     onClick={() => handleClick(5)}
     className={`mr-1 duration-200 ${
      curHover >= 5 || rating >= 5 ? "text-yellow-600" : "text-zinc-700"
     }`}
    />
   </div>
   <button
    onClick={() => handleClick(0)}
    className={`text-amber-400 ${rating === 0 ? "hidden" : "flex"}`}
   >
    Change my rating
   </button>
  </div>
 );
};

export default StarRating;
