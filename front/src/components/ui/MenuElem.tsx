import { FC } from "react";
import Link from "next/link";

interface MenuElemProps {
 children: string;
 link: string;
 isLast?: boolean;
}

const MenuElem: FC<MenuElemProps> = ({ children, link, isLast }) => {
 return (
  <li
   className={`text-2xl ${
    isLast ? "text-amber-400" : "text-amber-100"
   } hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 font-bold cursor-pointer duration-300 ${
    !isLast && "mr-10"
   }`}
  >
   <Link href={link}>{children}</Link>
  </li>
 );
};

export default MenuElem;
