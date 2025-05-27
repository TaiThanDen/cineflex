const recommended = [
  {
    title: "Witch Watch",
    genre: "Phù thủy & Học đường",
    image:
      "https://static.nutscdn.com/vimg/0-0/6ac4c22c54d138af06162a3d080612a2.jpg",
  },
  {
    title: "Sakamoto Days",
    genre: "Hành động & Hài hước",
    image:
      "https://static.nutscdn.com/vimg/0-0/ce411bcecf54c431839a776d1762bc83.jpg",
  },
  {
    title: "Teogonia",
    genre: "Fantasy & Phiêu lưu",
    image:
      "https://static.nutscdn.com/vimg/0-0/7aac45ead7eba60727e620d50e45ff5b.jpg",
  },
  {
    title:
      "The 100 Girlfriends Who Really Really Really Really Really Love You",
    genre: "Romance & Hài hước",
    image:
      "https://static.nutscdn.com/vimg/0-0/bd747c4c97cb3ae132fe154cfd70a62c.jpg",
  },
  {
    title: "Why Does Nobody Remember Me in This World?",
    genre: "Fantasy & Bí ẩn",
    image:
      "https://static.nutscdn.com/vimg/0-0/8edd6d53b882d4ecb09d642830ba3d1f.jpg",
  },
];

const RecommendedList = () => {
  return (
    <div className="w-full mb-4 pl-2 bg-[#23263a]">
      <h2 className="text-xl font-bold mb-4">Đề xuất cho bạn</h2>
      <div className="space-y-4">
        {recommended.map((item) => (
          <div key={item.title} className="flex gap-3">
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-28 object-cover rounded-md"
            />
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.genre}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedList;
