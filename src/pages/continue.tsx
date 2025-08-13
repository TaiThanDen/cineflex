import { getViewHistory } from "@/lib/api";
import { Box, Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ContinueCard from "@/components/history/ContinueCard";
import React from "react";


const ContinueWatching: React.FC = () => {
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);

    const viewHistoryResult = useQuery({
        queryKey: ['view-history', page],
        queryFn: () => getViewHistory(page - 1, 5),
    })

    useEffect(() => {
        setCount(viewHistoryResult.data?.totalPage ?? 0)
    }, [viewHistoryResult])

    if (viewHistoryResult.isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-lg text-gray-600">
                        Đang tải
                    </p>
                </div>
            </div>
        )
    }

    // Xử lý trạng thái lỗi
    if (viewHistoryResult.isError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-red-600 mb-2">
                        Lỗi tải dữ liệu
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Không thể tải dữ liệu phim. Vui lòng thử lại.
                    </p>
                    <button
                        onClick={() => {
                        }}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-[#23263a] text-white py-10 px-6 pt-24">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-8">Continue Watching</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {viewHistoryResult.data!.data.map((vh) => {
                        return <ContinueCard viewHistory={vh} />
                    })}
                </div>
            </div>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination count={count + 1} page={page} onChange={(_, page) => {
                    setPage(page)
                }} />
            </Box>
        </div>
    );
};

export default ContinueWatching;
