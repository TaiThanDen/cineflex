import React from "react";
import { Link } from "react-router-dom";
import continueWatchingList from "../components/data/continueWatching.json"; // adjust path if needed

const ContinueWatching: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#23263a] text-white py-10 px-6 pt-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Continue Watching</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {continueWatchingList.map((item) => (
            <div
              key={item.id}
              className="bg-[#2f3147] rounded-xl overflow-hidden relative"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="px-4 py-1">
                <div className="flex justify-between text-xs text-gray-300 mb-1">
                  <span>Progress</span>
                  <span>{item.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded">
                  <div
                    className="h-full bg-purple-500 rounded transition-all duration-300"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-400 mb-3">{item.episode}</p>
                <Link to={`/preview/${item.id}`}>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm">
                    Resume
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContinueWatching;
