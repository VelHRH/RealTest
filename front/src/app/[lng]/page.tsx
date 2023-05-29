import Button from "@/components/ui/Button";
import TypedBanner from "@/components/ui/TypedBanner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Headline from "@/components/ui/Headline";
import { useTranslation } from "../i18n";
import Link from "next/link";

export default async function Home({ params }: { params: { lng: string } }) {
 const { t } = (await useTranslation(params.lng)) as TranslationResult;
 return (
  <>
   <div className="min-h-[86vh] w-full flex items-center">
    <Headline classes="font-bold text-7xl h-full w-1/2 lowercase" color="blue">
     <TypedBanner text={t("banner1")} />
    </Headline>
    <div className="w-1/2 flex justify-center">
     <Link href={`${params.lng}/user/register`} className="w-1/2">
      <Button
       color="blue"
       isAnimate
       icon={<FontAwesomeIcon icon={faUserPlus} />}
      >
       {t("Sing Up")}
      </Button>
     </Link>
    </div>
   </div>
   <div className="min-h-screen w-full flex items-center">
    <div className="w-1/2 flex justify-center">
     <Link href={`${params.lng}/company/add`} className="w-1/3">
      <Button color="red" isAnimate>
       {t("Start")}
      </Button>
     </Link>
    </div>
    <Headline classes="font-bold text-7xl h-full w-1/2 lowercase" color="red">
     <TypedBanner text={t("banner2")} />
    </Headline>
   </div>
  </>
 );
}
