import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllStats, getTotalAds } from "@/lib/api";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";

const COLORS = ["#82ca9d", "#8884d8"]; // Free, Premium

const StatsCharts: React.FC = () => {
  const { data: stats, isLoading: statsLoading, isError: statsError } = useQuery({
    queryKey: ["stats"],
    queryFn: getAllStats,
  });

  const { data: ads, isLoading: adsLoading, isError: adsError } = useQuery({
    queryKey: ["ads"],
    queryFn: getTotalAds,
  });

  if (statsLoading || adsLoading) return <p>Đang tải thống kê...</p>;
  if (statsError || adsError || !stats) return <p>Lỗi khi tải dữ liệu.</p>;
  // Pie chart data
  const pieData = [
    { name: "Người dùng miễn phí", value: stats.freeUsers },
    { name: "Người dùng premium", value: stats.activeSubscriptions },
  ];

  // Bar chart data
  const barData = [
    {
      name: "Người dùng",
      "Tổng số": stats.totalUsers,
      "Miễn phí": stats.freeUsers,
      "Premium": stats.activeSubscriptions,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6 my-8">
      {/* Pie Chart */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-lg font-bold mb-4 text-gray-700">
          Tỉ lệ Free vs Premium
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((_, idx) => (
                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-lg font-bold mb-4 text-gray-700">
          Thống kê người dùng
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Tổng số" fill="#8884d8" />
            <Bar dataKey="Miễn phí" fill="#82ca9d" />
            <Bar dataKey="Premium" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Ads card */}
      <div className="bg-white p-6 rounded-2xl shadow flex flex-col items-center justify-center">
        <h2 className="text-lg font-bold mb-2 text-gray-700">
          Tổng số quảng cáo
        </h2>
        <p className="text-4xl font-extrabold text-emerald-500">
          {ads ?? 0}
        </p>
      </div>
    </div>
  );
};

export default StatsCharts;
