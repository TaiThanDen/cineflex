import type { Show } from "@/lib/types/Show";
import ShowComponent from "../ShowComponent";


interface MovieSectionProps {
  title: string;
  data?: Show[];
  selectedTitle?: string;
  onSelect?: (item: Show) => void;
  showViewAll?: boolean;
}

const MovieSection = ({
  title,
  data,
  showViewAll = false,
}: MovieSectionProps) => {

  return (
    <div className="w-full">
      {title && (
        <div className="flex justify-between items-center mb-4 px-2">
          <h2 className="text-white text-xl font-semibold">{title}</h2>
          {showViewAll && (
            <button className="text-sm text-red-500 hover:underline">
              View All
            </button>
          )}
        </div>
      )}

      {/* Container scrollable on mobile, grid on md+ */}
      <div className="overflow-x-auto md:overflow-visible px-2 scrollbar-hide">
        <div className="flex gap-3 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data !== undefined ? <>
            {data.map((item) => (
              <ShowComponent show={item} key={item.id} />
            ))}
          
          </> : <>
            Fetching
          
          </>}


        </div>
      </div>
    </div>
  );
};

export default MovieSection;
