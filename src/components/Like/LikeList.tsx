import { getLikedEpisodesByUser } from "@/lib/api";
import type { Episode } from "@/lib/types/Episode";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import EpisodeCard from "./EpisodeCard";
import { Box, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";

const LikeList: React.FC = () => {
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["liked_episodes", page],
        queryFn: () => getLikedEpisodesByUser(page - 1),
    });

    useEffect(() => {
        setCount(data?.totalPage ?? 0);
    }, [data]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto"></div>
                    <p className="mt-4 text-lg text-gray-300">
                        Đang tải
                    </p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-red-600 mb-2">
                        Lỗi tải dữ liệu
                    </h2>
                    <p className="text-gray-400 mb-4">
                        Không thể tải danh sách đã thích. Vui lòng thử lại.
                    </p>
                    <button
                        onClick={() => refetch()}
                        className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded transition-colors"
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }

    const episodes: Episode[] = data?.data ?? [];

    if (episodes.length === 0) {
        return (
            <div className="min-h-screen bg-[#23263a] text-white py-10 px-6 pt-24">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-center min-h-[50vh]">
                        <div className="text-center">
                            <div className="text-6xl mb-4">💜</div>
                            <h2 className="text-2xl font-bold text-gray-600 mb-2">
                                Chưa có tập nào được thích
                            </h2>
                            <p className="text-gray-400 mb-4">
                                Hãy thích một tập để xem ở đây.
                            </p>
                            <Link
                                to="/"
                                className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded transition-colors"
                            >
                                Khám phá nội dung
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#23263a] text-white py-10 px-6 pt-24">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-8">Tập đã thích</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {episodes.map((episode) => (
                        <EpisodeCard key={episode.id} episode={episode} />
                    ))}
                </div>
            </div>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination
                    count={count}
                    page={page}
                    onChange={(_, newPage) => setPage(newPage)}
                    sx={{
                        '& .MuiPaginationItem-root': {
                            color: 'white',
                        },
                        '& .MuiPaginationItem-root.Mui-selected': {
                            backgroundColor: '#7c3aed',
                            color: 'white',
                        },
                        '& .MuiPaginationItem-root:hover': {
                            backgroundColor: '#5b21b6',
                        },
                    }}
                />
            </Box>
        </div>
    );
};

export default LikeList;
