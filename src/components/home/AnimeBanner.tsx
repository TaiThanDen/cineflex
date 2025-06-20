import { useQuery } from "@tanstack/react-query";
import { getShowsByGenres } from "@/lib/api";
import Banner from "./Banner";

const AnimeBanner = () => {
    const result = useQuery({
        queryKey: ['shows_of_genres', 'Anime'],
        queryFn: () => getShowsByGenres('Anime'),
    });

    if (result.isLoading) return <>Loading</>
    if (result.isError) return <>Error</>

    return <Banner shows={result.data!} />
}

export default AnimeBanner;