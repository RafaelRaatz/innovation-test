"use client";

import { LogOut, Phone, Mail, User as UserIcon } from "lucide-react";
import { useAuthStore } from "@/src/store/useAuthStore";
import Cookies from "js-cookie";

export function Header() {
  const user = useAuthStore((state) => state.user);
  const hydrated = useAuthStore((state) => state._hasHydrated);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    Cookies.remove("token");

    logout();

    window.location.href = "/login";
  };

  const showUserInfo = hydrated && user;

  return (
    <header className="bg-lime-600 text-white py-3 px-4 md:py-4 md:px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2 shrink-0">
          <div className="bg-white text-lime-800 p-2 rounded-full font-bold text-lg md:text-2xl h-8 w-8 md:h-10 md:w-10 flex items-center justify-center">
            ib
          </div>
          <div className="leading-tight">
            <h1 className="font-bold text-sm md:text-xl tracking-wide">
              innovation
            </h1>
            <p className="text-[8px] md:text-xs tracking-widest uppercase">
              brindes
            </p>
          </div>
        </div>

        {showUserInfo ? (
          <div className="flex items-center gap-2 md:gap-6 text-sm">
            <div className="hidden lg:flex gap-3">
              <div
                className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full"
                title={user.nome_usuario}
              >
                <Mail size={16} />
              </div>
              <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                <Phone size={16} />
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3 pl-2 md:pl-4 border-l border-white/30">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-lime-600 shrink-0">
                <UserIcon size={20} className="md:w-6 md:h-6" />
              </div>

              <div className="flex flex-col max-w-25 md:max-w-none">
                <span className="font-bold text-xs md:text-base leading-none truncate">
                  {user.nome_usuario}
                </span>
                <span className="text-[8px] md:text-[10px] opacity-80 uppercase mt-0.5 md:mt-1 truncate">
                  {user.nome_grupo}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="ml-1 md:ml-4 p-2 hover:bg-red-600 rounded-full transition-all shrink-0 cursor-pointer"
                aria-label="Sair"
              >
                <LogOut size={16} className="md:w-4.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="h-10 w-20 md:w-48" />
        )}
      </div>
    </header>
  );
}
