import { checkAuth } from "@/middleware";
import { cookies } from "next/headers";
import Logo from "./ui/Logo";
import MenuElem from "./ui/MenuElem";

const Navbar = async () => {
 const user = (await checkAuth(cookies().get("COOKIE_AUTH")?.value)) as IUser;
 return (
  <div className="w-full flex h-20 items-center justify-between">
   <Logo size="large" />
   <ul className="flex h-full items-center">
    <MenuElem link="/company"> companies </MenuElem>
    <MenuElem link="/user"> users </MenuElem>
    {user.login ? (
     <>
      <MenuElem link="/test"> tests </MenuElem>
      <MenuElem link="/device/644bc87ee1a1e68a4f6ec7f0"> devices </MenuElem>
      <MenuElem link={`/user/${user._id}`} isLast>
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
