import React, { useState } from "react";

interface Props {
  onClose: () => void;
  onAdd: (episode: { name: string; url: string; duration: string }) => void;
}

const AddEpisodeModal: React.FC<Props> = ({ onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [duration, setDuration] = useState("");

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-40"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative z-10">
        <h2 className="text-xl font-bold mb-4">Thêm tập phim</h2>
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            onAdd({ name, url, duration });
          }}
        >
          <div className="w-full max-w-sm min-w-[200px]">
            <div className="relative">
              <select className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
                <option value="season1">Mùa 1</option>
                <option value="season2">Mùa 2</option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.2"
                stroke="currentColor"
                className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                />
              </svg>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Tên tập</label>
            <input
              type="text"
              className="w-full border border-gray-400 rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">URL</label>
            <input
              type="text"
              className="w-full border border-gray-400 rounded px-3 py-2"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Thời lượng
            </label>
            <input
              type="text"
              className="w-full border border-gray-400 rounded px-3 py-2"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              className="bg-gray-200 rounded px-4 py-2"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700 font-semibold"
            >
              Thêm
            </button>
          </div>
        </form>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl font-bold"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default AddEpisodeModal;
