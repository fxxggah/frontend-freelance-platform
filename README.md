# 💻 Freelance Platform — Frontend

Frontend da plataforma de freelancers desenvolvida como projeto de TCC, inspirado em plataformas como Upwork e Workana.

A aplicação permite que usuários se registrem como **Freelancers** ou **Employers**, visualizem vagas, publiquem jobs e gerenciem candidaturas através de uma interface moderna construída com Next.js.

---

# 🚀 Tecnologias Utilizadas

## Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Shadcn/UI
- Lucide React
- React Hook Form
- Zod
- Next Themes

---

# 🧠 Objetivo do Projeto

O objetivo da aplicação é simular uma plataforma real de freelancers, demonstrando conhecimentos em:

- arquitetura frontend moderna
- componentização
- consumo de API REST
- autenticação JWT
- gerenciamento de estado
- responsividade
- integração Full Stack
- boas práticas com React e Next.js

---

# 🏗️ Funcionalidades

## 🔐 Autenticação

- Login de usuários
- Registro de conta
- Persistência de autenticação
- Integração com JWT
- Controle de sessão

---

## 👨‍💼 Employer

- Criar vagas
- Visualizar vagas criadas
- Gerenciar candidaturas
- Alterar status das vagas

---

## 👨‍💻 Freelancer

- Visualizar jobs abertos
- Se candidatar para vagas
- Gerenciar candidaturas enviadas
- Visualizar detalhes de jobs

---

## 🌗 Interface

- Tema claro/escuro
- Layout responsivo
- Componentes reutilizáveis
- Feedback visual com toast
- Navegação moderna

---

# 📁 Estrutura do Projeto

```bash
app/
├── dashboard/
├── jobs/
│   ├── all/
│   ├── applications/
│   └── create/
├── login/
├── register/
├── my/
├── profile/
└── layout.tsx

components/
├── job-card.tsx
├── navbar.tsx
└── theme-provider.tsx

hooks/
├── use-mobile.ts
└── use-toast.ts

lib/
├── api.ts
├── auth.ts
├── jobs.ts
├── users.ts
└── applications.ts
```

---

# ⚙️ Integração com Backend

Este frontend consome uma API REST desenvolvida em:

- Java
- Spring Boot
- Spring Security
- JWT Authentication
- MySQL

---

# 🔗 Principais Recursos Consumidos da API

## Auth

- Login
- Registro
- Autenticação JWT

## Jobs

- Listagem de vagas
- Criação de jobs
- Detalhes de vagas
- Atualização de status

## Applications

- Candidaturas
- Listagem de aplicações
- Alteração de status
- Cancelamento

## Users

- Perfil de usuários
- Listagem de freelancers

---

# 🖥️ Instalação

## 1. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

---

## 2. Entre na pasta do projeto

```bash
cd frontend-freelance-platform
```

---

## 3. Instale as dependências

```bash
npm install
```

---

## 4. Execute o projeto

```bash
npm run dev
```

---

# 🌐 Aplicação

O projeto será iniciado em:

```bash
http://localhost:3000
```

---

# 📦 Scripts Disponíveis

## Rodar ambiente de desenvolvimento

```bash
npm run dev
```

## Build de produção

```bash
npm run build
```

## Rodar produção

```bash
npm run start
```

## Lint

```bash
npm run lint
```

---

# 🎨 UI e Componentização

O projeto utiliza:

- Shadcn/UI
- Tailwind CSS
- Radix UI
- Componentes reutilizáveis
- Arquitetura modular

---

# 🔒 Autenticação

A autenticação da aplicação é baseada em JWT.

O token é armazenado no frontend e enviado nas requisições protegidas da API através do header:

```http
Authorization: Bearer TOKEN
```

---

# 📱 Responsividade

A interface foi desenvolvida com foco em:

- Desktop
- Tablet
- Mobile

---

# 📚 Aprendizados Demonstrados

Este projeto demonstra conhecimentos em:

- React moderno
- Next.js App Router
- TypeScript
- Consumo de APIs REST
- Arquitetura frontend
- Organização de código
- Integração Full Stack
- Componentização
- Gerenciamento de autenticação
- UX/UI moderna

---

# 🚧 Status do Projeto

🚀 Em desenvolvimento

Novas funcionalidades e melhorias serão adicionadas futuramente.

---

# 📄 Licença

Este projeto está sob a licença MIT.

---
