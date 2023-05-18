import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface ProductCardProps {
 children: string;
 rating: number;
}

const ProductCard: FC<ProductCardProps> = ({ children, rating }) => {
 return (
  <div className="w-full cursor-pointer font-bold py-2 text-2xl p-2 rounded-md flex justify-between bg-gradient-to-r from-blue-500 to-blue-700 duration-300 hover:scale-105">
   {children}
   <div className="font-semibold flex gap-1 items-center">
    {rating} <FontAwesomeIcon icon={faStar} className="text-xl" />
   </div>
  </div>
 );
};

export default ProductCard;
