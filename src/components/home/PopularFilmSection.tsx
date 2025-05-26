import PopularSectionReusable from "../PopularSectionReusable";
import type { MovieItem } from "../data/Movie";

interface PopularFilmSectionProps {
  items: MovieItem[];
  selectedTitle: string;
  onSelect: (item: MovieItem, index: number) => void;
}

const PopularFilmSection = ({
  items,
  selectedTitle,
  onSelect,
}: PopularFilmSectionProps) => {
  // Lọc ra chỉ những phim có type là "film"
  const filmItems = items.filter((item) => item.type === "film");

  return (
    <PopularSectionReusable<MovieItem>
      items={filmItems}
      selectedTitle={selectedTitle}
      onSelect={onSelect}
      getImage={(item) => item.image}
      getTitle={(item) => item.title}
      sectionTitle="Popular on CineFlex"
    />
  );
};

export default PopularFilmSection;
