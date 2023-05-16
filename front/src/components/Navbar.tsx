import { checkAuth } from "@/middleware";
import { cookies } from "next/headers";
import Logo from "./ui/Logo";
import MenuElem from "./ui/MenuElem";

const Navbar = async () => {
 const user = await checkAuth(cookies().get("COOKIE_AUTH")?.value);
 return (
  <div className="w-full flex h-20 items-center justify-between">
   <Logo size="large" />
   <ul className="flex h-full items-center">
    <MenuElem link="/company"> companies </MenuElem>
    <MenuElem link="#"> users </MenuElem>
    {user.login ? (
     <>
      <MenuElem link="#"> my </MenuElem>
      <MenuElem link="#"> me </MenuElem>
      <MenuElem link="/user/login" isLast>
       {user.name}
      </MenuElem>
     </>
    ) : (
     <>
      <MenuElem link="/user/login" isLast>
       Login
      </MenuElem>
     </>
    )}
   </ul>
  </div>
 );
};

export default Navbar;
