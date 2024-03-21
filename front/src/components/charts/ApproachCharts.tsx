import { useTranslation } from "@/app/i18n";
import { Result } from "types-realtest";
import CustomChart from "./CustomChart";

interface ApproachChartsProps {
  results: Result[];
  lng: string;
}

const ApproachCharts = async ({ results, lng }: ApproachChartsProps) => {
  const approachesNumber = results.map((res) => res.approaches.length);
  const totalDurations = results.map((result) => {
    const totalDuration = result.approaches.reduce(
      (acc, approach) => acc + approach.time,
      0
    );
    return totalDuration;
  });
  const avgDurations = totalDurations.map(
    (duration, index) => duration / approachesNumber[index]
  );
  const avgDistance = results.map((result, index) => {
    const totalDistance = result.approaches.reduce(
      (acc, approach) => acc + approach.distance,
      0
    );
    return totalDistance / approachesNumber[index];
  });
  const { t } = await useTranslation(lng);
  return (
    <div className="flex gap-5 justify-around flex-wrap font-bold text-zinc-300">
      <div className="flex flex-col items-center w-2/5 h-[500px]">
        <p className="text-2xl">{t("App per period")}</p>
        <CustomChart
          id="appnumber"
          data={approachesNumber}
          xName={t("Period")}
          yName={t("Approaches")}
        />
      </div>
      <div className="flex flex-col items-center w-2/5 h-[500px]">
        <p className="text-2xl">{t("App duration per period")}</p>
        <CustomChart
          id="appduration"
          data={totalDurations}
          xName={t("Period")}
          yName={t("Duration (seconds)")}
          bgColor="yellow"
        />
      </div>
      <div className="flex flex-col items-center w-2/5 h-[500px]">
        <p className="text-2xl">{t("Avg distance per app")}</p>
        <CustomChart
          id="avgdistance"
          data={avgDistance}
          xName={t("Period")}
          yName={t("Distance (centimeter)")}
        />
      </div>
      <div className="flex flex-col items-center w-2/5 h-[500px]">
        <p className="text-2xl">{t("Avg app duration per period")}</p>
        <CustomChart
          id="avgduration"
          data={avgDurations}
          xName={t("Period")}
          yName={t("Avg duration (seconds)")}
          bgColor="yellow"
        />
      </div>
    </div>
  );
};

export default ApproachCharts;
