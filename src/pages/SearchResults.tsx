import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import type { ShowQuery } from "@/lib/types/ShowQuery";
import { useQuery } from "@tanstack/react-query";
import { queryShow } from "@/lib/api";
import { Pagination } from "@mui/material";
import MovieSection from "@/components/home/MovieSection";


const filterOptions = {
    type: ["Tất cả", "Phim lẻ", "Phim bộ"],
    rating: ["Tất cả", "G", "PG", "13+", "16+", "18+"],
    year: ["Tất cả", "2025", "2024", "2023", "2022", "2021", "2020"],
    genre: [
        "Tất cả", "Anime", "Hành Động", "Hài", "Kinh Dị", "Tâm Lý",
        "Lãng Mạn", "Viễn Tưởng", "Phiêu Lưu", "Phép Thuật", "Khoa Học",
    ],
};

const SearchResults = () => {
    const { search } = useLocation();
    const query = new URLSearchParams(search).get("q")?.toLowerCase() || "";
    // const queryClient = useQueryClient();

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const queryObject: ShowQuery = {
        ageRating: undefined,
        from: undefined,
        genres: undefined,
        keyword: undefined,
        to: undefined,
        series: undefined
    };

    const [filters, setFilters] = useState({
        type: "Tất cả",
        rating: "Tất cả",
        year: "Tất cả",
        genre: "Tất cả",
    });

    const searcResult = useQuery({
        queryKey: ["search", page],
        queryFn: () => queryShow(queryObject, page - 1, 8)
    })

    useEffect(() => {
        setTotalPage((searcResult.data?.totalPage ?? 0) + 1)
    }, [searcResult])





    const [showFilters, setShowFilters] = useState(false);

    const handleFilterChange = (key: string, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    useEffect(() => {
        const isSeries = filters.type === 'Phim bộ';
        if (filters.rating !== 'Tất cả') queryObject.ageRating = filters.rating;
        if (filters.type !== 'Tất cả') {
            queryObject.series = isSeries
        };
        if (filters.year !== 'Tất cả') {
            queryObject.from = `${filters.year}-01-01`;
            queryObject.to = `${filters.year}-12-31`;
        }
        if (filters.genre !== 'Tất cả') {
            queryObject.genres = [filters.genre]
        };

        if (query !== '') queryObject.keyword = query;

        searcResult.refetch();
    }, [filters, query])


    return (
        <div className="lg:pt-[7%] sm:p-[5%] px-1 md:px-2 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl md:text-3xl text-purple-400 font-semibold">
                    Kết quả tìm kiếm:{" "}
                    <span className="italic text-white">{query}</span>
                </h2>
            </div>
            <button
                onClick={() => setShowFilters((prev) => !prev)}
                className="flex items-center py-5 gap-2 text-sm text-purple-400 hover:text-purple-300 transition"
            >
                <Filter size={18} />
                <span className="hidden sm:inline">Lọc</span>
            </button>

            {showFilters && (
                <div className="bg-[#2b2e45c8] p-4 rounded-lg mb-6 shadow-inner space-y-4 text-sm">
                    {Object.entries(filterOptions).map(([key, options]) => (
                        <div key={key}>
                            <p className="text-gray-300 mb-1 font-medium capitalize">{key}:</p>
                            <div className="flex flex-wrap gap-2">
                                {options.map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => handleFilterChange(key, opt)}
                                        className={`px-3 py-1 rounded-xl border transition-colors duration-200 ${filters[key as keyof typeof filters] === opt
                                                ? "border-purple-500 text-purple-400"
                                                : "bg-transparent border-transparent text-gray-300 hover:text-purple-400"
                                            }`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={() =>
                            setFilters({
                                type: "Tất cả",
                                rating: "Tất cả",
                                year: "Tất cả",
                                genre: "Tất cả",
                            })
                        }
                        className="text-xs text-red-400 hover:text-red-300 border border-red-400 px-2 py-1 rounded-md transition"
                    >
                        Đặt lại bộ lọc
                    </button>
                </div>
            )}

            {
                (searcResult.data?.data && searcResult.data?.data.length !== 0) ? <>
                    <MovieSection title="" data={searcResult.data.data} showViewAll={false} />
                </>:<>
                    Không tìm thấy
                </>
            }
            

            <Pagination 
                className="flex items-center justify-center" 
                count={totalPage}
                page={page}
                onChange={(_, p) => {
                    setPage(p);
                }}
            />
        </div>
    );
};

export default SearchResults;
