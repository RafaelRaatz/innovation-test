import { Product } from "@/src/types/products";
import { Loader2 } from "lucide-react";
import { ProductCard } from "../index";
import { RefObject } from "react";

interface ProductGridProps {
  products: Product[];
  onOpenDetails: (product: Product) => void;
  loadMoreRef: RefObject<HTMLDivElement | null>;
  hasMore: boolean;
}

export const ProductGrid = ({
  products,
  onOpenDetails,
  loadMoreRef,
  hasMore,
}: ProductGridProps) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((prod, index) => (
          <ProductCard
            key={prod.referencia}
            product={prod}
            index={index}
            onOpenDetails={() => onOpenDetails(prod)}
          />
        ))}
      </div>
      <div ref={loadMoreRef} className="py-12 flex justify-center h-20">
        {hasMore && (
          <div className="flex items-center gap-2 text-gray-400">
            <Loader2 className="animate-spin" size={24} />
            <span className="font-medium">Carregando mais brindes...</span>
          </div>
        )}
      </div>
    </>
  );
};
