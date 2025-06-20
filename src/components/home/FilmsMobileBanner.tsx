import { useQuery } from "@tanstack/react-query";
import MobileHeroBanner from "../MobileHeroBanner";
import { getShowsByGenres } from "@/lib/api";


const FilmsMobileBanner = () => {
  const result = useQuery({
    queryKey: ['shows_of_genres', 'Anime'],
    queryFn: () => getShowsByGenres('Phim Hàn Quốc'),
  });

  if (result.isLoading) return <>Loading</>
  if (result.isError) return <>Error</>

  
  return <MobileHeroBanner data={result.data!} title="Popular Movie " />;
};

export default FilmsMobileBanner;
