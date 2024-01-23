'use client';

import { FC, useEffect } from 'react';
import { Chart, ChartTypeRegistry } from 'chart.js/auto';

interface ApproachChartProps {
  data: number[];
  id: string;
  bgColor?: string;
  labels?: number[];
  type?: keyof ChartTypeRegistry;
}

const CustomChart: FC<ApproachChartProps> = ({ data, id, bgColor, labels, type }) => {
  useEffect(() => {
    const canvas = document.getElementById(id) as HTMLCanvasElement;
    var ctx = canvas.getContext('2d');
    const existingChart = Chart.getChart(ctx!);
    if (existingChart) {
      existingChart.destroy();
    }
    new Chart(ctx!, {
      type: type || 'bar',
      options: {
        indexAxis: 'x',
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
      data: {
        labels: labels || data.map((i, index) => index + 1),
        datasets: [
          {
            data: data,
            backgroundColor: bgColor || '#14b8a6',
          },
        ],
      },
    });
  }, []);

  return <canvas id={id} className="h-full w-full"></canvas>;
};

export default CustomChart;
