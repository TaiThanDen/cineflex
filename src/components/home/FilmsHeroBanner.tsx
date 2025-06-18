import { useState } from "react";
import HeroBanner from "../HeroBanner";
import { unifiedData } from "../data/mockdata";
import PopularSection from "./PopularFilmSection";
import type { Show } from "@/lib/types/Show";

const FilmsHeroBanner = () => {
  const filmData = unifiedData;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = filmData[selectedIndex];

  const handleSelect = (_: Show, index: number) => {
    setSelectedIndex(index);
  };

  return (
    <HeroBanner item={selected}>
      <PopularSection
        items={filmData}
        selectedTitle={selected.title}
        onSelect={handleSelect}
      />
    </HeroBanner>
  );
};

export default FilmsHeroBanner;
