"use client";

import { Chart, ChartTypeRegistry } from "chart.js/auto";
import { FC, useEffect } from "react";

interface ApproachChartProps {
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
  xName,
  yName,
}) => {
  useEffect(() => {
    const canvas = document.getElementById(id) as HTMLCanvasElement;
    var ctx = canvas.getContext("2d");
    const existingChart = Chart.getChart(ctx!);
    if (existingChart) {
      existingChart.destroy();
    }
    new Chart(ctx!, {
      type: type || "bar",
      data: {
        labels: labels || data.map((i, index) => index + 1),
        datasets: [
          {
            data: data,
            backgroundColor: bgColor || "#14b8a6",
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

  return <canvas id={id}></canvas>;
};

export default CustomChart;
