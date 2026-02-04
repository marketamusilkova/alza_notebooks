
import React from 'react';
import BuyButton from './BuyButton';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'carousel';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, variant = 'grid' }) => {
  const sanitizeHtml = (html: string) => ({ __html: html?.replace(/&nbsp;/g, ' ') || '' });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <i
        key={i}
        className={`fas fa-star text-xs ${i < Math.floor(rating || 0) ? 'text-yellow-400' : 'text-gray-200'}`}
      ></i>
    ));
  };

  return (
    <div className={`bg-white border border-gray-200 p-4 rounded-lg flex flex-col h-full hover:shadow-xl transition-all duration-300 group relative z-10 hover:z-20 ${variant === 'carousel' ? 'w-full' : ''}`}>
      {product.advertising && (
        <div className="absolute top-2 left-2 z-10 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
          {product.advertising}
        </div>
      )}

      <div className="relative aspect-square mb-3 overflow-hidden rounded-md bg-gray-50">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="flex-grow flex flex-col">
        <h3 className="text-sm font-bold text-gray-900 line-clamp-2 mb-1 group-hover:text-alza-blue transition-colors cursor-pointer min-h-[40px]">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-2">
          <div className="flex gap-0.5">
            {renderStars(product.rating)}
          </div>
          <span className="text-[10px] text-gray-400 font-bold">({product.rating?.toFixed(1)})</span>
        </div>

        <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed mb-4 flex-grow">
          {product.spec}
        </p>
      </div>

      <div className="mt-auto space-y-3">
        <div className="border-t border-gray-50 pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-alza-red" dangerouslySetInnerHTML={sanitizeHtml(product.price)} />
            {product.cprice && (
              <span className="text-xs text-gray-400 line-through" dangerouslySetInnerHTML={sanitizeHtml(product.cprice)} />
            )}
          </div>
          <div className="text-[10px] text-gray-400 font-medium">
            bez DPH <span dangerouslySetInnerHTML={sanitizeHtml(product.priceWithoutVat)} />
          </div>
        </div>

        <BuyButton 
          productName={product.name} 
          onBuy={(action) => console.log(`Akce "${action}" pro produkt: ${product.name}`)} 
        />

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full animate-pulse`} style={{ backgroundColor: `#${product.avail_color || '398000'}` }}></div>
            <span className="text-[11px] font-bold text-gray-700">{product.avail}</span>
          </div>
          <span className="text-[10px] text-gray-400 italic">{product.avail_postfix}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;