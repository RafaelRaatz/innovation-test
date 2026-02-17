import { PackageSearch, Heart, AlertCircle, RefreshCw } from "lucide-react";

interface EmptyStateProps {
  type: "empty" | "favorites" | "error";
  searchTerm?: string;
  onAction?: () => void;
  isFetching?: boolean;
}

export const EmptyState = ({
  type,
  searchTerm,
  onAction,
  isFetching,
}: EmptyStateProps) => {
  const configs = {
    empty: {
      icon: <PackageSearch size={48} className="text-gray-300" />,
      title: "Nenhum produto encontrado",
      desc: `Não encontramos resultados para "${searchTerm}".`,
      button: "Limpar pesquisa",
    },
    favorites: {
      icon: <Heart size={48} className="text-gray-300" />,
      title: "Sua lista está vazia",
      desc: "Clique no coração para salvar seus brindes preferidos.",
      button: null,
    },
    error: {
      icon: <AlertCircle size={48} className="text-red-400" />,
      title: "Ops! Algo deu errado",
      desc: "Não conseguimos carregar os produtos.",
      button: "Tentar novamente",
    },
  };

  const current = configs[type];

  return (
    <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl shadow-sm border border-gray-100 text-center px-4">
      <div className="bg-gray-50 p-6 rounded-full mb-6">{current.icon}</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{current.title}</h2>
      <p className="text-gray-500 max-w-sm">{current.desc}</p>
      {current.button && (
        <button
          onClick={onAction}
          className="mt-6 flex items-center gap-2 text-[#84cc16] font-bold hover:text-[#65a30d] transition-colors underline"
        >
          {type === "error" && (
            <RefreshCw size={18} className={isFetching ? "animate-spin" : ""} />
          )}
          {current.button}
        </button>
      )}
    </div>
  );
};
