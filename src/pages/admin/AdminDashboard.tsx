import React, { useState } from "react";
import TopFavorites from "@/components/admin/DasboardComponent/TopFavorites";
import { TextField } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { getAllStats } from "@/lib/api";
import StatsCharts from "@/components/admin/DasboardComponent/StatsCharts";

const AdminDashboard: React.FC = () => {
  const [top, setTop] = useState(10);
  const [confirmedTop, setConfirmedTop] = useState(10);

  const handleConfirm = () => {
    setConfirmedTop(top); // pass confirmed value to TopFavorites
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["stats"],
    queryFn: getAllStats,
  });

  if (isLoading) return <p>Đang tải thống kê...</p>;
  if (isError || !data) return <p>Lỗi khi tải dữ liệu.</p>;

  // Dummy chart data
  const revenueData = [
    { month: "Hiện tại", revenue: data.activeSubscriptions * 10 },
  ];

  const userGrowthData = [
    { day: "Tổng", users: data.totalUsers },
    { day: "Free", users: data.freeUsers },
    { day: "Premium", users: data.activeSubscriptions },
  ];

  const pieData = [
    { name: "Free", value: data.freeUsers },
    { name: "Premium", value: data.activeSubscriptions },
  ];

  const COLORS = ["#6366F1", "#EC4899", "#FBBF24"];

  return (
    <div className="flex flex-col w-full h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b bg-white">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Chọn Top</span>
          <TextField
            type="number"
            value={top}
            onChange={(e) => setTop(Number(e.target.value))}
            size="small"
            className="bg-white rounded"
            inputProps={{ min: 1 }}
            label="Top"
            variant="outlined"
          />
          <button
            onClick={handleConfirm}
            className="bg-purple-500 hover:bg-purple-600 text-white normal-case shadow-md px-4 py-2 rounded-xl"
          >
            Xác nhận
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Favorites section */}
        <div className="bg-white shadow rounded-xl p-4 col-span-1 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Top Favorites</h2>
          <TopFavorites top={confirmedTop} />
        </div>
        <div className="col-span-1 lg:col-span-2">
          <StatsCharts />
        </div>
        {/* Dummy Charts */}
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#6366F1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-4">User Growth</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#EC4899"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-4">Content Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
