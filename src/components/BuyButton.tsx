
import React, { useState, useRef, useEffect } from 'react';

interface BuyButtonProps {
  productName: string;
  onBuy: (action: string) => void;
}

const BuyButton: React.FC<BuyButtonProps> = ({ onBuy }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const menuItems = [
    { label: 'Do košíku', icon: 'fa-shopping-cart', color: 'text-green-600', action: 'basket' },
    { label: 'Koupit zrychleně', icon: 'fa-bolt', color: 'text-orange-500', action: 'fast' },
    { label: 'Porovnat', icon: 'fa-layer-group', color: 'text-blue-500', action: 'compare' },
    { label: 'Hlídat', icon: 'fa-bell', color: 'text-purple-500', action: 'watch' },
    { label: 'Přidat do seznamu', icon: 'fa-heart', color: 'text-red-500', action: 'list' },
  ];

  const handleAction = (item: typeof menuItems[0]) => {
    onBuy(item.label);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-10 flex items-center justify-between px-4 rounded font-bold transition-all duration-200 shadow-sm ${
          isOpen 
            ? 'bg-gray-800 text-white ring-2 ring-offset-1 ring-gray-800' 
            : 'bg-alza-blue hover:bg-alza-blueDark text-white'
        }`}
      >
        <span className="flex items-center gap-2">
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-shopping-basket'}`}></i>
          Koupit
        </span>
        <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>

      {isOpen && (
        <div 
          className="absolute bottom-full left-0 mb-2 w-full bg-white border border-gray-200 rounded-lg shadow-2xl z-[999] overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200"
          style={{ minWidth: '200px' }}
        >
          <div className="p-2 bg-gray-50 border-b border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Možnosti nákupu</p>
          </div>
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              className="w-full text-left px-4 py-3 hover:bg-blue-50 text-sm text-gray-700 flex items-center gap-3 transition-colors border-b last:border-b-0 border-gray-50 group"
              onClick={() => handleAction(item)}
            >
              <div className={`w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center transition-transform group-hover:scale-110`}>
                <i className={`fas ${item.icon} ${item.color}`}></i>
              </div>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BuyButton;