import { useEffect, useState } from "react"
import { getFavorites } from "@/lib/api"
import FavoriteCard from "./FavoriteCard"

const FavoriteList = () => {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const fetchFavorites = async () => {
      const rsp = await getFavorites(0, 6)
      // rsp.data: Show[]
      setFavorites(rsp.data.map((s) => s.id))
    }
    fetchFavorites()
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {favorites.map((id) => (
        <FavoriteCard key={id} showId={id} />
      ))}
    </div>
  )
}

export default FavoriteList
