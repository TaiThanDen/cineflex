import { useState } from "react";
import HeroBanner from "../HeroBanner";
import { unifiedData } from "../data/mockdata";
import PopularSection from "./PopularSection";
import type { MovieItem } from "../data/Movie";

const FilmsHeroBanner = () => {
  const filmData = unifiedData.filter((item) => item.type === "film");

  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = filmData[selectedIndex];

  const handleSelect = (item: MovieItem, index: number) => {
    setSelectedIndex(index);
  };

  return (
    <HeroBanner items={[selected]}>
      <PopularSection
        items={filmData}
        selectedTitle={selected.title}
        onSelect={handleSelect}
      />
    </HeroBanner>
  );
};

export default FilmsHeroBanner;
