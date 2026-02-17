import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductModal } from "./index";
import { Product } from "@/src/types/products";

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

describe("ProductModal Component", () => {
  const mockProduct: Product = {
    nome: "Caneta Personalizada",
    referencia: "CAN-123",
    preco: "5.50",
    imagem: "/test-image.jpg",
    codigo: "123",
    codigo_categoria: "1",
    descricao: "Uma descrição de teste para o modal.",
  };

  const mockOnClose = vi.fn();

  it("não deve renderizar nada quando isOpen for false", () => {
    const { container } = render(
      <ProductModal
        product={mockProduct}
        isOpen={false}
        onClose={mockOnClose}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("deve renderizar as informações do produto corretamente quando aberto", () => {
    render(
      <ProductModal
        product={mockProduct}
        isOpen={true}
        onClose={mockOnClose}
      />,
    );

    expect(screen.getByText("Caneta Personalizada")).toBeInTheDocument();
    expect(screen.getByText(/CAN-123/i)).toBeInTheDocument();

    expect(screen.getByText(/R\$\s*5,50/)).toBeInTheDocument();
    expect(
      screen.getByText("Uma descrição de teste para o modal."),
    ).toBeInTheDocument();
  });

  it("deve chamar onClose ao clicar no botão de fechar ou no link de voltar", () => {
    render(
      <ProductModal
        product={mockProduct}
        isOpen={true}
        onClose={mockOnClose}
      />,
    );

    const closeBtn = screen.getByLabelText("Fechar modal");
    fireEvent.click(closeBtn);
    expect(mockOnClose).toHaveBeenCalledTimes(1);

    const backBtn = screen.getByText(/Voltar para a listagem/i);
    fireEvent.click(backBtn);
    expect(mockOnClose).toHaveBeenCalledTimes(2);
  });

  it("deve exibir mensagem padrão quando o produto não tem descrição", () => {
    const productWithoutDesc = { ...mockProduct, descricao: "" };
    render(
      <ProductModal
        product={productWithoutDesc}
        isOpen={true}
        onClose={mockOnClose}
      />,
    );

    expect(
      screen.getByText(/Descrição detalhada do produto não disponível/i),
    ).toBeInTheDocument();
  });
});
