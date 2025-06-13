import React from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";

const Header: React.FC = () => (
  <header className="relative z-40 flex flex-wrap items-center justify-between px-4 py-5 gap-3 bg-transparent">
    {/* Search box */}
    {/* <div className="flex items-center gap-2 flex-1 min-w-0">
      <MdOutlineSearch size={20} className="text-gray-500 flex-shrink-0" />
      <input
        type="text"
        placeholder="Search podcast, quiz, user..."
        className="hidden sm:block flex-grow bg-gray-100 rounded-lg px-3 py-2 text-sm outline-none border-none min-w-[180px] max-w-md"
      />
    </div> */}
    <div></div>

    {/* Actions */}
    <div className="flex items-center gap-4 flex-shrink-0">
      <button className="flex items-center gap-1 bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-indigo-700 transition whitespace-nowrap">
        <MdOutlineCloudUpload size={18} />
        <span className="hidden xs:inline">Upload</span>
      </button>

      <button className="relative bg-gray-100 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer">
        <FaRegBell size={18} />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center font-bold">
          3
        </span>
      </button>

      <div>
        <MdOutlineAccountCircle size={32} className="text-indigo-600" />
      </div>
    </div>
  </header>
);

export default Header;
