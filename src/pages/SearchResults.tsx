import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { Filter, ArrowLeft } from "lucide-react";
import type { ShowQuery } from "@/lib/types/ShowQuery";
import { useQuery } from "@tanstack/react-query";
import { getAllGenres, queryShow } from "@/lib/api";
import { Pagination } from "@mui/material";
import MovieSection from "@/components/home/MovieSection";
import { Link } from "react-router";

const filterOptions = {
  type: ["Tất cả", "Phim lẻ", "Phim bộ"],
  rating: ["Tất cả", "G", "PG", "13+", "16+", "18+"],
  year: ["Tất cả", "2025", "2024", "2023", "2022", "2021", "2020"],
};

const SearchResults = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  //  read all possible params
  const query = params.get("q")?.toLowerCase() || "";
  const genreParam = params.get("genre") || "Tất cả";
  const typeParam = params.get("type") || "Tất cả";

  const allGenresResult = useQuery({
    queryKey: ["genres"],
    queryFn: () => getAllGenres(),
  });

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const [filters, setFilters] = useState({
    type: typeParam,
    rating: "Tất cả",
    year: "Tất cả",
    genre: genreParam,
  });

  //  Sync filters with URL params when they change
  useEffect(() => {
    setFilters({
      type: typeParam,
      rating: "Tất cả",
      year: "Tất cả",
      genre: genreParam,
    });
    setPage(1); // Reset to first page when URL changes
  }, [genreParam, typeParam, query]); // Dependencies: watch for URL param changes

  // Tạo query object động
  const createQueryObject = (): ShowQuery => {
    const queryObject: ShowQuery = {
      ageRating: undefined,
      from: undefined,
      genres: undefined,
      keyword: undefined,
      to: undefined,
      series: undefined,
    };

    if (filters.rating !== "Tất cả") queryObject.ageRating = filters.rating;
    if (filters.type !== "Tất cả") {
      queryObject.series = filters.type === "Phim bộ";
    }
    if (filters.year !== "Tất cả") {
      queryObject.from = `${filters.year}-01-01`;
      queryObject.to = `${filters.year}-12-31`;
    }
    if (filters.genre !== "Tất cả") {
      queryObject.genres = [filters.genre];
    }
    if (query !== "") queryObject.keyword = query;

    return queryObject;
  };

  const searchResult = useQuery({
    queryKey: ["search", filters, page, query],
    queryFn: () => queryShow(createQueryObject(), page - 1, 12),
    staleTime: 5000,
  });

  useEffect(() => {
    setTotalPage((searchResult.data?.totalPage ?? 0) + 1);
  }, [searchResult]);

  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setFilters({
      type: typeParam || "Tất cả",
      rating: "Tất cả",
      year: "Tất cả",
      genre: genreParam || "Tất cả",
    });
    setPage(1);
  };

  //  Tạo title động cho tất cả cases
  const getPageTitle = () => {
    const parts = [];

    if (query) {
      parts.push(`"${query}"`);
    }

    if (genreParam !== "Tất cả") {
      parts.push(genreParam);
    }

    if (typeParam !== "Tất cả") {
      parts.push(typeParam);
    }

    if (parts.length === 0) {
      return "Tất cả phim";
    }

    return parts.join(" • ");
  };

  return (
    <div className="min-h-screen bg-[#23263a] lg:pt-[7%] sm:p-[5%] px-4 md:px-6 max-w-7xl mx-auto mt-20 sm:mt-0 ">
      {/* Header với breadcrumb */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          to="/home"
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="hidden sm:inline">Trang chủ</span>
        </Link>
        <h2 className="text-2xl md:text-3xl text-white font-bold">
          {query ? "Kết quả: " : ""}
          <span className="text-purple-400">
            {getPageTitle()}
          </span>
        </h2>
      </div>

      {/* Filter toggle */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors px-4 py-2 rounded-lg border border-purple-400/30 hover:border-purple-400/60"
        >
          <Filter size={18} />
          <span>Bộ lọc</span>
        </button>
      </div>

      {
        showFilters && (
          <div className="bg-[#2b2e45] p-4 md:p-6 rounded-lg mb-6 shadow-lg border border-gray-600">
            <div className="space-y-4">
              {Object.entries(filterOptions).map(([key, options]) => (
                <div key={key}>
                  <p className="text-gray-300 mb-2 font-medium capitalize text-sm md:text-base">
                    {key === "type" ? "Loại phim" : key === "rating" ? "Độ tuổi" : "Năm"}:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleFilterChange(key, opt)}
                        className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 ${filters[key as keyof typeof filters] === opt
                          ? "bg-purple-600 text-white border-purple-500"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white border-gray-600"
                          } border`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Dynamic Genre buttons */}
              {!allGenresResult.isLoading && !allGenresResult.isError && (
                <div>
                  <p className="text-gray-300 mb-2 font-medium text-sm md:text-base">
                    Thể loại:
                  </p>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                    <button
                      onClick={() => handleFilterChange("genre", "Tất cả")}
                      className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 ${filters.genre === "Tất cả"
                        ? "bg-purple-600 text-white border-purple-500"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white border-gray-600"
                        } border`}
                    >
                      Tất cả
                    </button>
                    {allGenresResult.data?.map((genre) => (
                      <button
                        key={genre.id}
                        onClick={() => handleFilterChange("genre", genre.name)}
                        className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 ${filters.genre === genre.name
                          ? "bg-purple-600 text-white border-purple-500"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white border-gray-600"
                          } border`}
                      >
                        {genre.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Reset filters */}
              <div className="pt-2 border-t border-gray-600">
                <button
                  onClick={resetFilters}
                  className="text-sm text-red-400 hover:text-red-300 border border-red-400/50 hover:border-red-400 px-3 py-1.5 rounded-lg transition-all"
                >
                  Đặt lại bộ lọc
                </button>
              </div>
            </div>
          </div>
        )
      }

      {/* Loading State */}
      {
        searchResult.isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-700 aspect-[2/3] rounded-lg mb-2"></div>
                <div className="bg-gray-700 h-4 rounded mb-1"></div>
                <div className="bg-gray-700 h-3 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        )
      }

      {/* Results */}
      {
        !searchResult.isLoading && (
          <>
            {searchResult.data?.data && searchResult.data.data.length > 0 ? (
              <MovieSection
                title=""
                data={searchResult.data.data}
                showViewAll={false}
                overflowX={false}
              />
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-2">
                  Không tìm thấy phim nào
                </div>
                <div className="text-gray-500 text-sm mb-4">
                  Thử thay đổi bộ lọc để xem thêm kết quả
                </div>
                <button
                  onClick={resetFilters}
                  className="text-purple-400 hover:text-purple-300 underline"
                >
                  Đặt lại bộ lọc
                </button>
              </div>
            )}
          </>
        )
      }

      {/* Pagination */}
      {
        !searchResult.isLoading && searchResult.data?.data && searchResult.data.data.length > 0 && (
          <div className="flex justify-center mt-8 pb-8">
            <Pagination
              count={totalPage}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#7c3aed',
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#7c3aed',
                    color: 'white',
                  },
                },
              }}
            />
          </div>
        )
      }
    </div >
  );
};

export default SearchResults;
