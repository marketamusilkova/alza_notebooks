import React from "react";
import type { SortOption } from "../types";

interface SortTabsProps {
  activeSort: SortOption;
  setActiveSort: (sort: SortOption) => void;
  loading: boolean;
}

const SortTabs: React.FC<SortTabsProps> = ({ activeSort, setActiveSort, loading }) => {
  const tabs = [
    { id: "TOP", label: "TOP" },
    { id: "NEJPRODAVANEJSI", label: "Nejprodávanější" },
    { id: "NEJLEVNEJSI", label: "Od nejlevnějšího" },
    { id: "NEJDRAZSI", label: "Od nejdražšího" },
  ];

  return (
    <div className='flex flex-wrap items-center border border-gray-200 rounded-t-lg overflow-hidden bg-white mb-[-1px] relative z-10 w-full sm:w-fit'>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveSort(tab.id as SortOption)}
          disabled={loading}
          className={`px-6 py-3 text-sm font-bold transition-colors border-r border-gray-200 last:border-r-0 ${
            activeSort === tab.id
              ? "bg-white text-gray-900 shadow-[inset_0_-2px_0_#1a73e8]"
              : "bg-gray-50 text-gray-500 hover:bg-white"
          } disabled:opacity-50`}>
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default SortTabs;