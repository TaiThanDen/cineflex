import subscription from "@/context/Subscription";
import { getAdsRandom } from "@/lib/api"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useContext } from "react";

interface Props {
    onClose: () => void
}

const PauseVideoAd = ({ onClose }: Props) => {
    const isVip = useContext(subscription);

    const queryClient = useQueryClient();

    const pauseAdsResult = useQuery({
        queryKey: ["user-ads", "pause-video"],
        queryFn: () => getAdsRandom(2),
        gcTime: 0
    })

    // Hàm đóng popup và tiếp tục phát video
    const handleCloseAd = () => {
        // Lưu thời gian chuyển hướng vào localStorage
        localStorage.setItem("lastAdRedirect", Date.now().toString());
        window.open(pauseAdsResult.data?.link ?? "https://example.com/", "_blank");
        onClose();
        queryClient.invalidateQueries({
            queryKey: ["user-ads"]
        })
        // Không cần play video vì đã chuyển hướng
    };


    return (
        <>
            {!isVip && (
                <div className="absolute inset-0 bg-black/70 z-50 flex flex-col items-center justify-center">
                    <div className="bg-white rounded-lg p-4 shadow-lg flex flex-col items-center">
                        <img
                            src={pauseAdsResult.data?.image ?? "https://static.nutscdn.com/vimg/0-0/784543799c537bda4c8f8b9c1757bfc3.jpg"}
                            alt="Quảng cáo"
                            className="max-w-xs w-full mb-4"
                        />
                        <button
                            onClick={handleCloseAd}
                            className="bg-[#23263a] text-white px-6 py-2 rounded mt-2 text-lg font-semibold hover:bg-[#3a3a4a] transition"
                        >
                            Đóng và Xem Tiếp
                        </button>
                    </div>

                </div>
            )}
        </>

    )
}

export default PauseVideoAd