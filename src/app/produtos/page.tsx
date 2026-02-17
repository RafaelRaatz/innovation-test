"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useFavoriteStore } from "@/src/store/useFavoriteStore";
import { useAuthStore } from "@/src/store/useAuthStore";
import { fetchProducts } from "@/src/services/products";
import { useDebounce } from "@/src/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/src/types/products";
import {
  Header,
  ProductModal,
  ProductSkeleton,
  FilterBar,
  EmptyState,
  ProductGrid,
} from "@/src/components";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 400);
  const [sortOption, setSortOption] = useState("name-asc");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const { favorites } = useFavoriteStore();
  const user = useAuthStore((state) => state.user);

  const [visibleCount, setVisibleCount] = useState(12);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["products", debouncedSearch],
    queryFn: () => fetchProducts(debouncedSearch),
    retry: false,
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });

  const sortedAndFiltered = useMemo(() => {
    const base = showOnlyFavorites ? favorites : products;
    const sorted = [...base];

    return sorted.sort((a, b) => {
      const pA = parseFloat(a.preco);
      const pB = parseFloat(b.preco);
      if (sortOption === "price-asc") return pA - pB;
      if (sortOption === "price-desc") return pB - pA;
      return sortOption === "name-asc"
        ? a.nome.localeCompare(b.nome)
        : b.nome.localeCompare(a.nome);
    });
  }, [products, favorites, showOnlyFavorites, sortOption]);

  const visibleProducts = useMemo(() => {
    return sortedAndFiltered.slice(0, visibleCount);
  }, [sortedAndFiltered, visibleCount]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          visibleCount < sortedAndFiltered.length
        ) {
          setVisibleCount((prev) => prev + 12);
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    );

    const currentLoader = loadMoreRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [visibleCount, sortedAndFiltered.length]);

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setVisibleCount(12);
  };

  const toggleFilter = () => {
    setShowOnlyFavorites(!showOnlyFavorites);
    setVisibleCount(12);
  };

  const handleOpenDetails = (prod: Product) => {
    setSelectedProduct(prod);
    setIsModalOpen(true);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          showOnlyFavorites={showOnlyFavorites}
          onToggleFavorites={toggleFilter}
          sortOption={sortOption}
          onSortChange={setSortOption}
          favoritesCount={favorites.length}
        />

        {isLoading && !showOnlyFavorites ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : isError ? (
          <EmptyState type="error" onAction={refetch} isFetching={isFetching} />
        ) : sortedAndFiltered.length === 0 ? (
          <EmptyState
            type={showOnlyFavorites ? "favorites" : "empty"}
            searchTerm={searchTerm}
            onAction={() => handleSearchChange("")}
          />
        ) : (
          <ProductGrid
            products={visibleProducts}
            onOpenDetails={handleOpenDetails}
            loadMoreRef={loadMoreRef}
            hasMore={visibleCount < sortedAndFiltered.length}
          />
        )}
      </main>

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
      />
    </div>
  );
}
