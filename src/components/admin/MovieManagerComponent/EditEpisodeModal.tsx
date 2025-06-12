import React from "react";

interface Props {
  episode: {
    name: string;
    url: string;
    duration: string;
  };
  onClose: () => void;
}

const EditEpisodeModal: React.FC<Props> = ({ episode, onClose }) => {
  // Có thể thêm state quản lý input nếu muốn
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-40"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative z-10">
        <h2 className="text-xl font-bold mb-4">Chỉnh sửa tập phim</h2>
        <form className="flex flex-col gap-3">
          <div>
            <label className="block text-sm font-semibold mb-1">Tên tập</label>
            <input
              type="text"
              className="w-full border border-gray-400 rounded px-3 py-2"
              defaultValue={episode.name}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">URL</label>
            <input
              type="text"
              className="w-full border border-gray-400 rounded px-3 py-2"
              defaultValue={episode.url}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Thời lượng
            </label>
            <input
              type="text"
              className="w-full border border-gray-400 rounded px-3 py-2"
              defaultValue={episode.duration}
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
              className="bg-indigo-600 text-white rounded px-4 py-2 hover:bg-indigo-700 font-semibold"
            >
              Lưu
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

export default EditEpisodeModal;
