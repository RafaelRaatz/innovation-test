import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { EmptyState } from "./index";

describe("EmptyState Component", () => {
  it("deve renderizar o estado de busca vazia com o termo correto", () => {
    render(<EmptyState type="empty" searchTerm="Caneca" />);

    expect(screen.getByText("Nenhum produto encontrado")).toBeInTheDocument();
    expect(
      screen.getByText(/Não encontramos resultados para "Caneca"/i),
    ).toBeInTheDocument();
  });

  it("deve renderizar o estado de erro e permitir clicar em tentar novamente", () => {
    const onActionMock = vi.fn();
    render(<EmptyState type="error" onAction={onActionMock} />);

    expect(screen.getByText("Ops! Algo deu errado")).toBeInTheDocument();

    const button = screen.getByText("Tentar novamente");
    fireEvent.click(button);

    expect(onActionMock).toHaveBeenCalledTimes(1);
  });

  it("deve exibir a animação de loading no ícone de refresh quando isFetching é true", () => {
    render(<EmptyState type="error" isFetching={true} />);

    const refreshIcon = screen
      .getByRole("button")
      .querySelector(".animate-spin");
    expect(refreshIcon).toBeInTheDocument();
  });

  it("não deve renderizar botão no estado de favoritos", () => {
    render(<EmptyState type="favorites" />);

    expect(screen.getByText("Sua lista está vazia")).toBeInTheDocument();

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
