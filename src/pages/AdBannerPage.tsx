import React from "react";

const ads = [
  {
    id: 1,
    image:
      "https://static.nutscdn.com/vimg/0-0/8290b8ce36c1fb7bc8d8707f81faebea.jpg",
    link: "https://example.com/1",
  },
  {
    id: 2,
    image:
      "https://static.nutscdn.com/vimg/0-0/8290b8ce36c1fb7bc8d8707f81faebea.jpg",
    link: "https://example.com/2",
  },
  {
    id: 3,
    image:
      "https://static.nutscdn.com/vimg/0-0/8290b8ce36c1fb7bc8d8707f81faebea.jpg",
    link: "https://example.com/3",
  },
  {
    id: 4,
    image:
      "https://static.nutscdn.com/vimg/0-0/8290b8ce36c1fb7bc8d8707f81faebea.jpg",
    link: "https://example.com/4",
  },
  {
    id: 5,
    image:
      "https://static.nutscdn.com/vimg/0-0/8290b8ce36c1fb7bc8d8707f81faebea.jpg",
    link: "https://example.com/5",
  },
  {
    id: 6,
    image:
      "https://static.nutscdn.com/vimg/0-0/8290b8ce36c1fb7bc8d8707f81faebea.jpg",
    link: "https://example.com/6",
  },
];

const AdBannerPage = () => {
  return (
    <div className="min-h-screen bg-[#23263a] text-white p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Quảng cáo tài trợ</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {ads.map((ad) => (
          <a
            key={ad.id}
            href={ad.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white rounded shadow hover:shadow-lg transition-shadow"
          >
            <img
              src={ad.image}
              alt={`Banner ${ad.id}`}
              className="w-full h-[160px] object-cover"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default AdBannerPage;
