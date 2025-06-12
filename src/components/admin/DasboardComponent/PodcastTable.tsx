import React from "react";

export interface Podcast {
  name: string;
  author: string;
  type: "Free" | "Premium";
  listens: number;
}

interface PodcastTableProps {
  podcasts: Podcast[];
}

const PodcastTable: React.FC<PodcastTableProps> = ({ podcasts }) => (
  <section className="bg-white rounded-2xl shadow-lg p-8 mt-8">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold text-gray-700">
        Most Popular Podcast
      </h3>
      <a href="#" className="text-indigo-600 font-semibold hover:underline">
        View All
      </a>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 text-left font-semibold text-gray-500">
              Podcast
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-500">
              Author
            </th>
            <th className="py-3 px-4 text-center font-semibold text-gray-500">
              Type
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-500">
              Listens
            </th>
          </tr>
        </thead>
        <tbody>
          {podcasts.map((pod, idx) => (
            <tr key={idx} className={idx % 2 === 1 ? "bg-gray-50" : ""}>
              <td className="py-3 px-4">{pod.name}</td>
              <td className="py-3 px-4">{pod.author}</td>
              <td className="py-3 px-4 text-center">
                <span
                  className={`inline-block px-5 py-1 rounded-md font-semibold ${
                    pod.type === "Free"
                      ? "bg-green-100 text-green-900"
                      : "bg-yellow-200 text-yellow-900"
                  }`}
                  style={{ minWidth: 90 }}
                >
                  {pod.type}
                </span>
              </td>
              <td className="py-3 px-4">{pod.listens.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export default PodcastTable;
