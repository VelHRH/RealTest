import Logo from "./ui/Logo";
import MenuElem from "./ui/MenuElem";
import { cookies } from "next/headers";

const Navbar = async () => {
 const user = await fetch("http://localhost:8000/user/me", {
  headers: {
   Cookie: `COOKIE_AUTH=${cookies().get("COOKIE_AUTH")?.value}`,
  },
 });
 const data = await user.json();
 return (
  <div className="w-full flex h-20 items-center justify-between">
   <Logo size="large" />
   <ul className="flex h-full items-center">
    {data.login ? (
     <>
      <MenuElem link="#"> my </MenuElem>
      <MenuElem link="#"> me </MenuElem>
     </>
    ) : (
     <>
      <MenuElem link="#"> companies </MenuElem>
      <MenuElem link="#"> users </MenuElem>
     </>
    )}
   </ul>
  </div>
 );
};

export default Navbar;
