import { useQuery } from "@tanstack/react-query";
import { queryShow } from "@/lib/api";
import Banner from "./Banner";

const FilmsBanner = () => {
    const result = useQuery({
        queryKey: ['shows', 10],
        queryFn: () => queryShow({
            genres: ['Phim US-UK']
        }, 0, 10),
    });

    if (result.isLoading) return <>Đang tải...</>
    if (result.isError) {
        console.log(result.error);
        return <>Lỗi</>
    }

    return <Banner shows={result.data?.data ?? []} />
}

export default FilmsBanner;