import { useEffect, useState } from "react";
import MovieSection from "./MovieSection";
import type { Show } from "@/lib/types/Show";
import { get } from "@/lib/api";


const ListAnime = () => {
  const [newAnime, setNewAnime] = useState<Show[]>();
  const [mysteryAnime, setMysteryAnime] = useState<Show[]>();
  const [decadalAnime, setDecadalAnime] = useState<Show[]>();

  useEffect(() => {
    const handleAnime = async () => {
      const n = await get<Show[]>('shows?genres=Anime&genres=Mới');
      const m = await get<Show[]>('shows?genres=Anime&genres=Trinh thám');
      const d = await get<Show[]>('shows?genres=Anime&genres=Thập kỷ');

      setNewAnime(n);
      setMysteryAnime(m);
      setDecadalAnime(d);
    }

    handleAnime();
   })

  return (
    <div className="bg-[#23263a] min-h-screen px-4 py-8 space-y-10">
      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h2 className={`text-xl md:text-2xl font-bold text-purple-300`}>
            Anime mới tới chơi bro 🥴
          </h2>
          <button className="text-white text-sm hover:underline flex items-center gap-1">
            Xem toàn bộ ➔
          </button>
        </div>
        <MovieSection title="" data={newAnime} showViewAll={false} />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h2 className={`text-xl md:text-2xl font-bold text-yellow-300`}>
            Nổ não với anime hình sự 🤯
          </h2>
          <button className="text-white text-sm hover:underline flex items-center gap-1">
            Xem toàn bộ ➔
          </button>
        </div>
        <MovieSection title="" data={mysteryAnime} showViewAll={false} />
      </div>


      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h2 className={`text-xl md:text-2xl font-bold text-purple-300`}>
            Anime Thập Kỷ
          </h2>
          <button className="text-white text-sm hover:underline flex items-center gap-1">
            Xem toàn bộ ➔
          </button>
        </div>
        <MovieSection title="" data={decadalAnime} showViewAll={false} />
      </div>
    </div>
  );
};

export default ListAnime;
