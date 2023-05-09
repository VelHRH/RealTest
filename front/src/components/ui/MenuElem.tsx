import { FC } from "react";
import Link from "next/link";

interface MenuElemProps {
 children: string;
 link: string;
}

const MenuElem: FC<MenuElemProps> = ({ children, link }) => {
 return (
  <li className="text-2xl text-amber-100 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 font-bold cursor-pointer duration-300 mr-10">
   <Link href={link}>{children}</Link>
  </li>
 );
};

export default MenuElem;
