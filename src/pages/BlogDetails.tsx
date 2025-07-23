import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const BlogDetail = () => {
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const el = contentRef.current;
      const scrollTop = window.scrollY;
      const offsetTop = el.offsetTop;
      const scrollHeight = el.scrollHeight;
      const windowHeight = window.innerHeight;
      const total = scrollHeight + offsetTop - windowHeight;
      const percent = Math.min(Math.max((scrollTop - offsetTop) / total, 0), 1);
      setScrollProgress(percent);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // TODO: Replace with dynamic fetch by ID using axios later
  // const post = await axios.get(`/api/blogs/${id}`);
  const post = {
    title: "Dune: Part Two – A Cinematic Masterpiece",
    description:
      "Denis Villeneuve returns with a sweeping, epic continuation of Frank Herbert’s sci-fi saga. Dune: Part Two deepens the mythology, raises the stakes, and offers one of the most visually stunning films in years.",
    date: "July 23, 2025",
    category: "Movie Review",
    image: "src/assets/img/dune2.jpg",
    content: [
      {
        heading: "Introduction",
        body: `Dune: Part Two picks up directly where its predecessor left off, plunging viewers deeper into the desert planet of Arrakis. Paul Atreides (Timothée Chalamet) embraces his destiny with the Fremen, preparing for the inevitable war against the oppressive Harkonnen regime.`
      },
      {
        heading: "Cinematography & Sound",
        body: `Greig Fraser’s cinematography shines again, making each frame a breathtaking portrait. The sweeping sandscapes, intense close-ups, and dynamic action sequences create a visual language few directors can match. Hans Zimmer’s haunting score, once again, becomes a character in itself — pulsing, atmospheric, and epic.`,
      },
      {
        heading: "Performance Highlights",
        list: [
          "Timothée Chalamet delivers a mature and intense performance, balancing prophecy and humanity.",
          "Zendaya, given more screen time, brings depth to Chani, portraying conflict and loyalty with subtlety.",
          "Austin Butler as Feyd-Rautha is terrifyingly magnetic — every scene he’s in feels explosive.",
        ]
      },
      {
        heading: "Themes & Direction",
        body: `Villeneuve’s adaptation is faithful yet bold. Themes of colonialism, religion, power, and fate remain central, but are handled with even more nuance this time. Paul’s rise feels earned and tragic, with the film avoiding glorification in favor of introspection.`
      },
      {
        quote: "Dune: Part Two cements Villeneuve’s adaptation as the definitive cinematic version of Herbert’s vision.",
      },
      {
        heading: "Final Thoughts",
        body: `With impeccable craft, stirring performances, and world-class production, Dune: Part Two is not just a sequel — it’s a triumph. It proves blockbuster films can still be thoughtful, artful, and spectacular all at once.`
      },
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d0c1f] via-[#17162a] to-[#141326] px-4 py-12 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        <motion.div
          ref={contentRef}
          className="lg:col-span-9 backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 object-cover rounded-2xl mb-6"
          />

          <div className="flex justify-between items-center text-sm text-gray-400 mb-3">
            <span className="bg-purple-900/60 text-purple-300 px-3 py-0.5 rounded-md">
              {post.category}
            </span>
            <span>{post.date}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            {post.title}
          </h1>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
            {post.description}
          </p>

          <div className="text-gray-200 prose prose-invert max-w-screen">
            {post.content.map((section, i) => (
              <div key={i} id={section.heading?.replace(/\s+/g, "-")}>
                {section.heading && <h2>{section.heading}</h2>}
                {section.body && <p>{section.body}</p>}
                {section.list && (
                  <ul>
                    {section.list.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.quote && (
                  <blockquote>“{section.quote}”</blockquote>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => navigate("/blog")}
              className="text-gray-400 hover:text-white text-sm transition"
            >
              ← Back to Blog List
            </button>
          </div>
        </motion.div>

        {/* Sidebar Progress + TOC */}
        <motion.div
          className="hidden lg:block lg:col-span-3 sticky top-20 h-fit"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-white/10 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2 text-white">Reading Progress</h2>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-purple-400 h-2 transition-all duration-300 ease-in-out"
                  style={{ width: `${scrollProgress * 100}%` }}
                />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2 text-white">Table of Contents</h2>
              <ul className="text-sm text-purple-200 space-y-1">
                {post.content
                  .filter((s) => s.heading)
                  .map((section, idx) => (
                    <li key={idx}>
                      <a
                        href={`#${section.heading?.replace(/\s+/g, "-")}`}
                        className="hover:text-white transition"
                        onClick={(e) => {
                          e.preventDefault();
                          const target = document.getElementById(
                            section.heading?.replace(/\s+/g, "-") || ""
                          );
                          if (target) {
                            window.scrollTo({
                              top: target.offsetTop - 80,
                              behavior: "smooth",
                            });
                          }
                        }}
                      >
                        {section.heading}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetail;
