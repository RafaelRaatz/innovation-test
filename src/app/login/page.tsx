"use client";

import { useAuthStore } from "@/src/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { loginService } from "@/src/services/auth";
import { User, Lock, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const mutation = useMutation({
    mutationFn: loginService,
    onSuccess: (data) => {
      if (data.status === 1 && data.token_de_acesso && data.dados_usuario) {
        Cookies.set("token", data.token_de_acesso, { expires: 7, path: "/" });

        setUser({
          codigo_usuario: String(data.dados_usuario.codigo_usuario),
          nome_usuario: String(data.dados_usuario.nome_usuario),
          codigo_grupo: String(data.dados_usuario.codigo_grupo),
          nome_grupo: String(data.dados_usuario.nome_grupo),
        });

        router.replace("/produtos");
      } else {
        setErrorMessage(data.message || "Credenciais inválidas.");
      }
    },

    onError: (error: unknown) => {
      console.error("Erro na mutação de login:", error);
      const msg = error instanceof Error ? error.message : "Erro desconhecido";
      setErrorMessage(
        msg === "Network Error"
          ? "Erro de conexão com o servidor."
          : "Ocorreu um erro inesperado. Tente novamente.",
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    mutation.mutate({ email, senha });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070')] bg-cover bg-center" />

      <div className="z-10 w-full max-w-md px-4 flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-lime-600 mb-8 text-center drop-shadow-sm">
          Bem-vindo a Innovation Brindes
        </h1>

        <div className="w-full bg-lime-500 rounded-3xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <User size={20} />
              </div>
              <input
                type="text"
                placeholder="Usuário"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-full bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700 transition-all"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <Lock size={20} />
              </div>
              <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-full bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700 transition-all"
                required
              />
            </div>

            <div className="flex justify-between items-center text-white text-sm px-2 mt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-green-800 w-4 h-4 rounded"
                />
                <span>Manter logado</span>
              </label>
              <a href="#" className="hover:underline opacity-90">
                Esqueceu a senha?
              </a>
            </div>

            {errorMessage && (
              <div className="bg-red-500 text-white text-xs p-3 rounded-xl text-center font-bold animate-in fade-in zoom-in duration-300">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={mutation.isPending}
              className="mt-4 w-full h-12 bg-white text-lime-600 font-bold text-lg rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {mutation.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
