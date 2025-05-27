// import { useState } from "react";
import { Link } from "react-router";
import { FaSearch, FaBars } from "react-icons/fa";
import NavLink from "./NavLink";
import DropDown from "./DropDown";

interface props {
  scrolled: boolean;
}

const Navbar = ({ scrolled }: props) => {
  // const [isOpen, setIsOpen] = useState(false);
  //
  return (
    <nav
      className={`flex flex-row w-full transition-all duration-300 ease-in-out sticky left-0 top-0 text-white z-60 h-15 ${
        scrolled
          ? "bg-[#2f3147]"
          : "bg-gradient-to-b from-[#23263a] to-transparent"
      }`}
    >
      <Link
        to="/"
        className="flex items-center space-x-3 w-full rtl:space-x-reverse flex-1 my-5 font-bold text-center mx-5"
      >
        CINEFLEX
      </Link>
      <div className="w-full h-full m-2">
        <div className="relative flex gap-4">
          <input
            className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Search for what you want to watch"
          />
          <button className="text-white">
            <FaSearch />
          </button>
        </div>
      </div>
      <ul className="items-cente justify-center pl-5 space-x-8 hidden lg:flex flex-auto flex-row w-full">
        <NavLink path="/">Phim lẻ</NavLink>
        <NavLink path="/">Phim bộ</NavLink>
        <DropDown path="/" items={[{ label: <label>aaa</label>, path: "1" }]}>
          Thể loại
        </DropDown>
      </ul>
      <div className="px-5 h-full md:hidden flex items-center justify-center">
        <FaBars />
      </div>
    </nav>
  );
};

export default Navbar;
