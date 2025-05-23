import HeroBanner from "../HeroBanner";

const filmsData = [
  {
    title: "Teogonia",
    image:
      "https://static.nutscdn.com/vimg/0-0/7aac45ead7eba60727e620d50e45ff5b.jpg",
    content:
      "Trong một thế giới loạn lạc bởi chiến tranh giữa loài người và các bộ tộc á nhân, Kai – một cậu bé bình thường ở làng Rag – ngày ngày chiến đấu để bảo vệ quê hương. Giữa những trận chiến khốc liệt, cậu bất ngờ nhớ lại ký ức về một thế giới hiện đại mà mình chưa từng sống. Từ đó, Kai bị cuốn vào những biến cố lớn, bắt đầu hành trình trưởng thành giữa một thế giới đầy thử thách và hiểm nguy.",
    year: "20255",
    seasons: "1",
    rating: "PG-13",
  },
  {
    title: "Witch Watch",
    image:
      "https://static.nutscdn.com/vimg/0-0/6ac4c22c54d138af06162a3d080612a2.jpg",
    content:
      "Morihito, một thanh niên giấu sức mạnh orge vượt trội để khép mình sống một cuộc sống bình thường, rồi cô bạn thơ ấu là một phù thủy bỗng tự nhiên xuất hiện và ép cậu trở thành linh thú khế ước, nếu không thì sẽ biến cậu thành một con hổ lai bò.",
    year: "2025",
    seasons: "1",
    rating: "PG",
  },
  {
    title: "GUILTY GEAR STRIVE: DUAL RULERS",
    image:
      "https://static.nutscdn.com/vimg/0-0/56e42ecd12a0f7d54994b2fd7c9b853a.jpg",
    content:
      "Sau khi các lĩnh vực khoa học và công nghệ từng rất hùng mạnh sụp đổ, một nguồn năng lượng mới gọi là ma thuật trở thành nền tảng cho thời đại hiện đại. Nhân loại đã tạo ra các vũ khí sinh học bị cấm gọi là Gear. Những Gear này cuối cùng nổi dậy chống lại loài người trong một cuộc nổi loạn. Dù nhân loại đã chiến thắng trong cuộc chiến sống còn được gọi là Thập tự chinh (Crusades), nhưng tổn thất của họ lớn đến mức nhiều thập kỷ sau đó, những vết thương lòng vẫn chưa thể hoàn toàn lành lại. Sin Kiske, đứa trẻ sinh ra từ một con người và một Gear, đang trên đường tới dự lễ cưới của cha mình là Ky và mẹ là Dizzy. Hôn lễ này đã phá vỡ điều cấm kỵ lớn nhất: sự kết hợp giữa con người và Gear. Dù thế giới đang trong hòa bình, nhưng phải mất rất nhiều năm mới có thể tổ chức được lễ cưới này. Mặc dù có những cảm xúc phức tạp vây quanh, buổi lễ vẫn diễn ra với nhiều lời chúc phúc. Đột nhiên, một cô gái bí ẩn xuất hiện... Một đứa trẻ mang trong mình dòng máu Gear định mệnh, và cô gái bí ẩn có lòng căm ghét sâu sắc đối với Gear. Cuộc gặp gỡ của họ sẽ làm rung chuyển cả thế giới.",
    year: "2025",
    seasons: "3",
    rating: "PG-18",
  },
  {
    title:
      "The 100 Girlfriends Who Really Really Really Really Really Love You",
    image:
      "https://static.nutscdn.com/vimg/0-0/bd747c4c97cb3ae132fe154cfd70a62c.jpg",
    content:
      "Kazuya Shiota là một chàng trai bình thường, nhưng lại có một sức hút đặc biệt với các cô gái. Tuy nhiên, anh lại không thể tìm được tình yêu đích thực của mình. Một ngày nọ, anh gặp",
    year: "2010",
    seasons: "1",
    rating: "PG-13",
  },
  {
    title: "SAKAMOTO DAYS",
    image:
      "https://static.nutscdn.com/vimg/0-0/ce411bcecf54c431839a776d1762bc83.jpg",
    content:
      "Từng là sát thủ vĩ đại nhất, Sakamoto Taro giờ rửa tay gác kiếm vì tình yêu. Nhưng khi quá khứ tìm đến, anh phải chiến đấu để bảo vệ gia đình thân yêu của mình.",
    year: "2014",
    seasons: "1",
    rating: "PG-13",
  },
  {
    title: "Why Does Nobody Remember Me in This World?",
    image:
      "https://static.nutscdn.com/vimg/0-0/8edd6d53b882d4ecb09d642830ba3d1f.jpg",
    content:
      "Sid - anh hùng đã dẫn dắt nhân loại chiến thắng trong cuộc chiến tranh giành quyền bá chủ Trái Đất, bỗng nhiên thấy mình bị xóa sổ khỏi lịch sử. Thế giới thay đổi, con người thất bại trước rồng và ác quỷ, và Sid trở thành kẻ vô danh. Kai là một cậu bé bí ẩn miễn nhiễm với sự thay đổi này, cũng là người duy nhất nhớ về Sid. Cùng Rinne, một cô gái bí ẩn, Kai quyết tâm khôi phục ký ức cho thế giới và đưa Sid trở lại vị trí anh hùng.",
    year: "2024",
    seasons: "1",
    rating: "PG-13",
  },
];

const AnimeHeroBanner = () => {
  return <HeroBanner items={filmsData} />;
};

export default AnimeHeroBanner;
