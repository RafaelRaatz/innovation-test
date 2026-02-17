export interface User {
  codigo_usuario: string;
  nome_usuario: string;
  codigo_grupo: string;
  nome_grupo: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  token_de_acesso?: string;
  dados_usuario?: User;
}

export interface LoginCredentials {
  email: string;
  senha: string;
}
