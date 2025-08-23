import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTopFavorites } from "@/lib/api";
import MovieBox from "@/components/admin/MovieManagerComponent/MovieBox";
import { Button } from "@mui/material";

const options = [
  { label: "Top 1", value: 1 },
  { label: "Top 3", value: 3 },
  { label: "Top 5", value: 5 },
  { label: "Top 10", value: 10 },
];

const MovieStats: React.FC = () => {
  const [topN, setTopN] = useState(3);
  const [page, setPage] = useState(0);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["top-favorites", page, topN],
    queryFn: () => getTopFavorites(page, topN),
  });

  return (
    <div className="container mx-auto p-6">
      {/* Header + Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* Tiêu đề */}
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
           Thống kê phim hot nhất
        </h2>

        {/* Thanh điều khiển */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <label
            htmlFor="topSelect"
            className="text-sm font-medium text-gray-700"
          >
            Chọn Top
          </label>
          <select
            id="topSelect"
            aria-label="Chọn Top phim"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={topN}
            onChange={(e) => {
              setTopN(Number(e.target.value));
              setPage(0);
            }}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <Button
            variant="contained"
            onClick={() => refetch()}
            sx={{
              bgcolor: "rgb(79 70 229)", // indigo-600
              "&:hover": { bgcolor: "rgb(67 56 202)" }, // indigo-700
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: "600",
              px: 3,
              py: 1,
              whiteSpace: "nowrap",
            }}
          >
            Xác nhận
          </Button>
        </div>
      </div>

      {/* Danh sách phim */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {isLoading && <p>⏳ Đang tải...</p>}
        {isError && <p>❌ Lỗi tải dữ liệu!</p>}
        {data &&
          data.data.map((movie) => (
            <MovieBox key={movie.id} movie={movie} onClick={() => {}} />
          ))}
      </div>
    </div>
  );
};

export default MovieStats;
