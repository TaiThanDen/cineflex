// src/data/blogData.ts
export interface BlogPost {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  date: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Cineflex Launches Premium Streaming Experience",
    description: "Explore our brand new Cineflex platform with premium movies, smooth streaming and an enhanced UI.",
    content: `
      ## Why Upgrade?

      Cineflex now offers a cutting-edge user experience with blazing-fast streaming speeds, cinema-grade quality, and curated movie lists. No ads, just pure entertainment.

      ### Key Features:
      - Full HD & 4K support
      - Weekly blockbuster releases
      - Smart recommendations based on your history
      - Secure payment with VNPay, PayPal, and more

      > “Cineflex is the future of digital movie experience.” – A Satisfied Viewer

      Get started by choosing a subscription plan tailored to your needs and dive into the world of unlimited movies.
    `,
    image: "https://vudigital.co/wp-content/uploads/2024/02/premium-la-gi-phan-biet-voi-khai-niem-luxury.webp",
    category: "Announcements",
    date: "July 23, 2025"
  },
  {
    id: 2,
    title: "Dune: Part Two – A Sci-Fi Masterpiece or Miss?",
    description: "A deep dive into the cinematic brilliance and cultural impact of Denis Villeneuve’s Dune sequel.",
    content: `
      ## A Cinematic Marvel

      Denis Villeneuve returns with Dune: Part Two, continuing Paul Atreides' epic journey on Arrakis. The sequel amplifies everything fans loved from the first installment—breathtaking visuals, intense performances, and a haunting score by Hans Zimmer.

      ### Story and Themes
      The film dives deeper into the political and religious complexities of the Fremen and their desert planet. Paul’s transformation from reluctant heir to prophetic figure unfolds with both gravitas and humanity.

      - Zendaya shines with more screen time as Chani
      - The Harkonnen threat escalates with raw brutality
      - Cultural commentary on messianic myths, ecology, and power remain potent

      > "A triumph in world-building and emotional storytelling." — Cineflex Review

      ### Technical Brilliance
      - Shot in IMAX for full visual immersion
      - Practical effects blend flawlessly with CGI
      - Hans Zimmer’s music creates a soundscape that resonates in your bones

      ### Final Thoughts
      Whether you're a hardcore Dune fan or new to the saga, this film delivers a stunning blend of art and action. It's more than a movie—it's a meditation on destiny, sacrifice, and legacy.

      _Dune: Part Two_ cements itself as one of the best sci-fi films of the decade.
    `,
    image: "https://www.elleman.vn/app/uploads/2024/03/07/231277/Timothee-Chalamet-Paul-Atreides-Zendaya-Chani-Dune-Part-2.webp",
    category: "Reviews",
    date: "July 18, 2025"
  },
  {
    id: 3,
    title: "Behind The Scenes: How We Built Cineflex",
    description: "Discover the tech stack, design ideas, and team behind Cineflex's creation.",
    content: "",
    image: "https://spaces-wp.imgix.net/2016/06/coding-in-the-classroom.png?auto=compress,format&q=50",
    category: "Technology",
    date: "July 15, 2025"
  }
];
