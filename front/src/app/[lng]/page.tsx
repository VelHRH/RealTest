import Button from "@/components/ui/Button";
import TypedBanner from "@/components/ui/TypedBanner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Headline from "@/components/ui/Headline";
import { useTranslation } from "../i18n";

export default async function Home({ params }: { params: { lng: string } }) {
 const { t } = (await useTranslation(
  params.lng,
  "start-page"
 )) as TranslationResult;
 return (
  <>
   <div className="min-h-[86vh] w-full flex items-center">
    <Headline classes="font-bold text-7xl h-full w-1/2 lowercase" color="blue">
     <TypedBanner text={t("banner1")} />
    </Headline>
    <div className="w-1/2 flex justify-center">
     <div className="w-1/3">
      <Button
       color="blue"
       isAnimate
       icon={<FontAwesomeIcon icon={faUserPlus} />}
      >
       Sing Up
      </Button>
     </div>
    </div>
   </div>
   <div className="min-h-screen w-full flex items-center">
    <div className="w-1/2 flex justify-center">
     <div className="w-1/3">
      <Button color="red" isAnimate>
       Register
      </Button>
     </div>
    </div>
    <Headline classes="font-bold text-7xl h-full w-1/2 lowercase" color="red">
     <TypedBanner text="Register your company and be among the first to receive unique data about your product" />
    </Headline>
   </div>
  </>
 );
}
