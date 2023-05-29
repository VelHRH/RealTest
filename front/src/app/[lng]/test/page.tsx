import TestCard from "@/components/test/TestCard";
import Headline from "@/components/ui/Headline";
import { cookies } from "next/headers";
import { useTranslation } from "../../i18n";

const Page = async ({ params }: { params: { lng: string } }) => {
 const res = await fetch(`${process.env.API_HOST}/test`, {
  headers: {
   Cookie: `COOKIE_AUTH=${cookies().get("COOKIE_AUTH")?.value}`,
  },
 });
 const tests = (await res.json()) as ITest[];
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
