import TestCard from "@/components/test/TestCard";
import Headline from "@/components/ui/Headline";
import { getTests } from "@/fetch/test";
import { useTranslation } from "../../i18n";

const Page = async ({ params }: { params: { lng: string } }) => {
 const tests = await getTests();
 const { t } = (await useTranslation(params.lng)) as TranslationResult;
 return (
  <>
   <Headline color="yellow" classes="font-bold text-4xl mb-7 mt-10">
    {t("All tests")}:
   </Headline>
   <div className="grid grid-cols-6 gap-3">
    {tests.map((test) => (
     <TestCard
      key={test._id}
      _id={test._id}
      lng={params.lng}
      name={test.name}
      isExecuted={test.isExecuted}
     />
    ))}
   </div>
  </>
 );
};

export default Page;
