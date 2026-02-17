import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FilterBar } from "./index";

describe("FilterBar Component", () => {
  const mockProps = {
    searchTerm: "",
    onSearchChange: vi.fn(),
    showOnlyFavorites: false,
    onToggleFavorites: vi.fn(),
    sortOption: "name-asc",
    onSortChange: vi.fn(),
    favoritesCount: 10,
  };

  it("deve chamar onSearchChange ao digitar no campo de busca", () => {
    render(<FilterBar {...mockProps} />);

    const input = screen.getByPlaceholderText(/pesquisar brindes/i);
    fireEvent.change(input, { target: { value: "caneta" } });

    expect(mockProps.onSearchChange).toHaveBeenCalledWith("caneta");
  });

  it("deve exibir a contagem correta de favoritos no botão", () => {
    render(<FilterBar {...mockProps} />);

    expect(screen.getByText("(10)")).toBeInTheDocument();
  });

  it("deve alternar o aria-label do botão de favoritos baseado no estado", () => {
    const { rerender } = render(<FilterBar {...mockProps} />);

    expect(
      screen.getByLabelText("Mostrar apenas favoritos"),
    ).toBeInTheDocument();

    rerender(<FilterBar {...mockProps} showOnlyFavorites={true} />);
    expect(
      screen.getByLabelText("Mostrar todos os produtos"),
    ).toBeInTheDocument();
  });

  it("deve disparar onSortChange quando uma nova opção de ordenação for selecionada", () => {
    render(<FilterBar {...mockProps} />);

    const select = screen.getByLabelText("Ordenar produtos");
    fireEvent.change(select, { target: { value: "price-desc" } });

    expect(mockProps.onSortChange).toHaveBeenCalledWith("price-desc");
  });

  it("deve chamar onToggleFavorites ao clicar no botão de favoritos", () => {
    render(<FilterBar {...mockProps} />);

    const button = screen.getByRole("button", { name: /favoritos/i });
    fireEvent.click(button);

    expect(mockProps.onToggleFavorites).toHaveBeenCalled();
  });
});
