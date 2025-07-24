import BottomBannerAd from "@/components/AdsComponents/BottomBannerAd"
import PopupAd from "@/components/AdsComponents/PopupAd"
import subscription from "@/context/Subscription"
import { getAdsRandom } from "@/lib/api"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useContext, useEffect, useState, type ReactNode } from "react"
import { useLocation } from "react-router"

interface Props {
    children: ReactNode
}

const AdvertisementWrapper = ({ children }: Props) => {
    const isVip = useContext(subscription);
    const [popupAdsOpen, setPopupAdsOpen] = useState(true);
    const [bottomBannerAdsOpen, setBottomBannerAdsOpen] = useState(true);

    const queryClient = useQueryClient();
    const location = useLocation();

    const resetAds = () => {
        setPopupAdsOpen(Math.random() < 0.5);
        setBottomBannerAdsOpen(true);
        queryClient.invalidateQueries({
            queryKey: ["user-ads"],
        });
    }

    useEffect(() => {
        resetAds()
    }, [location]);

    const popupAdsResult = useQuery({
        queryKey: ["user-ads", "popup"],
        queryFn: () => getAdsRandom(1),
        gcTime: 0
    })

    const bottomBannerAdsResult = useQuery({
        queryKey: ["user-ads", "bottom-banner"],
        queryFn: () => getAdsRandom(0),
        gcTime: 0
    })


    return (
        <>
            {!(isVip) && (
                <>
                    {
                        ((!popupAdsResult.isLoading || popupAdsResult.isError)) && (
                            <PopupAd
                                open={popupAdsOpen}
                                onClose={() => {
                                    setPopupAdsOpen(false)
                                }}
                                image={popupAdsResult.data!.image}
                                link={popupAdsResult.data!.link}
                            />
                        )
                    }
                    {
                        ((!bottomBannerAdsResult.isLoading || bottomBannerAdsResult.isError)) && (
                            <BottomBannerAd
                                image={bottomBannerAdsResult.data!.image}
                                link={bottomBannerAdsResult.data!.link}
                                open={bottomBannerAdsOpen}
                                onClose={() => {
                                    setBottomBannerAdsOpen(false)
                                }}
                            />
                        )
                    }
                </>
            )}

            {children}
        </>
    )
}

export default AdvertisementWrapper