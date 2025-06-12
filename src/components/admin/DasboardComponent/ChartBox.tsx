import React from "react";
import Chart from "react-apexcharts";

interface ChartBoxProps {
  title: string;
  options: any;
  series: any;
  type?: "area" | "bar" | "line" | "pie" | "polarArea" | "radar";
  height?: number | string;
}

const ChartBox: React.FC<ChartBoxProps> = ({
  title,
  options,
  series,
  type = "area",
  height = 280,
}) => (
  <div className="bg-white rounded-2xl shadow-lg p-8 flex-1 min-w-[320px]">
    <div className="text-base font-semibold mb-3 text-gray-700">{title}</div>
    <Chart options={options} series={series} type={type} height={height} />
  </div>
);

export default ChartBox;
