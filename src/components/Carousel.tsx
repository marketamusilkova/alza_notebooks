import React, { useState, useCallback, useEffect, useRef } from "react";
import type { Product } from "../types";
import ProductCard from "./ProductCard";

interface CarouselProps {
  items: Product[];
}

const TRANSITION_DURATION = 500; 

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  if (items.length === 0) return null;

  const totalItems = items.length;
  const extendedItems = [...items, ...items, ...items];

  const [currentIndex, setCurrentIndex] = useState(totalItems);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const updateWidth = () => {
      setCardWidth(cardRef.current!.offsetWidth);
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, []);

  const next = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((i) => i + 1);
  }, [isTransitioning]);

  const prev = useCallback(() => {
    if (isTransitioning) return;

    if (currentIndex === totalItems) {
      setIsTransitioning(false);
      setCurrentIndex(totalItems * 2);

      rafRef.current = requestAnimationFrame(() => {
        setIsTransitioning(true);
        setCurrentIndex((i) => i - 1);
      });

      return;
    }

    setIsTransitioning(true);
    setCurrentIndex((i) => i - 1);
  }, [isTransitioning, currentIndex, totalItems]);

  useEffect(() => {
    if (!isTransitioning) return;

    const timer = setTimeout(() => {
      setIsTransitioning(false);

      rafRef.current = requestAnimationFrame(() => {
        if (currentIndex >= totalItems * 2) {
          setCurrentIndex(totalItems);
        } else if (currentIndex < totalItems) {
          setCurrentIndex(currentIndex + totalItems);
        }
      });
    }, TRANSITION_DURATION);

    return () => {
      clearTimeout(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [currentIndex, isTransitioning, totalItems]);

  const offsetPx = (currentIndex - totalItems) * cardWidth;

  return (
    <div className='relative group py-8 px-1'>
      <div className='overflow-hidden' style={{ touchAction: "pan-y" }}>
        <div
          className={`flex ${
            isTransitioning
              ? "transition-transform duration-500 ease-in-out"
              : "transition-none"
          }`}
          style={{
            transform: `translateX(-${offsetPx}px)`,
            willChange: "transform",
          }}>
          {extendedItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              ref={idx === 0 ? cardRef : null}
              className='flex-none px-2
                w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5'>
              <ProductCard product={item} variant='carousel' />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prev}
        className='absolute left-[-10px] top-1/2 -translate-y-1/2
          w-12 h-12 bg-white border border-gray-200 rounded-full
          shadow-xl flex items-center justify-center text-[#1a73e8]
          opacity-0 group-hover:opacity-100 transition-all
          hover:scale-110 z-30'>
        <i className='fas fa-chevron-left text-lg' />
      </button>

      <button
        onClick={next}
        className='absolute right-[-10px] top-1/2 -translate-y-1/2
          w-12 h-12 bg-white border border-gray-200 rounded-full
          shadow-xl flex items-center justify-center text-[#1a73e8]
          opacity-0 group-hover:opacity-100 transition-all
          hover:scale-110 z-30'>
        <i className='fas fa-chevron-right text-lg' />
      </button>
    </div>
  );
};

export default Carousel;
