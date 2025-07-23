
import type { BlogPost } from "./data/blogData";

interface Props {
  post: BlogPost;
}

const BlogCard: React.FC<Props> = ({ post }) => {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-neutral-900 hover:shadow-2xl transition-all duration-300">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-52 object-cover"
      />
      <div className="p-5 space-y-3">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-3">
          <span className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-md">
            {post.category}
          </span>
          <span>{post.date}</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {post.title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300">{post.description}</p>
      </div>
    </div>
  );
};

export default BlogCard;
