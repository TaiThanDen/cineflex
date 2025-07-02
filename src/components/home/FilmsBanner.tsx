import { useQuery } from "@tanstack/react-query";
import { getShowsByGenres } from "@/lib/api";
import Banner from "./Banner";

const FilmsBanner = () => {
    const result = useQuery({
        queryKey: ['shows_of_genres', 'Phim Hàn Quốc'],
        queryFn: () => getShowsByGenres('Phim Hàn Quốc'),
    });

    if (result.isLoading) return <>Loading</>
    if (result.isError) {
        console.log(result.error);
        return <>Error</>
    }

    return <Banner shows={result.data!} />
}

export default FilmsBanner;