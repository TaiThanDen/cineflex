import { useState, useEffect } from "react";
import type { BlogPost } from "./data/blogData";
import { useNavigate } from "react-router-dom";

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      const { blogPosts } = await import("./data/blogData"); // Adjust path if needed
      setBlogs(blogPosts);
    };
    fetchBlogs();
  }, []);

  const handleClick = (post: BlogPost) => {
    navigate(`/blog/${post.id}`, { state: post });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-center text-white mb-16">
          Cineflex Blogs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((post) => (
            <div
              key={post.id}
              onClick={() => handleClick(post)}
              className="cursor-pointer backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-52 object-cover rounded-t-3xl"
              />
              <div className="p-6 space-y-4">
                <div className="flex items-center text-sm text-gray-300 gap-3">
                  <span className="bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded-md font-medium">
                    {post.category}
                  </span>
                  <span className="text-gray-400">{post.date}</span>
                </div>
                <h3 className="text-2xl font-semibold text-white leading-tight">
                  {post.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm">
                  {post.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
