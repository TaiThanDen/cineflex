import { getFavorites } from "@/lib/api"
import { Box, Pagination } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import React from "react"
import FavoriteCard from "@/components/favorite/FavoriteCard"

const FavoritesPage: React.FC = () => {
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)

  const favoritesResult = useQuery({
    queryKey: ["favorites", page],
    queryFn: () => getFavorites(page - 1, 6),
  })

  useEffect(() => {
    setCount(favoritesResult.data?.totalPage ?? 0)
  }, [favoritesResult.data])

  if (favoritesResult.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-300">Đang tải danh sách yêu thích...</p>
        </div>
      </div>
    )
  }

  if (favoritesResult.isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Lỗi tải dữ liệu</h2>
          <p className="text-gray-400 mb-4">Không thể tải danh sách phim yêu thích. Vui lòng thử lại.</p>
          <button
            onClick={() => favoritesResult.refetch()}
            className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded"
          >
            Thử lại
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#23263a] text-white py-10 px-6 pt-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">My Favorites</h2>
        {favoritesResult.data?.data.length === 0 ? (
          <p className="text-gray-400">Bạn chưa thêm phim nào vào danh sách yêu thích.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favoritesResult.data!.data.map((show) => (
              <FavoriteCard key={show.id} showId={show.id} />
            ))}
          </div>
        )}
      </div>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={count}
          page={page}
          onChange={(_, page) => setPage(page)}
        />
      </Box>
    </div>
  )
}

export default FavoritesPage
