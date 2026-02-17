"use client";

import { useModal } from "@/src/hooks/useModal";
import { Product } from "@/src/types/products";
import { X, ShoppingBag } from "lucide-react";
import Image from "next/image";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { modalRef } = useModal(isOpen, onClose);

  if (!isOpen || !product) return null;

  const price = parseFloat(product.preco).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="bg-white w-full max-w-lg rounded-xl shadow-2xl relative animate-in fade-in zoom-in duration-200 max-h-[85vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 bg-white/90 hover:bg-gray-100 rounded-full transition-colors z-30 text-gray-400 cursor-pointer border border-gray-100"
          aria-label="Fechar modal"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col">
          <div className="w-full bg-gray-50 p-6 flex items-center justify-center border-b border-gray-100">
            <div className="relative w-40 h-40 md:w-56 md:h-56">
              <Image
                src={product.imagem}
                alt={product.nome}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="p-6 flex flex-col">
            <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-tighter mb-1">
              REF: {product.referencia}
            </span>
            <h2
              id="modal-title"
              className="text-lg md:text-xl font-bold text-gray-800 mb-2 leading-tight"
            >
              {product.nome}
            </h2>

            <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 hover:line-clamp-none transition-all cursor-default">
              {product.descricao ||
                "Descrição do produto disponível sob consulta."}
            </p>

            <div className="flex items-end justify-between mb-6">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase font-bold">
                  Preço Unitário
                </span>
                <span className="text-2xl font-black text-[#84cc16]">
                  {price}
                </span>
              </div>

              <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-2 py-1 rounded">
                EXCLUSIVO!
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <button className="w-full bg-[#84cc16] hover:bg-[#65a30d] text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-[0.98]">
                <ShoppingBag size={18} />
                ADICIONAR AO CARRINHO
              </button>
              <button
                onClick={onClose}
                className="w-full py-2 text-gray-400 hover:text-gray-600 text-xs font-semibold transition-colors cursor-pointer"
              >
                Voltar para a listagem
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
}
