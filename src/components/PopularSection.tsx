const popularItems = [
  {
    title: "Yellow RatCat Reborn",
    image: "https://i.imgur.com/1.jpg",
  },
  {
    title: "Serbian Hitman 3",
    image: "https://i.imgur.com/2.jpg",
  },
  {
    title: "Bat Person Smash",
    image: "https://i.imgur.com/3.jpg",
  },
  {
    title: "Green Aliens",
    image: "https://i.imgur.com/4.jpg",
  },
  {
    title: "Sumo & Gorilla",
    image: "https://i.imgur.com/5.jpg",
  },
];

const PopularSection = () => {
  return (
    <div className="px-6 md:px-20 py-10 bg-[#0b0b0d]">
      <h2 className="text-white text-xl font-semibold mb-6">
        Popular on slothUI
      </h2>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {popularItems.map((item, index) => (
          <div
            key={index}
            className="min-w-[180px] rounded-md overflow-hidden shadow-md hover:scale-105 transition"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[100px] md:h-[120px] object-cover"
              />
              <div className="absolute top-1 left-1 bg-indigo-600 text-xs px-1.5 py-0.5 rounded text-white font-semibold">
                S
              </div>
            </div>
            <div className="bg-[#16181d] text-white text-sm p-2 font-medium line-clamp-2">
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularSection;
