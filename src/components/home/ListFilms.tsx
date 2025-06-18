import { useEffect, useState } from "react";
import MovieSection from "./MovieSection";
import { get } from "@/lib/request";
import { type Show } from "@/lib/types/Show";



const ListFilms = () => {
  const [koreanShow, setKoreanShow] = useState<Show[]>();
  const [chineseShow, setChineseShow] = useState<Show[]>();
  const [uShow, setUShow] = useState<Show[]>();

  useEffect(() => {
    const handleShow = async () => {
      const k = await get<Show[]>("shows?genres=Phim Hàn Quốc");
      const c = await get<Show[]>("shows?genres=Phim Trung Quốc");
      const u = await get<Show[]>("shows?genres=Phim US-UK");

      setKoreanShow(k);
      setChineseShow(c);
      setUShow(u);
    }

    handleShow();
  }, [])

  return (
    <div className="bg-[#23263a] min-h-screen px-4 py-8 space-y-10">
      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h2 className={`text-xl md:text-2xl font-bold text-purple-300`}>
            Phim Hàn Quốc mới
          </h2>
          <button className="text-white text-sm hover:underline flex items-center gap-1">
            Xem toàn bộ ➔
          </button>
        </div>
        <MovieSection title="" data={koreanShow} showViewAll={false} />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h2 className={`text-xl md:text-2xl font-bold text-yellow-300`}>
            Phim US-UK mới
          </h2>
          <button className="text-white text-sm hover:underline flex items-center gap-1">
            Xem toàn bộ ➔
          </button>
        </div>
        <MovieSection title="" data={uShow} showViewAll={false} />
      </div>


      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h2 className={`text-xl md:text-2xl font-bold text-purple-300`}>
            Phim Trung Quốc mới
          </h2>
          <button className="text-white text-sm hover:underline flex items-center gap-1">
            Xem toàn bộ ➔
          </button>
        </div>
        <MovieSection title="" data={chineseShow} showViewAll={false} />
      </div>
    </div>
  );
};

export default ListFilms;
