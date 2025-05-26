import React from 'react';
import PopularAnimeSection from './components/home/PopularAnimeSection';
import PopularSection from './components/home/PopularSection';
import ReusablePopularSection from './components/home/ReusablePopularSection';
import { AnimeItem } from './components/data/AnimeItem';
import { MovieItem } from './components/data/Movie';

const App = () => {
  const animeItems: AnimeItem[] = [
    { title: 'Anime 1', image: 'anime1.jpg' },
    { title: 'Anime 2', image: 'anime2.jpg' },
    // Add more anime items as needed
  ];

  const movieItems: MovieItem[] = [
    { title: 'Movie 1', image: 'movie1.jpg' },
    { title: 'Movie 2', image: 'movie2.jpg' },
    // Add more movie items as needed
  ];

  const handleAnimeSelect = (item: AnimeItem, index: number) => {
    console.log('Selected Anime:', item, 'at index:', index);
  };

  const handleMovieSelect = (item: MovieItem, index: number) => {
    console.log('Selected Movie:', item, 'at index:', index);
  };

  return (
    <div className="App">
      <PopularAnimeSection
        items={animeItems}
        selectedTitle={animeItems[0].title}
        onSelect={handleAnimeSelect}
      />
      <PopularSection
        items={movieItems}
        selectedTitle={movieItems[0].title}
        onSelect={handleMovieSelect}
      />
      <ReusablePopularSection
        items={[...animeItems, ...movieItems]}
        selectedTitle={animeItems[0].title}
        onSelect={(item, index) => {
          if (animeItems.includes(item)) {
            handleAnimeSelect(item, index);
          } else {
            handleMovieSelect(item, index);
          }
        }}
      />
    </div>
  );
};

export default App;