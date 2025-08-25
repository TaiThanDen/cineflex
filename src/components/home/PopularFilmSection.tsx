import type { Show } from "@/lib/types/Show";
import PopularSectionReusable from "../PopularSectionReusable";

interface PopularFilmSectionProps {
  items: Show[];
  selectedTitle: string;
  onSelect: (item: Show, index: number) => void;
}

const PopularFilmSection = ({
  items,
  selectedTitle,
  onSelect,
}: PopularFilmSectionProps) => {

  return (
    <PopularSectionReusable<Show>
      items={items}
      selectedTitle={selectedTitle}
      onSelect={onSelect}
      getImage={(item) => item.thumbnail}
      getTitle={(item) => item.title}
      sectionTitle="Phổ biến trên CineFlex"
    />
  );
};

export default PopularFilmSection;
