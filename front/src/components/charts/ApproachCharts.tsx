import CustomChart from './CustomChart';
import { useTranslation } from '@/app/i18n';

interface ApproachChartsProps {
  results: any;
  lng: string;
}

const ApproachCharts = async ({ results, lng }: ApproachChartsProps) => {
  const approachesNumber = results.map(res => res.approaches.length);
  const totalDurations = results.map(result => {
    const totalDuration = result.approaches.reduce((acc, approach) => acc + approach.time, 0);
    return totalDuration;
  });
  const avgDurations = totalDurations.map((duration, index) => duration / approachesNumber[index]);
  const avgDistance = results.map((result, index) => {
    const totalDistance = result.approaches.reduce((acc, approach) => acc + approach.distance, 0);
    return totalDistance / approachesNumber[index];
  });
  const { t } = await useTranslation(lng);
  return (
    <div className="flex gap-5 justify-around flex-wrap font-bold text-zinc-300">
      <CustomChart
        id="appnumber"
        data={approachesNumber}
        name={t('App per period')}
        xName={t('Period')}
        yName={t('Approaches')}
      />
      <CustomChart
        id="appduration"
        data={totalDurations}
        name={t('App duration per period')}
        xName={t('Period')}
        yName={t('Duration (seconds)')}
        bgColor="yellow"
      />
      <CustomChart
        id="avgdistance"
        data={avgDistance}
        name={t('Avg distance per app')}
        xName={t('Period')}
        yName={t('Distance (centimeter)')}
      />
      <CustomChart
        id="avgduration"
        data={avgDurations}
        name={t('Avg app duration per period')}
        xName={t('Period')}
        yName={t('Avg duration (seconds)')}
        bgColor="yellow"
      />
    </div>
  );
};

export default ApproachCharts;
