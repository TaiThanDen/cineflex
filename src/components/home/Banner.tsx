import MobileHeroBanner from "../MobileHeroBanner";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import type { Show } from "@/lib/types/Show";
import PopularHeroBanner from "./PopularHeroBanner";

interface props {
    shows: Show[]
}

const Banner = ({ shows } : props) => {
    const isMobile = useIsMobile();

    return isMobile?<MobileHeroBanner data={shows} title="Popular Movie " />:<PopularHeroBanner shows={shows}/>
}

export default Banner;