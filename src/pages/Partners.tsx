import PartnerSlider from "../components/PartnerSlider";
import type { Partner } from "../components/PartnerSlider";
// Danh sách đầy đủ các đối tác như file test
const Partners: Partner[] = [
  {
    name: "Rophim",
    href: "https://rophim.com",
    img: "https://pbs.twimg.com/card_img/1924415558994501632/Z7A7RA6E?format=jpg&name=medium",
  },
  {
    name: "Netflix",
    href: "https://www.netflix.com",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  },
  {
    name: "FPT Play",
    href: "https://fptplay.vn",
    img: "https://theme.zdassets.com/theme_assets/2445237/5ac82464c873401ec472cb925db8c86b9f9df910.png",
  },
  {
    name: "TV360",
    href: "https://tv360.vn",
    img: "https://viettel-digital.com/wp-content/uploads/2024/03/TV360-logo.webp",
  },
  {
    name: "Apple TV",
    href: "https://tv.apple.com",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Apple_TV_Plus_Logo.svg/2560px-Apple_TV_Plus_Logo.svg.png",
  },
  {
    name: "Google TV",
    href: "https://tv.google.com",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Google_TV_logo.svg/2560px-Google_TV_logo.svg.png",
  },
];

const App = () => (
  <div className="bg-[#23263a] flex flex-col items-center">
    <PartnerSlider partners={Partners} />
  </div>
);

export default App;
