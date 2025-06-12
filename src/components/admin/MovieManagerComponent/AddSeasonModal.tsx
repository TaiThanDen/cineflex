import React, { useState } from "react";

interface Props {
  onClose: () => void;
  onAdd: (seasonNumber: number) => void;
}

const AddSeasonModal: React.FC<Props> = ({ onClose, onAdd }) => {
  const [seasonNumber, setSeasonNumber] = useState<number>(1);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose}></div>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative z-10">
        <h2 className="text-xl font-bold mb-4">Thêm mùa phim</h2>
        <form
          className="flex flex-col gap-3"
          onSubmit={e => {
            e.preventDefault();
            onAdd(seasonNumber);
          }}
        >
          <div>
            <label className="block text-sm font-semibold mb-1">Số mùa</label>
            <input
              type="number"
              min={1}
              className="w-full border border-gray-400 rounded px-3 py-2"
              value={seasonNumber}
              onChange={e => setSeasonNumber(Number(e.target.value))}
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

export default AddSeasonModal;