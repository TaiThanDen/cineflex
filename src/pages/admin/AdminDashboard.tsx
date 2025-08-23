import React, { useState } from "react";
import TopFavorites from "@/components/admin/DasboardComponent/TopFavorites";
import { TextField } from "@mui/material";


const AdminDashboard: React.FC = () => {
  const [top, setTop] = useState(10);
  const [confirmedTop, setConfirmedTop] = useState(10);

  const handleConfirm = () => {
    setConfirmedTop(top); // pass confirmed value to TopFavorites
  };

  return (
    <div className="flex flex-col w-full h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b bg-white">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Chọn Top</span>
          <TextField
            type="number"
            value={top}
            onChange={(e) => setTop(Number(e.target.value))}
            size="small"
            className="bg-white rounded"
            inputProps={{ min: 1 }} // optional: prevent negative values
            label="Top"
            variant="outlined"
          />
          <button
            onClick={handleConfirm}
            className="bg-purple-500 hover:bg-purple-600 text-white normal-case shadow-md p-3 rounded-xl"
          >
            Xác nhận
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Pass confirmedTop to TopFavorites */}
        <TopFavorites top={confirmedTop} />
      </div>
    </div>
  );
};

export default AdminDashboard;
