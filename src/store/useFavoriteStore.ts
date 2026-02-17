import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/src/types/products";
import { create } from "zustand";

interface FavoriteState {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (product) => {
        const { favorites } = get();
        const index = favorites.findIndex((p) => p.codigo === product.codigo);

        if (index >= 0) {
          set({
            favorites: favorites.filter((p) => p.codigo !== product.codigo),
          });
        } else {
          set({ favorites: [...favorites, product] });
        }
      },
      isFavorite: (productId) => {
        return get().favorites.some((p) => p.codigo === productId);
      },
    }),
    {
      name: "innovation-favorites",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
