  import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaBars } from "react-icons/fa";
import NavLink from "./NavLink";
import DropDown from "./DropDown";
import { unifiedData } from "../data/mockdata"; // adjust path as needed

interface props {
  scrolled: boolean;
}

const Navbar = ({ scrolled }: props) => {
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Use unifiedData for searching
  const filteredFilms = unifiedData.filter(
    (film) =>
      film.title.toLowerCase().includes(search.toLowerCase()) ||
      (film.title && film.title.toLowerCase().includes(search.toLowerCase()))
  );

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
      <div className="w-full h-full m-2 relative">
        <div className="relative flex gap-4">
          <input
            className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Search for what you want to watch"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowResults(e.target.value.length > 0);
            }}
            onFocus={() => setShowResults(search.length > 0)}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
          />
          <button className="text-white">
            <FaSearch />
          </button>
        </div>
        {showResults && (
          <div className="absolute left-0 top-12 w-full bg-[#23263a] rounded shadow-lg z-50 max-h-96 overflow-y-auto">
            <div className="p-3 border-b border-gray-700 text-sm text-gray-300 font-semibold">
              Danh sách phim
            </div>
            {filteredFilms.length === 0 ? (
              <div className="p-3 text-gray-400">Không tìm thấy phim</div>
            ) : (
              filteredFilms.map((film) => (
                <Link
                  to={`/preview/${film.id}`}
                  key={film.id}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-[#2f3147] transition"
                >
                  <img
                    src={film.image}
                    alt={film.title}
                    className="w-12 h-16 object-cover rounded"
                  />
                  <div>
                    <div className="font-bold text-white">{film.title}</div>
                    <div className="text-xs text-gray-400">{film.title}</div>
                    <div className="text-xs text-gray-400">
                      {film.year} • {film.rating}
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
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
