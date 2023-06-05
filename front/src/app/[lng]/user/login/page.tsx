import Headline from "@/components/ui/Headline";
import LoginUser from "@/components/user/LoginUser";
import Link from "next/link";
import { useTranslation } from "../../../i18n";

export const metadata = {
 title: "Sign In",
 description: "Signing into the system",
};

const UserLogin = async ({ params }: { params: { lng: string } }) => {
 const { t } = (await useTranslation(params.lng)) as TranslationResult;
 return (
  <div className="flex flex-col w-full items-center mt-10">
   <div className="flex justify-between items-end w-[40%] text-white">
    <Headline color="yellow" classes="text-4xl font-bold">
     {t("Logging in")}
    </Headline>
    <Link
     href={`${params.lng}/user/register`}
     className="font-semibold duration-300 hover:underline text-lg"
    >
     {t("Not registered yet?")}
    </Link>
   </div>
   <LoginUser lng={params.lng} />
  </div>
 );
};

export default UserLogin;
