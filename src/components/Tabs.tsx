import React, { useState } from "react";
import type { ReactNode } from "react";

type Tab = {
  label: string;
  key: string;
  content: ReactNode;
};

interface TabsProps {
  tabs: Tab[];
  initialKey?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, initialKey }) => {
  const [activeTab, setActiveTab] = useState(initialKey || tabs[0].key);

  return (
    <div>
      <div
        className="flex gap-4 border-b border-gray-700 pl-1 overflow-x-auto scrollbar-hide scrollbar-thumb-[#7008e7] scrollbar-track-transparent"
        style={{ whiteSpace: "nowrap" }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`py-2 px-4 font-semibold whitespace-nowrap ${
              activeTab === tab.key
                ? "border-b-2 border-[#7008e7] text-[#7008e7]"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-6 pl-3">
        {tabs.find((tab) => tab.key === activeTab)?.content}
      </div>
    </div>
  );
};

export default Tabs;
