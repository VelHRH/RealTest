import RegisterCompany from "@/components/RegisterCompany";
import Headline from "@/components/ui/Headline";
import { useTranslation } from "../../../i18n";

const AddCompany = async ({ params }: { params: { lng: string } }) => {
 const { t } = (await useTranslation(params.lng)) as TranslationResult;
 return (
  <div className="flex flex-col w-full items-center">
   <Headline color="yellow" classes="text-4xl font-bold mt-16 mb-5">
    {t("Creating your company...")}
   </Headline>
   <RegisterCompany lng={params.lng} />
  </div>
 );
};

export default AddCompany;
