import { FC } from 'react';
import CustomChart from './CustomChart';

interface ApproachChartsProps {
  results: any;
}

const ApproachCharts: FC<ApproachChartsProps> = ({ results }) => {
  const approachesByNumber = results.map(res => res.approaches.length);
  const totalDurations = results.map(result => {
    const totalDuration = result.approaches.reduce((acc, approach) => acc + approach.duration, 0);
    console.log(totalDuration);
    return totalDuration;
  });
  return (
    <div className="flex justify-around h-[500px]">
      <div className="flex flex-col items-center text-zinc-300 text-3xl font-bold w-2/5">
        Approaches per period
        <CustomChart id="appbynumber" data={approachesByNumber} />
      </div>
      <div className="flex flex-col items-center text-zinc-300 text-3xl font-bold w-2/5">
        Approaches duration per period
        <CustomChart id="appbyduration" data={totalDurations} bgColor="yellow" />
      </div>
    </div>
  );
};

export default ApproachCharts;
