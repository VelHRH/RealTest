import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface ProductCardProps {
 children: string;
 rating: number;
 _id: string;
}

const ProductCard: FC<ProductCardProps> = ({ children, rating, _id }) => {
 return (
  <Link
   href={`/product/${_id}`}
   className="w-full cursor-pointer font-bold py-2 text-2xl p-2 rounded-md flex gap-10 justify-between bg-gradient-to-r from-blue-500 to-blue-700 duration-300 hover:scale-105"
  >
   {children}
   <div className="font-semibold flex gap-1 items-center">
    {rating} <FontAwesomeIcon icon={faStar} className="text-xl" />
   </div>
  </Link>
 );
};

export default ProductCard;
