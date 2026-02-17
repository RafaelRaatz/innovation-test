import { Product } from "@/src/types/products";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const getHeaders = () => {
  const token = Cookies.get("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const handleResponse = async (res: Response) => {
  if (res.status === 401) {
    Cookies.remove("token");
    window.location.href = "/login";
    throw new Error("Sessão expirada");
  }
  if (!res.ok) throw new Error("Falha ao comunicar com o servidor");
  return res.json();
};

export const fetchProducts = async (term: string = ""): Promise<Product[]> => {
  const headers = getHeaders();

  const url = `${BASE_URL}/produtos/listar`;

  if (!term.trim()) {
    const res = await fetch(url, { method: "GET", headers });
    return handleResponse(res);
  }

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ nome_produto: term, codigo_produto: "" }),
  });
  return handleResponse(res);
};
