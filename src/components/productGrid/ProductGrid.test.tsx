import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Product } from "@/src/types/products";
import { ProductGrid } from "./index";
import React from "react";

vi.mock("../ProductCard", () => ({
  ProductCard: ({ product }: { product: Product }) => (
    <div data-testid="product-card">{product.nome}</div>
  ),
}));

describe("ProductGrid Component", () => {
  const mockProducts: Product[] = [
    {
      nome: "Produto 1",
      referencia: "REF1",
      preco: "10.00",
      imagem: "",
      codigo: "",
      codigo_categoria: "",
      descricao: "",
    },
    {
      nome: "Produto 2",
      referencia: "REF2",
      preco: "20.00",
      imagem: "",
      codigo: "",
      codigo_categoria: "",
      descricao: "",
    },
  ];

  const mockProps = {
    products: mockProducts,
    onOpenDetails: vi.fn(),

    loadMoreRef: {
      current: null,
    } as unknown as React.RefObject<HTMLDivElement>,
    hasMore: false,
  };

  it("deve renderizar a quantidade correta de ProductCards", () => {
    render(<ProductGrid {...mockProps} />);

    const cards = screen.getAllByTestId("product-card");
    expect(cards).toHaveLength(2);
    expect(screen.getByText("Produto 1")).toBeInTheDocument();
    expect(screen.getByText("Produto 2")).toBeInTheDocument();
  });

  it("deve exibir o indicador de carregamento quando hasMore for true", () => {
    render(<ProductGrid {...mockProps} hasMore={true} />);

    expect(screen.getByText(/Carregando mais brindes/i)).toBeInTheDocument();
  });

  it("não deve exibir o indicador de carregamento quando hasMore for false", () => {
    render(<ProductGrid {...mockProps} hasMore={false} />);

    expect(
      screen.queryByText(/Carregando mais brindes/i),
    ).not.toBeInTheDocument();
  });
});
