import { useTranslation } from "@/app/i18n";
import CustomChart from "@/components/charts/CustomChart";
import PoissonForm from "@/components/testResults/PoissonForm";
import { getPoisson, getTest } from "@/fetch/test";

const PoissonAnalytics = async ({
  params,
  searchParams,
}: {
  params: { id: string; lng: string };
  searchParams: { start: string; end: string };
}) => {
  const { t } = (await useTranslation(params.lng)) as TranslationResult;
  const test = await getTest(params.id);
  const poissonDistributionData = await getPoisson(
    params.id,
    searchParams.start || test.testStart!,
    searchParams.end || test.testEnd!
  );
  return (
    <div className="flex gap-5 items-center">
      <div className="flex flex-col items-center text-yellow-200 font-bold w-1/5">
        <PoissonForm
          start={test.testStart!.slice(0, 16)}
          end={test.testEnd!.slice(0, 16)}
        />
      </div>
      <div className="flex-1 flex flex-col items-center pt-10">
        <CustomChart
          id="poissondistribution"
          data={poissonDistributionData.map((record) => record.probability)}
          labels={poissonDistributionData.map((record) => record.people)}
          xName={t("People")}
          yName={`${t("Probability")}, %`}
          bgColor="red"
        />
      </div>
    </div>
  );
};

export default PoissonAnalytics;
