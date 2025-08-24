import React, { useState } from "react";
import TopFavorites from "@/components/admin/DasboardComponent/TopFavorites";
import { TextField } from "@mui/material";
import {
  // BarChart,
  // Bar,
  // XAxis,
  // YAxis,
  // CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { getTotalRevenue, getAllStats, getTotalAds } from "@/lib/api";
import StatsCharts from "@/components/admin/DasboardComponent/StatsCharts";

const AdminDashboard: React.FC = () => {
  const [top, setTop] = useState(10);
  const [confirmedTop, setConfirmedTop] = useState(10);

  const handleConfirm = () => {
    setConfirmedTop(top); // pass confirmed value to TopFavorites
  };
  const { data: stats, isLoading: statsLoading, isError: statsError } = useQuery({
  queryKey: ["stats"],
  queryFn: getAllStats,
  });

  const { data: revenue, isLoading: revenueLoading, isError: revenueError } = useQuery({
  queryKey: ["revenue"],
  queryFn: getTotalRevenue,
  });

  const { data: ads, isLoading: adsLoading, isError: adsError } = useQuery({
  queryKey: ["ads"],
  queryFn: getTotalAds,
  });

if (statsLoading || revenueLoading || adsLoading ) return <p>Đang tải thống kê...</p>;
if (statsError || revenueError || adsError || !stats) return <p>Lỗi khi tải dữ liệu.</p>;

  // // Dummy chart data
  //   const revenueData = [
  //   { label: "Tổng doanh thu", revenue: revenue ?? 0 },
  // ];

  // const userGrowthData = [
  //   { day: "Tổng", users: stats.totalUsers },
  //   { day: "Free", users: stats.freeUsers },
  //   { day: "Premium", users: stats.activeSubscriptions },
  // ];

  const pieData = [
    { name: "Free", value: stats.freeUsers },
    { name: "Premium", value: stats.activeSubscriptions },  
  ];
  

  const COLORS = ["#6366F1", "#EC4899", "#FBBF24"];

  return (
    <div className="flex flex-col w-full h-full bg-gray-50">
      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Top Favorites section */}
        <div className="bg-white shadow rounded-xl p-4 col-span-1 lg:col-span-2">
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
          <TopFavorites top={confirmedTop} />
        </div>
        <div className="col-span-1 lg:col-span-2">
          <StatsCharts />
        </div>

        {/* Charts */}
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-4">Tổng quan doanh thu</h2>
          <div className="bg-white shadow-sm rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-lg font-semibold text-gray-600 mb-3">
              Tổng doanh thu
            </h2>
            <p className="text-5xl font-extrabold drop-shadow-sm">
              {(revenue ?? 0).toLocaleString("vi-VN")} ₫
            </p>
            <span className="mt-2 text-sm text-gray-400">cập nhật gần đây</span>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-lg font-semibold text-gray-600 mb-3">
            Tổng số quảng cáo
          </h2>
          <p className="text-5xl font-extrabold drop-shadow-sm lg:pt-10 md:pt-5 sm:pt-3">
            {ads ?? 0}
          </p>
          <span className="mt-2 text-sm text-gray-400">cập nhật gần đây</span>
        </div>


        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-4">Phân bổ nội dung</h2>
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
