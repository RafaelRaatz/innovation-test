import { LoginCredentials, LoginResponse } from "@/src/types/auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginService = async (
  credentials: LoginCredentials,
): Promise<LoginResponse> => {
  const response = await fetch(`${BASE_URL}/login/acessar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Erro de conexão com o servidor");
  }

  return response.json();
};
