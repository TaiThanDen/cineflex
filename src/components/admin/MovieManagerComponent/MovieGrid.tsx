import React, { useState } from "react";
import MovieBox from "./MovieBox";
import AddMovieModal from "./AddMovieModal";
import { FaSearch } from "react-icons/fa";

interface Props {
    movies: any[];
    onSelectMovie: (movieId: string) => void;
}

const MovieGrid: React.FC<Props> = ({ movies, onSelectMovie }) => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [search, setSearch] = useState("");

    const handleAddMovie = (newMovie: any) => {
        console.log("Phim mới:", newMovie);
        // TODO: cập nhật danh sách phim nếu cần
    };

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container mx-auto p-8">
            {/*   Thanh tìm kiếm + Thêm phim */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h1 className="text-3xl font-bold">Quản lý phim</h1>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    {/* Tìm kiếm */}
                    <div className="relative w-full max-w-md flex-1">
                        <input
                            type="text"
                            className="w-full bg-transparent placeholder:text-slate-400 text-black text-sm border border-slate-400 rounded-full pl-4 pr-12 py-2 transition duration-300 focus:outline-none focus:border-indigo-400 hover:border-indigo-300 shadow-sm focus:shadow-lg"
                            placeholder="Tìm phim bạn chỉnh sửa..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-indigo-600 hover:bg-indigo-700 transition px-3 py-1 rounded-full text-sm shadow"
                            onClick={() => console.log("Tìm kiếm:", search)}
                        >
                            <FaSearch />
                        </button>
                    </div>

                    {/* Nút thêm phim */}
                    <button
                        className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 font-semibold whitespace-nowrap"
                        onClick={() => setShowAddModal(true)}
                    >
                        + Thêm phim
                    </button>
                </div>
            </div>

            {/* Danh sách phim */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                {filteredMovies.map((movie) => (
                    <MovieBox
                        key={movie.id}
                        movie={movie}
                        onClick={() => onSelectMovie(movie.id)}
                    />
                ))}
            </div>

            {showAddModal && (
                <AddMovieModal
                    onClose={() => setShowAddModal(false)}
                    onAdd={handleAddMovie}
                />
            )}
        </div>
    );
};

export default MovieGrid;
