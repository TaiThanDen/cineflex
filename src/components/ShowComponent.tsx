import { getGenresByShow } from "@/lib/api";
import type { Show } from "@/lib/types/Show";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";


interface props {
    show: Show
}

const ShowComponent = ({ show }: props) => {

    const genres = useQuery({
        queryKey: ['genres_of_show', show.id],
        queryFn: () => getGenresByShow(show.id)
    });

    return (
        <Link to={`/preview/${show.id}`}>
            <div
                className="h-70 md:w-full w-70 bg-[#2f3147] rounded-xl overflow-hidden cursor-pointer border-2 transition-transform duration-300 group border-transparent hover:scale-110 hover:shadow-2xl"
            >
                <div className="w-full h-[200px]">
                    <img
                        src={show.thumbnail}
                        alt={show.title}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                <div className="p-2">
                    <div className="flex gap-2 flex-wrap text-xs mb-1">
                        <span className="bg-[#3a3d5c] text-white px-2 py-0.5 rounded">
                            {show.ageRating}
                        </span>
                    </div>
                    <h3 className="text-white font-semibold text-sm truncate">
                        {show.title}
                    </h3>
                    <p className="text-gray-400 text-xs truncate">
                        {(genres.isLoading || genres.isError) ? 'Đang tải thể loại' : genres.data!.map((genre) => genre.name).join(', ')}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default ShowComponent;