import React from "react";
import CategoryFilter from "./components/CategoryFilter";
import Header from "./components/Header";
import SortTabs from "./components/SortTabs";
import ErrorMessage from "./components/ErrorMessage";
import ProductGrid from "./components/ProductGrid";
import Carousel from "./components/Carousel";
import { useNotebooks } from "./hooks/useNotebooks";

const App: React.FC = () => {
  const {
    notebooks,
    loading,
    error,
    activeSort,
    setActiveSort,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    topSellingNotebooks,
    filteredAndSortedNotebooks,
    loadData,
  } = useNotebooks();

  const isSearchActive = searchQuery.trim() !== "";

  const resetFilters = () => {
    setActiveCategory("Vše");
    setActiveSort("TOP");
    setSearchQuery("");
  };

  if (loading && notebooks.length === 0) {
    return (
      <div className='min-h-screen bg-alza-gray flex flex-col items-center justify-center p-4'>
        <div className='flex flex-col items-center gap-6 animate-in fade-in duration-700'>
          <div className='relative'>
            <div className='w-20 h-20 border-4 border-gray-200 border-t-alza-blue rounded-full animate-spin'></div>
            <div className='absolute inset-0 flex items-center justify-center'>
              <i className='fas fa-laptop text-alza-blue animate-pulse'></i>
            </div>
          </div>
          <div className='text-center'>
            <h2 className='text-xl font-bold text-gray-800 mb-2'>Načítáme notebooky...</h2>
            <p className='text-gray-500 text-sm max-w-xs'>
              Hledáme pro vás ty nejlepší kousky, okamžik prosím.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen pb-20 bg-alza-gray'>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        resetFilters={resetFilters}
        loading={loading}
      />

      <main className='max-w-7xl mx-auto px-4 py-8'>
        {error ? (
          <ErrorMessage error={error} onRetry={loadData} />
        ) : (
          <>
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6'>
              <div className='flex items-center gap-3'>
                <h2 className='text-3xl font-bold text-gray-900'>
                  {isSearchActive
                    ? "Výsledky hledání"
                    : activeCategory === "Vše"
                    ? "Notebooky"
                    : activeCategory}
                </h2>
                {!loading && (
                  <span className='bg-blue-50 text-alza-blue text-xs px-2.5 py-1 rounded-full font-bold border border-blue-100'>
                    {filteredAndSortedNotebooks.length} produktů
                  </span>
                )}
              </div>
              {isSearchActive && (
                <div className='text-sm text-gray-500 italic'>
                  Zobrazeny výsledky pro: <span className='font-bold text-gray-800'>" {searchQuery} "</span>
                </div>
              )}
            </div>

            <CategoryFilter
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              loading={loading}
            />

            {activeCategory === "Vše" && !isSearchActive && !loading && topSellingNotebooks.length > 0 && (
              <section className='mb-12 animate-in fade-in duration-500'>
                <div className='flex items-baseline justify-between mb-4 px-2'>
                  <h3 className='text-xl font-bold text-alza-blue flex items-center gap-2'>
                    <i className='fas fa-fire text-orange-500'></i> Nejprodávanější
                  </h3>
                </div>
                <Carousel items={topSellingNotebooks} />
              </section>
            )}

            <SortTabs activeSort={activeSort} setActiveSort={setActiveSort} loading={loading} />

            <div className='border border-gray-200 p-6 rounded-b-lg rounded-tr-lg bg-white min-h-[400px]'>
              <ProductGrid
                products={filteredAndSortedNotebooks}
                loading={loading}
                searchQuery={searchQuery}
                resetFilters={resetFilters}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default App;