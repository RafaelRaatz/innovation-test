import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Header } from "./index";
import Cookies from "js-cookie";

vi.mock("js-cookie", () => ({
  default: {
    remove: vi.fn(),
  },
}));

vi.mock("@/src/store/useAuthStore", () => ({
  useAuthStore: (selector: (state: unknown) => unknown) => {
    const mockState = {
      user: { nome_usuario: "Fulano de Tal", nome_grupo: "Admin" },
      _hasHydrated: true,
      logout: vi.fn(),
    };

    return selector(mockState);
  },
}));

describe("Header Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    Object.defineProperty(window, "location", {
      writable: true,
      value: { href: "" },
    });
  });

  it("deve exibir o nome do usuário e grupo quando estiver hidratado e logado", () => {
    render(<Header />);

    expect(screen.getByText("Fulano de Tal")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  it("deve executar o fluxo de logout corretamente ao clicar no botão", () => {
    render(<Header />);

    const logoutBtn = screen.getByLabelText("Sair");
    fireEvent.click(logoutBtn);

    expect(Cookies.remove).toHaveBeenCalledWith("token");

    expect(window.location.href).toBe("/login");
  });

  it("deve ter o logo do sistema visível", () => {
    render(<Header />);
    expect(screen.getByText("innovation")).toBeInTheDocument();
    expect(screen.getByText("brindes")).toBeInTheDocument();
  });
});
