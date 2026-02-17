"use client";

import { useFavoriteStore } from "@/src/store/useFavoriteStore";
import { Product } from "@/src/types/products";
import { Heart } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  onOpenDetails: () => void;
  index?: number;
}

export function ProductCard({
  product,
  onOpenDetails,
  index = 0,
}: ProductCardProps) {
  const { toggleFavorite, isFavorite } = useFavoriteStore();
  const favorited = isFavorite(product.codigo);

  const isPriority = index < 5;

  const price = parseFloat(product.preco).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col relative group overflow-hidden h-full">
      <div className="absolute top-0 w-full flex justify-between items-start z-10 px-2 py-1">
        <span className="text-xs font-bold text-cyan-500 bg-cyan-50 px-2 py-1 uppercase tracking-wider">
          Exclusivo!
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product);
          }}
          title={
            favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"
          }
          aria-label={
            favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"
          }
          className="p-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 transition-transform cursor-pointer"
        >
          <Heart
            size={18}
            className={
              favorited ? "fill-red-500 text-red-500" : "text-gray-400"
            }
            aria-hidden="true"
          />
        </button>
      </div>

      <div
        className="relative w-full h-48 p-4 bg-white cursor-pointer"
        onClick={onOpenDetails}
      >
        <Image
          src={product.imagem}
          alt={product.nome}
          fill
          priority={isPriority}
          loading={isPriority ? "eager" : "lazy"}
          className="object-contain group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
        />
      </div>

      <div className="p-4 flex flex-col grow text-center">
        <h3 className="font-bold text-gray-800 text-sm line-clamp-2 min-h-10">
          {product.nome}
        </h3>
        <p className="text-xs text-gray-400 mt-1 mb-2">{product.codigo}</p>

        <div className="flex justify-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-black"][i]}`}
            />
          ))}
        </div>

        <div className="mt-auto">
          <p className="text-xs text-gray-500">a partir de</p>
          <p className="text-xl font-bold text-gray-700">{price}</p>

          <button
            onClick={onOpenDetails}
            className="w-full mt-3 bg-lime-500 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded transition-colors uppercase text-sm cursor-pointer"
          >
            Confira
          </button>
        </div>
      </div>

      <div className="text-[10px] text-gray-300 text-center pb-2 w-full">
        gerado pela melhor oferta
      </div>
    </div>
  );
}
