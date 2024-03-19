import { useTranslation } from "@/app/i18n";
import CustomChart from "@/components/charts/CustomChart";
import BinomialForm from "@/components/testResults/BinomialForm";
import { getBinomial } from "@/fetch/test";

const BinomialAnalytics = async ({
  params,
  searchParams,
}: {
  params: { id: string; lng: string };
  searchParams: { people: string };
}) => {
  const { t } = (await useTranslation(params.lng)) as TranslationResult;
  const binomialDistributionData = await getBinomial(
    params.id,
    searchParams.people
  );
  return (
    <div className="flex gap-5 items-center">
      <div className="flex flex-col items-center text-yellow-200 font-bold w-1/5">
        <BinomialForm />
      </div>
      <div className="flex-1 flex flex-col items-center pt-10">
        <CustomChart
          id="binomiladistribution"
          data={binomialDistributionData.map((record) => record.probability)}
          labels={binomialDistributionData.map((record) => record.people)}
          xName={t("People")}
          yName={t("Probability")}
          bgColor="yellow"
        />
      </div>
    </div>
  );
};

export default BinomialAnalytics;
