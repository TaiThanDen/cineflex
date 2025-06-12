import React from "react";

export interface OverviewItem {
  title: string;
  value: React.ReactNode;
  className?: string;
  details?: { label: string; value: React.ReactNode; className?: string }[];
  button?: {
    className?: string;
    title?: string;
    label: React.ReactNode;
    icon?: React.ReactNode;
    onClick?: () => void;
  };
}

interface OverviewProps {
  stats: OverviewItem[];
}

const Overview: React.FC<OverviewProps> = ({ stats }) => (
  <section className="flex flex-col lg:flex-row flex-wrap gap-4 mb-8">
    {stats.map((item, idx) => (
      <div
        className={`bg-white rounded-2xl shadow p-5 flex flex-col  gap-1 w-full max-w-sm mx-auto lg:max-w-none lg:flex-1 ${
          item.className || ""
        }`}
        key={item.title + idx}
      >
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <div className="text-3xl font-bold">{item.value}</div>
        {item.details && (
          <div className="flex gap-2 flex-row mt-2 items-center flex-wrap">
            {item.details.map((d, i) => (
              <span
                key={i}
                className={
                  d.className === "free"
                    ? "bg-red-100 text-red-600 font-semibold px-3 py-1.5 rounded-xl text-sm min-w-[90px] text-center"
                    : d.className === "premium"
                    ? "bg-yellow-200 text-yellow-800 font-semibold px-3 py-1.5 rounded-xl text-sm min-w-[90px] text-center"
                    : "bg-blue-100 text-gray-700 font-medium px-3 py-1.5 rounded-xl text-sm min-w-[90px] text-center"
                }
              >
                {d.label}: {d.value}
              </span>
            ))}
          </div>
        )}
        {item.button && (
          <button
            className={`mt-2 px-5 py-2 rounded-lg font-semibold flex items-center gap-2 ${
              item.button.className ||
              "bg-black text-white hover:bg-gray-800 transition"
            }`}
            title={item.button.title}
            onClick={item.button.onClick}
          >
            {item.button.label}
            {item.button.icon}
          </button>
        )}
      </div>
    ))}
  </section>
);

export default Overview;
