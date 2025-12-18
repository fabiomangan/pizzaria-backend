# 🍕 Pizzaria Backend API

API RESTful para gerenciamento de uma pizzaria, desenvolvida com **Node.js, TypeScript, Express e Prisma**. O projeto cobre autenticação, autorização por perfil (ADMIN/STAFF), cadastro de produtos com upload de imagens, pedidos, itens e categorias, seguindo boas práticas de arquitetura em camadas.

---

## 🚀 Visão Geral

Este backend foi construído para simular um sistema real de pizzaria, com foco em:

* Separação clara de responsabilidades (Controller → Service → Prisma)
* Validação de dados com Zod
* Autenticação JWT
* Autorização por role (ADMIN)
* Upload de imagens com Multer + Cloudinary
* Banco de dados PostgreSQL via Docker

---

## 🧱 Arquitetura

```
Rotas → Middlewares → Controllers → Services → Prisma → PostgreSQL
          ↓               ↓
     Autenticação     Regras de Negócio
     Validação (Zod)
```

* **Controllers**: apenas recebem a requisição e delegam
* **Services**: concentram toda a lógica de negócio
* **Schemas (Zod)**: garantem contratos de entrada
* **Middlewares**: autenticação, autorização e validação

---

## 🛠️ Tecnologias

### Backend

* Node.js
* TypeScript
* Express
* Prisma ORM
* PostgreSQL
* Zod
* JWT
* bcryptjs
* Multer
* Cloudinary

### Infra

* Docker + Docker Compose

---

## 📁 Estrutura de Pastas

```
src/
├── controllers/     # Camada HTTP
├── services/        # Lógica de negócio
├── schemas/         # Validação com Zod
├── middlewares/     # Auth, roles, validações
├── prisma/          # Prisma Client
├── config/          # Cloudinary, Multer, etc
├── routes.ts        # Definição das rotas
└── server.ts        # Bootstrap da aplicação
```

---

## 🔐 Autenticação e Autorização

* Autenticação via **JWT**
* Token enviado no header:

```
Authorization: Bearer <token>
```

* Middleware `isAuthenticated`
* Middleware `isAdmin` para rotas restritas

Roles disponíveis:

* `STAFF`
* `ADMIN`

---

## 📦 Principais Funcionalidades

### 👤 Usuários

* Criar usuário
* Autenticar (login)
* Obter dados do usuário autenticado

### 🗂️ Categorias

* Criar categoria (ADMIN)
* Listar categorias

### 🍕 Produtos

* Criar produto com upload de imagem (ADMIN)
* Listar produtos
* Listar produtos por categoria
* Filtrar produtos desativados

### 🧾 Pedidos

* Criar pedido
* Listar pedidos
* Adicionar item ao pedido
* Remover item do pedido

---

## 🔌 Endpoints (Resumo)

### Usuários

* `POST /users`
* `POST /session`
* `GET /me`

### Categorias

* `POST /category`
* `GET /category`

### Produtos

* `POST /product`
* `GET /products`
* `GET /category/product`

### Pedidos

* `POST /order`
* `GET /orders`
* `POST /order/add`
* `DELETE /order/remove`

---

## 🧪 Validação de Dados

* Todas as entradas são validadas com **Zod**
* Schemas organizados por domínio (`user`, `product`, `order`, etc)
* Middleware `validateSchema` centraliza a validação

Benefícios:

* Menos bugs
* Contratos claros
* Services mais limpos

---

## 🖼️ Upload de Imagens

* Upload feito via **Multer (memoryStorage)**
* Imagens enviadas para o **Cloudinary**
* Apenas imagens JPG/JPEG/PNG
* Limite de 4MB

---

## 🐳 Docker

Suba o banco de dados com:

```bash
docker-compose up -d
```

Serviços:

* PostgreSQL (porta 5432)
* Adminer (porta 8080)

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env`:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/pizzaria
JWT_SECRET=sua_chave_secreta
PORT=3333
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_APY_KEY=xxx
CLOUDINARY_APY_SECRET=xxx
```

---

## ▶️ Executando o Projeto

```bash
# Instalar dependências
npm install

# Rodar migrations
npx prisma migrate dev

# Iniciar servidor
npm run dev
```

Servidor disponível em:

```
http://localhost:3333
```

---

## ✅ Boas Práticas Aplicadas

* Arquitetura em camadas
* Tipagem forte com TypeScript
* Validação centralizada
* Services sem dependência do Express
* Regras de negócio bem definidas
* Commit semântico

---

## 📌 Próximos Passos (Ideias)

* Finalizar pedido (checkout)
* Calcular total automaticamente
* Atualizar quantidade do item
* Paginação
* Testes automatizados (Jest)
* Swagger / OpenAPI

---

## 👨‍💻 Autor

**Fábio Mangan**
Desenvolvedor Full Stack Júnior

* GitHub: [https://github.com/fabiomangan](https://github.com/fabiomangan)
* LinkedIn: [https://www.linkedin.com/in/fabiomangan/](https://www.linkedin.com/in/fabiomangan/)

---

⭐ Se este projeto te ajudou de alguma forma, deixe uma estrela no repositório!
