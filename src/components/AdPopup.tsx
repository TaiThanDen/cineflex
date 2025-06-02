import React from "react";

interface AdPopupProps {
  show: boolean;
  onClose: () => void;
  script?: string;
}

const AdPopup: React.FC<AdPopupProps> = ({ show, onClose, script }) => {
  if (!show) return null;

  return (
    <div className="absolute inset-0 bg-black/70 z-[100] flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg p-4 shadow-lg flex flex-col items-center">
        {/* Render script quảng cáo */}
        {script && (
          <div
            style={{ width: 320, height: 250 }}
            dangerouslySetInnerHTML={{ __html: script }}
          />
        )}
        <button
          onClick={onClose}
          className="bg-[#23263a] text-white px-6 py-2 rounded mt-2 text-lg font-semibold"
        >
          Đóng và Xem Tiếp
        </button>
      </div>
    </div>
  );
};

export default AdPopup;
