import { checkAuth } from "@/middleware";
import { cookies } from "next/headers";
import { LanguageSwitcher } from "./LanguageSwitcher";
import Logo from "./ui/Logo";
import MenuElem from "./ui/MenuElem";

const Navbar = async ({ t, lng }: TranslationResult) => {
 const user = await checkAuth(cookies().get("COOKIE_AUTH")?.value);
 return (
  <div className="w-full flex h-20 items-center justify-between">
   <Logo link={`${lng}`} size="large" />
   <ul className="flex h-full items-center">
    <MenuElem link={`${lng}/company`}> {t("companies")} </MenuElem>
    <MenuElem link={`${lng}/user`}> {t("users")} </MenuElem>
    {user.login ? (
     <>
      <MenuElem link={`${lng}/test`}> {t("tests")} </MenuElem>
      <MenuElem link={`${lng}/device/648ae353ff53625e5a737fb3`}>
       {t("devices")}
      </MenuElem>
      <MenuElem link={`${lng}/user/${user._id}`} isLast>
       {user.name}
      </MenuElem>
     </>
    ) : (
     <>
      <MenuElem link={`${lng}/user/login`} isLast>
       {t("login")}
      </MenuElem>
     </>
    )}
    <LanguageSwitcher lng={lng} />
   </ul>
  </div>
 );
};

export default Navbar;
