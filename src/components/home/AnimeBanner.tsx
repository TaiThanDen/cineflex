import { useQuery } from "@tanstack/react-query";
import { queryShow } from "@/lib/api";
import Banner from "./Banner";

const AnimeBanner = () => {
    const result = useQuery({
        queryKey: ['shows_of_genres', 'Anime'],
        queryFn: () => queryShow({
            genres: ['Anime']
        }, 0, 10),
    });

    if (result.isLoading) return <>Loading</>
    if (result.isError) return <>Error</>

    return <Banner shows={result.data?.data ?? []} />
}

export default AnimeBanner;