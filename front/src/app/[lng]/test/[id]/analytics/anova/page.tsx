import { useTranslation } from "@/app/i18n";
import CustomChart from "@/components/charts/CustomChart";
import { getAnova, getTest } from "@/fetch/test";
import Link from "next/link";

const AnovaAnalysis = async ({
  params,
}: {
  params: { id: string; lng: string };
}) => {
  const { t } = (await useTranslation(params.lng)) as TranslationResult;
  const test = await getTest(params.id);
  const { testsAnovaData, anovaResult } = await getAnova(params.id);
  const anovaTests = testsAnovaData.map((data) => data.testsApproaches);
  return (
    <div className="flex flex-col w-full pt-10 gap-10">
      <div className="flex gap-5 items-center">
        <div className="flex flex-col items-center gap-3 w-1/2">
          <Link
            href={`${params.lng}/test/${testsAnovaData[0].id}`}
            className="text-amber-100 text-2xl hover:text-transparent mx-auto hover:bg-clip-text hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 font-bold cursor-pointer duration-300"
          >
            {testsAnovaData[0].name}
          </Link>
          <CustomChart
            id="anovaAnalysis1"
            data={anovaTests[0].map((app) => app.time)}
            labels={anovaTests[0].map((app) => app.distance)}
            xName={`${t("Distance")}, m`}
            yName={`${t("Time")}, s`}
            bgColor="blue"
            type="bubble"
          />
        </div>
        <div className="flex flex-col items-center gap-3 w-1/2">
          <Link
            href={`${params.lng}/test/${testsAnovaData[1].id}`}
            className="text-amber-100 text-2xl hover:text-transparent mx-auto hover:bg-clip-text hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 font-bold cursor-pointer duration-300"
          >
            {testsAnovaData[1].name}
          </Link>
          <CustomChart
            id="anovaAnalysis2"
            data={anovaTests[1].map((app) => app.time)}
            labels={anovaTests[1].map((app) => app.distance)}
            xName={`${t("Distance")}, m`}
            yName={`${t("Time")}, s`}
            bgColor="yellow"
            type="bubble"
          />
        </div>
      </div>
      <p className="text-amber-100 text-2xl mx-auto  font-bold cursor-pointer duration-30">
        {anovaResult}
      </p>
    </div>
  );
};

export default AnovaAnalysis;
