import { useState } from "react";
import HeroBanner from "../HeroBanner";
import PopularSection from "./PopularFilmSection";
import type { Show } from "@/lib/types/Show";

interface props {
    shows: Show[]
}

const PopularHeroBanner = ({ shows }: props) => {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const selected = shows[selectedIndex];

    const handleSelect = (_: Show, index: number) => {
        setSelectedIndex(index);
    };

    return (
        <>
            {selected &&
                <HeroBanner item={selected}>
                    <PopularSection
                        items={shows}
                        selectedTitle={selected.title}
                        onSelect={handleSelect}
                    />

                </HeroBanner>
            }
        </>
    );
}

export default PopularHeroBanner;