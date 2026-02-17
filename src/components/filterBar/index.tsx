import { Search, Heart } from "lucide-react";

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  showOnlyFavorites: boolean;
  onToggleFavorites: () => void;
  sortOption: string;
  onSortChange: (val: string) => void;
  favoritesCount: number;
}

export const FilterBar = ({
  searchTerm,
  onSearchChange,
  showOnlyFavorites,
  onToggleFavorites,
  sortOption,
  onSortChange,
  favoritesCount,
}: FilterBarProps) => {
  return (
    <div className="mb-8 flex flex-col lg:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <div className="relative flex-1">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Pesquisar brindes..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-11 pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-[#84cc16] transition-all outline-none text-black"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={onToggleFavorites}
          aria-label={
            showOnlyFavorites
              ? "Mostrar todos os produtos"
              : "Mostrar apenas favoritos"
          }
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all cursor-pointer ${
            showOnlyFavorites
              ? "bg-red-50 border-red-100 text-red-600 shadow-sm"
              : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
          }`}
        >
          <Heart
            size={18}
            className={showOnlyFavorites ? "fill-red-600" : ""}
          />
          <span className="hidden sm:inline font-medium">Favoritos</span>
          <span className="ml-1 font-bold">({favoritesCount})</span>
        </button>

        <select
          value={sortOption}
          aria-label="Ordenar produtos"
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-[#84cc16] cursor-pointer"
        >
          <option value="name-asc">Nome: A-Z</option>
          <option value="name-desc">Nome: Z-A</option>
          <option value="price-asc">Menor Preço</option>
          <option value="price-desc">Maior Preço</option>
        </select>
      </div>
    </div>
  );
};
