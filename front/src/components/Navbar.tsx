import { FC } from "react";
import Logo from "./ui/Logo";
import MenuElem from "./ui/MenuElem";

const Navbar: FC = () => {
 return (
  <div className="w-full flex h-20 items-center justify-between">
   <Logo size="large" />
   <ul className="flex h-full items-center">
    <MenuElem link="#"> companies </MenuElem>
    <MenuElem link="#"> users </MenuElem>
   </ul>
  </div>
 );
};

export default Navbar;
