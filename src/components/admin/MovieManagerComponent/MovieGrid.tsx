import React from "react";
import MovieBox from "./MovieBox";

interface Props {
  movies: any[];
  onSelectMovie: (movieId: string) => void;
}

const MovieGrid: React.FC<Props> = ({ movies, onSelectMovie }) => (
  <div className="container mx-auto p-8">
    <h1 className="text-3xl font-bold mb-6">Quản lý phim</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
      {movies.map((movie) => (
        <MovieBox
          key={movie.id}
          movie={movie}
          onClick={() => onSelectMovie(movie.id)}
        />
      ))}
    </div>
  </div>
);

export default MovieGrid;
