import Logo from "./ui/Logo";
import MenuElem from "./ui/MenuElem";
import { cookies } from "next/headers";

const Navbar = async () => {
 const res = await fetch("http://localhost:8000/user/me", {
  headers: {
   Cookie: `COOKIE_AUTH=${cookies().get("COOKIE_AUTH")?.value}`,
  },
 });
 const user = await res.json();
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
