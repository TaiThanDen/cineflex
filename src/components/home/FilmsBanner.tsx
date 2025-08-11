import { useQuery } from "@tanstack/react-query";
import { getAllShows } from "@/lib/api";
import Banner from "./Banner";

const FilmsBanner = () => {
    const result = useQuery({
        queryKey: ['shows'],
        queryFn: () => getAllShows(0, 100),
    });

    if (result.isLoading) return <>Loading</>
    if (result.isError) {
        console.log(result.error);
        return <>Error</>
    }

    return <Banner shows={result.data?.data ?? []} />
}

export default FilmsBanner;