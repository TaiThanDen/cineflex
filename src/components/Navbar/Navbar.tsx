import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaSearch, FaBars } from "react-icons/fa";
import NavLink from "./NavLink";
import DropDown from "./DropDown"; // adjust path as needed

interface props {
  scrolled: boolean;
}

const Navbar = ({ scrolled }: props) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    const trimmed = search.trim();
    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <nav
      className={`flex flex-row w-full transition-all duration-300 ease-in-out sticky left-0 top-0 text-white z-20 h-15 ${
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
      <div className="w-[50%] relative m-2">
        <div className="relative flex gap-4">
          <input
            className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md pl-3 pr-10 py-2 focus:outline-none"
            placeholder="Search for what you want to watch"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
            onClick={handleSubmit}
          >
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
