# Innovation Brindes - Teste

## 🛠️ Stack Tecnológica

Framework: Next.js para renderização otimizada e SEO.

Linguagem: TypeScript para segurança de tipos e melhor manutenção.

Estado Global: Zustand para controle de autenticação e lista de favoritos.

Data Fetching: React Query (TanStack) para cache, revalidação e gerenciamento de estados de loading/erro.

Estilização: Tailwind CSS para design responsivo (Mobile-first).

Ícones: Lucide-react para interface limpa e intuitiva.

---

## ✨ Funcionalidades

Autenticação Completa: Fluxo de login consumindo endpoint REST com autenticação via Bearer Token. Para persistência e proteção de rotas, utilizei Cookies integrados ao Next.js Middleware.

Catálogo de Produtos: Listagem dinâmica com busca em tempo real (debounce) e filtros.

Sistema de Favoritos: Possibilidade de favoritar produtos com persistência no LocalStorage (via Zustand).

UX Refinada: Implementação de Skeletons de carregamento para evitar o "Layout Shift" e melhorar a percepção de velocidade.

Responsividade Total: Interface adaptada para dispositivos móveis, tablets e desktop.

---

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Docker e Docker Compose instalados
- Arquivo `.env` configurado (ver seção abaixo)

---

### Passo a Passo

#### Clone o repositório:

```bash
git clone https://github.com/RafaelRaatz/innovation-test.git
cd innovation-test
```

#### Configure as Variáveis de Ambiente:

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```bash
NEXT_PUBLIC_API_URL=https://apihomolog.innovationbrindes.com.br/api/innova-dinamica
```

#### Suba os Containers:

No terminal (PowerShell ou Bash), execute:

```bash
docker-compose up --build
```

#### Acesse a aplicação:

Abra o navegador em:

```
http://localhost:3000
```

#### Dados para Login:

- usuario: "dinamica" 
- senha: "123"

## 🧪 Suíte de Testes

Foram implementados mais de 20 testes unitários e de integração, além de estrutura para E2E.

### Unitários/Integração (Vitest)

Validação de componentes de UI, Hooks e Stores.

```bash
npm test
```

### E2E (Playwright)

Smoke test validando o fluxo crítico: Login -> Visualização da Grade.

```bash
npm run test:e2e
```

---

## 📂 Organização do Código

```plaintext
src/
├── app/          # Roteamento e layouts (App Router)
├── components/   # Componentes de interface (Cards, Header, Skeletons)
├── hooks/        # Lógica de consumo de API (React Query)
├── middleware.ts # Proteção de rotas
├── services/     # Configurações de chamada fetch/axios
├── store/        # Gerenciamento de estado (Zustand)
└── types/        # Definições de interfaces TypeScript
```

---

## 📺 Demonstração do Fluxo e lightHouse

Print do LightHouse e vídeo demonstrativo com as funcionalidades estão disponíveis na pasta `/public/fluxo.mp4`

