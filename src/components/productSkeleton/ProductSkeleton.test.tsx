import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProductSkeleton } from "./index";

describe("ProductSkeleton Component", () => {
  it("deve renderizar com a classe de animação de pulse", () => {
    const { container } = render(<ProductSkeleton />);

    expect(container.firstChild).toHaveClass("animate-pulse");
  });

  it("deve renderizar a estrutura completa do skeleton", () => {
    const { container } = render(<ProductSkeleton />);

    const grayElements = container.querySelectorAll(".bg-gray-200");
    const lightGrayElements = container.querySelectorAll(".bg-gray-100");

    expect(grayElements.length).toBeGreaterThan(0);
    expect(lightGrayElements.length).toBeGreaterThan(0);
  });

  it("deve renderizar os 5 círculos simulando a avaliação ou detalhes", () => {
    const { container } = render(<ProductSkeleton />);
    const dots = container.querySelectorAll(".rounded-full");

    expect(dots.length).toBeGreaterThanOrEqual(5);
  });
});
