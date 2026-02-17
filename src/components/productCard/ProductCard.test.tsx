import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ProductCard } from "../index";

vi.mock("@/src/store/useFavoriteStore", () => ({
  useFavoriteStore: () => ({
    toggleFavorite: vi.fn(),
    isFavorite: () => false,
  }),
}));

const mockProduct = {
  codigo: "123",
  nome: "Produto de Teste",
  preco: "10.50",
  imagem: "https://via.placeholder.com/150",
  referencia: "REF-001",
  nome_grupo: "Grupo Teste",
  codigo_grupo: "G1",
  codigo_categoria: "CAT-01",
  descricao: "Uma descrição detalhada para o teste passsar.",
};

describe("ProductCard", () => {
  it("deve renderizar o nome do produto e o preço formatado", () => {
    render(
      <ProductCard product={mockProduct} onOpenDetails={() => {}} index={0} />,
    );

    expect(screen.getByText("Produto de Teste")).toBeInTheDocument();
    // Verifica se formatou o preço corretamente para BRL
    expect(screen.getByText(/R\$\s?10,50/)).toBeInTheDocument();
  });

  it("deve chamar a função onOpenDetails ao clicar na imagem ou no botão", () => {
    const onOpenDetailsMock = vi.fn();
    render(
      <ProductCard
        product={mockProduct}
        onOpenDetails={onOpenDetailsMock}
        index={0}
      />,
    );

    const button = screen.getByRole("button", { name: /confira/i });
    fireEvent.click(button);

    expect(onOpenDetailsMock).toHaveBeenCalledTimes(1);
  });
});
