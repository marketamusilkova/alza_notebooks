import React from "react";
import { CATEGORIES } from "../types";

interface CategoryFilterProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  loading: boolean;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  setActiveCategory,
  loading,
}) => {
  return (
    <div className='flex flex-wrap gap-2 mb-10'>
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          disabled={loading}
          className={`px-5 py-2.5 rounded text-sm font-medium transition-all shadow-sm ${
            activeCategory === cat
              ? "bg-alza-blue text-white shadow-alza-blue/30"
              : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
          } disabled:opacity-50`}>
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;