import { getEpisodeById, getSeasonById, getShowById } from "@/lib/api"
import type { ViewHistory } from "@/lib/types/ViewHistory"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router"

interface Props {
    viewHistory: ViewHistory
}

interface EpisodePreview {
    id: string,
    duration: number
}

const EpisodePreview = ({ id, duration } : EpisodePreview) => {
    const currentEpisodeResult = useQuery({
        queryFn: () => getEpisodeById(id),
        queryKey: ["episode", id],
        enabled: !!id
    });

    const currentSeasonResult = useQuery({
        queryKey: ["season", currentEpisodeResult.data?.season],
        enabled: !!currentEpisodeResult.data?.season,
        queryFn: () => getSeasonById(currentEpisodeResult.data!.season)
    })

    const currentShowResult = useQuery({
        queryKey: ["show", currentSeasonResult.data?.show],
        enabled: !!currentSeasonResult.data?.show,
        queryFn: () => getShowById(currentSeasonResult.data!.show)
    })

    return <>
        <div className="h-56 overflow-hidden">
            <img
                src={`https://image.mux.com/${currentEpisodeResult.data?.url}/thumbnail.png?width=214&height=121&time=${duration}`}
                alt=""
                className="w-full h-full object-cover"
            />
        </div>
        <div className="p-4">
            <h3 className="text-xl font-semibold line-clamp-1">{currentEpisodeResult.data?.title ?? "Loading..."} - {currentSeasonResult.data?.title ?? "Loading..."}</h3>
            <p className="text-sm text-gray-400 mb-3 line-clamp-3">{currentShowResult.data?.title ?? "Loading..."}</p>
        </div>
    </>
}

const ContinueCard = ({ viewHistory } : Props) => {



    return (
        <>
            <div
                className="bg-[#2f3147] rounded-xl overflow-hidden relative"
            >
                <EpisodePreview id={viewHistory.episode} duration={viewHistory.duration} />

                <div className="px-4 py-1">
                    <div className="flex justify-start text-xs text-gray-300 mb-1 gap-1">
                        <span>Đang xem:</span>
                        <span>{Math.trunc(viewHistory.duration / 60)} phút</span>
                    </div>
                    {/* <div className="w-full h-2 bg-gray-700 rounded">
                        <div
                            className="h-full bg-purple-500 rounded transition-all duration-300"
                            style={{ width: `${item.progress}%` }}
                        ></div>
                    </div> */}
                </div>

                <div className="p-4">
                    <Link to={`/watch/${viewHistory.episode}`}>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm">
                            Resume
                        </button>
                    </Link>
                </div>
            </div>


        </>
    )
}

export default ContinueCard