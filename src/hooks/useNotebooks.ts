import { useState, useEffect, useMemo } from "react";
import { fetchNotebooks } from "../api/AlzaApi";
import type { Product, SortOption } from "../types";
import { categoryFilters } from "../utils/categoryFilters";

export const useNotebooks = () => {
  const [notebooks, setNotebooks] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSort, setActiveSort] = useState<SortOption>("TOP");
  const [activeCategory, setActiveCategory] = useState<string>("Vše");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchNotebooks();
      if (!data || data.length === 0) {
        setError("Momentálně nemáme v této kategorii žádné produkty skladem.");
      } else {
        setNotebooks(data);
      }
    } catch (err: any) {
      setError(
        err.message ||
          "Nepodařilo se navázat spojení se serverem. Zkontrolujte prosím své internetové připojení."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getSoldCount = (product: Product) => {
    if (!product.advertising) return 0;
    const match = product.advertising.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const topSellingNotebooks = [...notebooks]
    .sort((a, b) => getSoldCount(b) - getSoldCount(a))
    .slice(0, 8);

  const filteredAndSortedNotebooks = useMemo(() => {
    let result = [...notebooks];

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.spec.toLowerCase().includes(query)
      );
    }

    if (activeCategory !== "Vše") {
      const keywords = categoryFilters[activeCategory] || [];
      if (keywords.length > 0) {
        result = result.filter((product) => {
          const searchStr = `${product.name} ${product.spec}`.toLowerCase();
          return keywords.some((keyword) =>
            searchStr.includes(keyword.toLowerCase())
          );
        });
      }
    }

    result.sort((a, b) => {
      const priceA = parseInt(a.price?.replace(/\D/g, "") || "0");
      const priceB = parseInt(b.price?.replace(/\D/g, "") || "0");

      switch (activeSort) {
        case "NEJLEVNEJSI":
          return priceA - priceB;
        case "NEJDRAZSI":
          return priceB - priceA;
        case "NEJPRODAVANEJSI":
          return b.rating - a.rating;
        case "TOP":
        default:
          return 0;
      }
    });

    return result;
  }, [notebooks, activeCategory, activeSort, searchQuery]);

  return {
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
  };
};
