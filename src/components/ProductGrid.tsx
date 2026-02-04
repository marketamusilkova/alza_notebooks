import React from "react";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: any[]; 
  loading: boolean;
  searchQuery: string;
  resetFilters: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading,
  searchQuery,
  resetFilters,
}) => {
  if (loading) {
    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className='animate-pulse flex flex-col gap-4'>
            <div className='aspect-square bg-gray-100 rounded-lg'></div>
            <div className='h-4 bg-gray-100 rounded w-3/4'></div>
            <div className='h-10 bg-gray-100 rounded'></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className='py-32 text-center animate-in zoom-in-95 duration-300'>
        <div className='w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4'>
          <i className='fas fa-search text-3xl text-gray-300'></i>
        </div>
        <h3 className='text-xl font-bold text-gray-800 mb-2'>
          Žádné výsledky
        </h3>
        <p className='text-gray-500 max-w-xs mx-auto'>
          Pro váš dotaz <span className='font-bold'>"{searchQuery}"</span> jsme nic nenašli.
          Zkuste jiné slovo nebo změňte filtry.
        </p>
        <button
          onClick={resetFilters}
          className='mt-6 px-6 py-2 bg-alza-blue text-white font-bold rounded-lg hover:bg-alza-blueDark transition-colors shadow-md'>
          Zrušit všechny filtry
        </button>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-in slide-in-from-bottom-4 duration-500'>
      {products.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
};

export default ProductGrid;