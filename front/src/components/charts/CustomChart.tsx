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
    const xLabels = labels || data.map((i, index) => index + 1);
    if (data.length > 1) {
      const canvas = document.getElementById(id) as HTMLCanvasElement;
      var ctx = canvas.getContext("2d");
      const existingChart = Chart.getChart(ctx!);
      if (existingChart) {
        existingChart.destroy();
      }
      new Chart(ctx!, {
        type: type || "bar",
        data: {
          labels: xLabels,
          datasets: [
            {
              data: data.map((value, index) => ({
                x: xLabels[index],
                y: value,
                r: (value * 20) / xLabels[index],
              })),
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
            tooltip: {
              callbacks: {
                label: function (context) {
                  const labelX = context.dataset.label || xName;
                  const labelY = context.dataset.label || yName;
                  const yData = context.dataset.data[context.dataIndex] as {
                    y: number;
                  };
                  return `${labelX}: ${
                    xLabels[context.dataIndex]
                  }, ${labelY}: ${yData.y.toFixed(1)}`;
                },
              },
            },
            legend: {
              display: false,
            },
          },
        },
      });
    }
  }, []);

  if (data.length === 1) {
    return (
      <h1 className="flex items-center justify-center font-bold text-2xl text-slate-200">
        No available data
      </h1>
    );
  }

  return <canvas id={id}></canvas>;
};

export default CustomChart;
