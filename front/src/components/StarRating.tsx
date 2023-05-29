"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "../app/i18n/client";

interface StarRatingProps {
 defaultRating: number;
 _id: string;
 item: string;
 lng: string;
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

const rateProduct = async ({
 rating,
 productId,
}: {
 rating: number;
 productId: string;
}) => {
 const res = await fetch(
  `${process.env.API_HOST}/test/product/rate/${productId}`,
  {
   method: "POST",
   headers: {
    "Content-Type": "application/json;charset=utf-8",
   },
   credentials: "include",
   body: JSON.stringify({
    rating,
   }),
  }
 );
 const product = await res.json();
 return product;
};

const deleteProductRating = async ({ productId }: { productId: string }) => {
 const res = await fetch(
  `${process.env.API_HOST}/test/product/rate/${productId}`,
  {
   method: "DELETE",
   headers: {
    "Content-Type": "application/json;charset=utf-8",
   },
   credentials: "include",
  }
 );
 const product = await res.json();
 return product;
};

const StarRating: FC<StarRatingProps> = ({ defaultRating, _id, item, lng }) => {
 const [curHover, SetCurHover] = useState(0);
 const [rating, setRating] = useState(defaultRating);

 const { t } = useTranslation(lng);
 const [hydrated, setHydrated] = useState(false);
 useEffect(() => {
  setHydrated(true);
 }, []);
 if (!hydrated) {
  return null;
 }

 const handleClick = async (r: number) => {
  if (r === 0) {
   const ratedItem =
    item === "company"
     ? await deleteCompanyRating({ companyId: _id })
     : await deleteProductRating({ productId: _id });
   if (ratedItem._id) {
    setRating(r);
   }
  } else {
   if (rating === 0) {
    const ratedItem =
     item === "company"
      ? await rateCompany({ rating: r, companyId: _id })
      : await rateProduct({ rating: r, productId: _id });
    if (ratedItem._id) {
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
    {t("Change my rating")}
   </button>
  </div>
 );
};

export default StarRating;
