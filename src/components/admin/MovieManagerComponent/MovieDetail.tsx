import React, { useState } from "react";
import AddSeasonModal from "./AddSeasonModal";
import AddEpisodeModal from "./AddEpisodeModal";

interface Props {
  movie: any;
  onBack: () => void;
  onEditEpisode: (
    movieId: string,
    seasonIdx: number,
    episodeIdx: number
  ) => void;
}

const MovieDetail: React.FC<Props> = ({ movie, onBack, onEditEpisode }) => {
  const [seasonIdx, setSeasonIdx] = useState(0);
  const [showAddSeason, setShowAddSeason] = useState(false);
  const [showAddEpisode, setShowAddEpisode] = useState(false);

  return (
    <div className="container mx-auto py-8 flex gap-8">
      {/* Left */}
      <div className="w-1/4 border-r p-6 flex flex-col gap-4">
        <img
          src={movie.poster}
          alt="Poster"
          className="w-70 h-auto object-cover rounded-xl mb-4"
        />
        <div className="flex flex-wrap gap-2">
          {movie.tags.map((tag: string) => (
            <span
              key={tag}
              className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
        <div>
          <div className="font-bold text-sm mb-1 mt-2">Mô tả phim</div>
          <div className="text-gray-600 text-sm">{movie.description}</div>
        </div>
        <button
          onClick={onBack}
          className="mt-4 text-blue-500 hover:underline text-sm"
        >
          ← Quay lại
        </button>
      </div>
      {/* Right */}
      <div className="w-3/4 p-6 relative">
        {/* Nút thêm */}
        <div className="flex justify-end gap-2 mb-4">
          <button
            className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 text-sm font-semibold flex items-center gap-1"
            onClick={() => setShowAddSeason(true)}
          >
            + Thêm mùa phim
          </button>
          <button
            className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 text-sm font-semibold flex items-center gap-1"
            onClick={() => setShowAddEpisode(true)}
          >
            + Thêm tập phim
          </button>
        </div>
        {/* Tabs season */}
        <div className="mb-2">
          <ul className="flex border-b border-gray-400 text-sm gap-1">
            {movie.seasons.map((s: any, idx: number) => (
              <li key={s.seasonNumber}>
                <button
                  className={`px-4 py-2 border-b-2 font-semibold ${
                    seasonIdx === idx
                      ? "border-indigo-600 text-indigo-700"
                      : "border-transparent text-gray-600 hover:text-indigo-600"
                  }`}
                  onClick={() => setSeasonIdx(idx)}
                >
                  Mùa {s.seasonNumber}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* Table episode */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-2 px-3 font-bold">#</th>
                <th className="py-2 px-3 font-bold">Tên tập</th>
                <th className="py-2 px-3 font-bold">URL</th>
                <th className="py-2 px-3 font-bold">Thời lượng</th>
                <th className="py-2 px-3 font-bold">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {movie.seasons[seasonIdx].episodes.map(
                (ep: any, epIdx: number) => (
                  <tr className="border-b border-gray-400" key={ep.id}>
                    <td className="py-2 px-3">{epIdx + 1}</td>
                    <td className="py-2 px-3">{ep.name}</td>
                    <td className="py-2 px-3">{ep.url}</td>
                    <td className="py-2 px-3">{ep.duration}</td>
                    <td className="py-2 px-3">
                      <button
                        className="bg-yellow-400 hover:bg-yellow-500 text-white rounded px-2 py-1 text-xs font-semibold"
                        onClick={() =>
                          onEditEpisode(movie.id, seasonIdx, epIdx)
                        }
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        {showAddSeason && (
          <AddSeasonModal
            onClose={() => setShowAddSeason(false)}
            onAdd={(seasonNumber) => {
              // Xử lý thêm mùa phim ở đây
              setShowAddSeason(false);
            }}
          />
        )}
        {showAddEpisode && (
          <AddEpisodeModal
            onClose={() => setShowAddEpisode(false)}
            onAdd={(episode) => {
              // Xử lý thêm tập phim ở đây
              setShowAddEpisode(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
