import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllStats } from "@/lib/api";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";

const COLORS = ["#82ca9d", "#8884d8"]; // Free, Premium

const StatsCharts: React.FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["stats"],
    queryFn: getAllStats,
  });

  if (isLoading) return <p>Đang tải thống kê...</p>;
  if (isError || !data) return <p>Lỗi khi tải dữ liệu.</p>;

  // Pie chart data
  const pieData = [
    { name: "Người dùng miễn phí", value: data.freeUsers },
    { name: "Người dùng premium", value: data.activeSubscriptions },
  ];

  // Bar chart data
  const barData = [
    {
      name: "Người dùng",
      "Tổng số": data.totalUsers,
      "Miễn phí": data.freeUsers,
      "Premium": data.activeSubscriptions,
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
    </div>
  );
};

export default StatsCharts;
