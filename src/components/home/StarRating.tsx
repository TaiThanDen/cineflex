import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import {
  getShowAverageRate,
  getUserShowRate,
  rateShow,
} from "@/lib/api";

interface StarRatingProps {
  showId: string;
}

const StarRating: React.FC<StarRatingProps> = ({ showId }) => {
  const [avgRate, setAvgRate] = useState<number>(0);
  const [userRate, setUserRate] = useState<number | null>(null);
  const [hoverRate, setHoverRate] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [avg, user] = await Promise.all([
          getShowAverageRate(showId),
          getUserShowRate(showId),
        ]);
        setAvgRate(avg);
        setUserRate(user);
      } catch (e) {
        console.error("Error fetching ratings", e);
      }
    };
    fetchData();
  }, [showId]);

  const handleRate = async (value: number) => {
    try {
      await rateShow(showId, value);
      setUserRate(value);
      const newAvg = await getShowAverageRate(showId);
      setAvgRate(newAvg);
    } catch (e) {
      console.error("Error rating show", e);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled =
            (hoverRate ?? userRate ?? 0) >= star;
          return (
            <Star
              key={star}
              className={`w-7 h-7 cursor-pointer transition-colors ${
                isFilled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
              onMouseEnter={() => setHoverRate(star)}
              onMouseLeave={() => setHoverRate(null)}
              onClick={() => handleRate(star)}
            />
          );
        })}
      </div>
      <p className="text-sm text-gray-500">
        Avg: {avgRate.toFixed(1)} / 5
      </p>
    </div>
  );
};

export default StarRating;
