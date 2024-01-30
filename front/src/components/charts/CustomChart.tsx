'use client';

import { FC, useEffect } from 'react';
import { Chart, ChartTypeRegistry } from 'chart.js/auto';

interface ApproachChartProps {
  name?: string;
  xName?: string;
  yName?: string;
  data: number[];
  id: string;
  bgColor?: string;
  labels?: number[];
  type?: keyof ChartTypeRegistry;
}

const CustomChart: FC<ApproachChartProps> = ({
  data,
  id,
  bgColor,
  labels,
  type,
  name,
  xName,
  yName,
}) => {
  useEffect(() => {
    const canvas = document.getElementById(id) as HTMLCanvasElement;
    var ctx = canvas.getContext('2d');
    const existingChart = Chart.getChart(ctx!);
    if (existingChart) {
      existingChart.destroy();
    }
    new Chart(ctx!, {
      type: type || 'bar',
      data: {
        labels: labels || data.map((i, index) => index + 1),
        datasets: [
          {
            data: data,
            backgroundColor: bgColor || '#14b8a6',
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: xName,
            },
          },
          y: {
            title: {
              display: true,
              text: yName,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }, []);

  return (
    <div className="flex flex-col items-center w-2/5 h-[500px]">
      <p className="text-2xl">{name}</p>
      <canvas id={id} className="flex-1"></canvas>
    </div>
  );
};

export default CustomChart;
