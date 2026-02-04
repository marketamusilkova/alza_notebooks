import React from "react";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  resetFilters: () => void;
  loading: boolean;
}

const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  resetFilters,
}) => {
  const isSearchActive = searchQuery.trim() !== "";

  return (
    <header className='bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4'>
        <div
          className='text-2xl font-black text-alza-blue tracking-tighter cursor-pointer select-none'
          onClick={resetFilters}>
          ALZA
        </div>

        <div className='flex-1 max-w-2xl relative'>
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Co hledáte?'
            className='w-full h-10 pl-11 pr-10 bg-gray-100 border border-transparent rounded-lg focus:bg-white focus:border-alza-blue focus:ring-2 focus:ring-alza-blue/20 focus:outline-none transition-all text-sm'
          />
          {isSearchActive && (
            <button
              onClick={() => setSearchQuery("")}
              className='absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-all'>
              <i className='fas fa-times text-xs'></i>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;