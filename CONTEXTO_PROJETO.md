# Documento de Contexto do Projeto - Backend Pizzaria

## 📋 Índice
1. [Arquitetura](#arquitetura)
2. [Organização de Pastas](#organização-de-pastas)
3. [Tecnologias e Versões](#tecnologias-e-versões)
4. [Modelagem do Banco de Dados](#modelagem-do-banco-de-dados)
5. [Endpoints](#endpoints)
6. [Validação de Schemas](#validação-de-schemas)
7. [Middlewares](#middlewares)
8. [Configurações](#configurações)

---

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas com separação clara de responsabilidades:

**Fluxo de Requisição:**
```
Rotas → Controller → Service → Banco de Dados (Prisma)
         ↓            ↓
    Validação    Lógica de Negócio
    Middlewares  Comunicação com BD
```

### Descrição das Camadas:

1. **Rotas (`routes.ts`)**: Define os endpoints da API e aplica middlewares necessários
2. **Controller**: Recebe a requisição HTTP, extrai dados do body/params/query e chama o Service apropriado
3. **Service**: Contém toda a lógica de negócio, validações de regra de negócio e comunicação com o banco de dados através do Prisma
4. **Banco de Dados**: PostgreSQL gerenciado pelo Prisma ORM

---

## 📁 Organização de Pastas

```
backend/
├── prisma/
│   ├── migrations/          # Migrações do banco de dados
│   └── schema.prisma        # Schema do Prisma (modelagem)
├── src/
│   ├── @types/              # Definições de tipos TypeScript
│   │   └── express/
│   │       └── index.d.ts   # Extensão do tipo Request do Express
│   ├── config/              # Arquivos de configuração
│   ├── controllers/         # Controllers (camada de controle)
│   │   ├── category/
│   │   │   ├── CreateCategoryController.ts
│   │   │   └── ListCategoryController.ts
│   │   ├── product/
│   │   │   ├── CreateProductController.ts
│   │   │   └── ListProductController.ts
│   │   └── user/
│   │       ├── AuthUserController.ts
│   │       ├── CreateUserController.ts
│   │       └── DeatailUserController.ts
│   ├── generated/           # Arquivos gerados pelo Prisma
│   │   └── prisma/
│   ├── middlewares/         # Middlewares da aplicação
│   │   ├── isAdmin.ts
│   │   ├── isAuthenticated.ts
│   │   └── validateSchema.ts
│   ├── prisma/              # Configuração do Prisma Client
│   │   └── index.ts
│   ├── routes.ts            # Definição de todas as rotas
│   ├── schemas/             # Schemas de validação (Zod)
│   │   ├── categorySchema.ts
│   │   ├── productSchema.ts
│   │   └── userSchema.ts
│   ├── services/            # Services (lógica de negócio)
│   │   ├── category/
│   │   │   ├── CreateCategoryService.ts
│   │   │   └── ListCategoryService.ts
│   │   ├── product/
│   │   │   ├── CreateProductService.ts
│   │   │   └── ListProductService.ts
│   │   └── user/
│   │       ├── AuthUserService.ts
│   │       ├── CreateUserService.ts
│   │       └── DetailUserService.ts
│   └── server.ts            # Arquivo principal do servidor
├── docker-compose.yml       # Configuração Docker
├── package.json
├── tsconfig.json
└── prisma.config.ts
```

---

## 🛠️ Tecnologias e Versões

### Dependencies (Produção)
- **express**: `^5.2.1` - Framework web para Node.js
- **@prisma/client**: `^7.1.0` - Cliente Prisma ORM
- **@prisma/adapter-pg**: `^7.1.0` - Adaptador PostgreSQL para Prisma
- **pg**: `^8.16.3` - Cliente PostgreSQL
- **bcryptjs**: `^3.0.3` - Biblioteca para hash de senhas
- **jsonwebtoken**: `^9.0.3` - Geração e validação de tokens JWT
- **zod**: `^4.1.13` - Biblioteca de validação de schemas
- **cors**: `^2.8.5` - Middleware para habilitar CORS
- **dotenv**: `^17.2.3` - Gerenciamento de variáveis de ambiente
- **tsx**: `^4.21.0` - Executor TypeScript para desenvolvimento
- **multer**: `^2.0.2` - Middleware para upload de arquivos
- **cloudinary**: `^2.8.0` - Serviço de armazenamento em nuvem para imagens

### DevDependencies (Desenvolvimento)
- **typescript**: `^5.9.3` - Linguagem TypeScript
- **prisma**: `^7.1.0` - CLI do Prisma
- **@types/express**: `^5.0.6` - Tipos TypeScript para Express
- **@types/node**: `^24.10.3` - Tipos TypeScript para Node.js
- **@types/cors**: `^2.8.19` - Tipos TypeScript para CORS
- **@types/jsonwebtoken**: `^9.0.10` - Tipos TypeScript para JWT
- **@types/pg**: `^8.16.0` - Tipos TypeScript para PostgreSQL
- **@types/multer**: `^2.0.0` - Tipos TypeScript para Multer

### Banco de Dados
- **PostgreSQL**: Versão 15 (via Docker)

---

## 🗄️ Modelagem do Banco de Dados

### Enum

#### Role
```prisma
enum Role {
  STAFF    // Funcionário padrão
  ADMIN    // Administrador
}
```

### Models

#### User (users)
```prisma
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String
  role      Role     @default(STAFF)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}
```

**Campos:**
- `id`: UUID gerado automaticamente
- `name`: Nome do usuário
- `email`: Email único do usuário
- `password`: Senha criptografada (bcrypt)
- `role`: Papel do usuário (STAFF ou ADMIN), padrão: STAFF
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização

#### Category (categories)
```prisma
model Category {
  id        String   @id @default(uuid())
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  products  Product[]

  @@map("categories")
}
```

**Campos:**
- `id`: UUID gerado automaticamente
- `name`: Nome da categoria
- `products`: Relação um-para-muitos com Product
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização

#### Product (products)
```prisma
model Product {
  id          String   @id @default(uuid())
  name        String
  price       Int
  description String
  banner      String
  disabled    Boolean  @default(false)

  items       Item[]

  category_id String
  category    Category @relation(fields: [category_id], references: [id], onDelete: Cascade)

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("products")
}
```

**Campos:**
- `id`: UUID gerado automaticamente
- `name`: Nome do produto
- `price`: Preço em centavos (Int)
- `description`: Descrição do produto
- `banner`: URL da imagem do produto
- `disabled`: Status de disponibilidade (padrão: false)
- `category_id`: ID da categoria (foreign key)
- `category`: Relação muitos-para-um com Category (onDelete: Cascade)
- `items`: Relação um-para-muitos com Item
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização

#### Order (orders)
```prisma
model Order {
  id        String   @id @default(uuid())
  table     Int
  status    Boolean  @default(false)  // false = pendente, true = pronto
  draft     Boolean  @default(true)    // false = rascunho, true = foi para cozinha
  name      String?

  items     Item[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("orders")
}
```

**Campos:**
- `id`: UUID gerado automaticamente
- `table`: Número da mesa
- `status`: Status do pedido (false = pendente, true = pronto)
- `draft`: Se é rascunho (false = rascunho, true = enviado para cozinha)
- `name`: Nome do cliente (opcional)
- `items`: Relação um-para-muitos com Item
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização

#### Item (items)
```prisma
model Item {
  id         String   @id @default(uuid())
  amount     Int
  createdAt  DateTime @default(now())
  updatedAt DateTime @updatedAt

  order_id   String
  order      Order @relation(fields: [order_id], references: [id], onDelete: Cascade)

  product_id String
  product    Product @relation(fields: [product_id], references: [id], onDelete: Cascade)

  @@map("items")
}
```

**Campos:**
- `id`: UUID gerado automaticamente
- `amount`: Quantidade do item
- `order_id`: ID do pedido (foreign key)
- `order`: Relação muitos-para-um com Order (onDelete: Cascade)
- `product_id`: ID do produto (foreign key)
- `product`: Relação muitos-para-um com Product (onDelete: Cascade)
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização

### Relacionamentos

- **Category → Product**: Um-para-muitos (uma categoria tem muitos produtos)
- **Product → Item**: Um-para-muitos (um produto pode estar em muitos itens)
- **Order → Item**: Um-para-muitos (um pedido tem muitos itens)

---

## 🔌 Endpoints

### Base URL
```
http://localhost:3333
```

### Rotas de Usuário

#### POST `/users`
Cria um novo usuário.

**Middleware:** `validateSchema(createUserSchema)`

**Body:**
```json
{
  "name": "string (min: 3 caracteres)",
  "email": "string (email válido)",
  "password": "string (min: 6 caracteres)"
}
```

**Response:** Objeto do usuário criado (sem senha)

---

#### POST `/session`
Autentica um usuário e retorna um token JWT.

**Middleware:** `validateSchema(authUserSchema)`

**Body:**
```json
{
  "email": "string (email válido)",
  "password": "string"
}
```

**Response:** Token JWT e informações do usuário

---

#### GET `/me`
Retorna os dados do usuário autenticado.

**Middleware:** `isAuthenticated`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** Objeto do usuário autenticado

---

### Rotas de Categoria

#### POST `/category`
Cria uma nova categoria.

**Middlewares:** `isAuthenticated`, `isAdmin`, `validateSchema(createCategorySchema)`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "name": "string (min: 2 caracteres)"
}
```

**Response:** Objeto da categoria criada

---

#### GET `/category`
Lista todas as categorias.

**Middleware:** `isAuthenticated`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** Array de objetos de categorias

---

### Rotas de Produto

#### POST `/product`
Cria um novo produto com upload de imagem.

**Middlewares:** `isAuthenticated`, `isAdmin`, `upload.single('file')`, `validateSchema(createProductSchema)`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Body (FormData):**
- `name`: string (obrigatório) - Nome do produto
- `price`: string (obrigatório) - Preço do produto em centavos
- `description`: string (obrigatório) - Descrição do produto
- `category_id`: string (obrigatório) - ID da categoria
- `file`: file (obrigatório) - Imagem do banner do produto

**Response:** Objeto do produto criado com URL da imagem

---

#### GET `/products`
Lista produtos cadastrados, com filtro por `disabled` via query param.

**Middleware:** `isAuthenticated`, `validateSchema(listProductSchema)`

**Query params:**
- `disabled`: `true` | `false` (opcional, padrão `false`)

**Exemplo:** `/products?disabled=false` — retorna produtos com `disabled: false`.

**Response:** Array de objetos de produto (inclui `category` com `id` e `name`)

---

## ✅ Validação de Schemas

O projeto utiliza **Zod** para validação de dados de entrada. Os schemas são definidos na pasta `src/schemas/` e aplicados através do middleware `validateSchema`.

### Estrutura dos Schemas

Todos os schemas seguem o padrão:
```typescript
z.object({
  body: z.object({
    // campos do body
  })
})
```

### Schemas Disponíveis

#### `createUserSchema` (`src/schemas/userSchema.ts`)
Validação para criação de usuário:
- `name`: String com mínimo de 3 caracteres
- `email`: Email válido
- `password`: String com mínimo de 6 caracteres

#### `authUserSchema` (`src/schemas/userSchema.ts`)
Validação para autenticação:
- `email`: Email válido
- `password`: String obrigatória

#### `createCategorySchema` (`src/schemas/categorySchema.ts`)
Validação para criação de categoria:
- `name`: String com mínimo de 2 caracteres

#### `listProductSchema` (`src/schemas/productSchema.ts`)
Validação para listagem de produtos (query params):
- `disabled`: `"true"` | `"false"` (opcional, padrão: `"false"`)

### Middleware de Validação

O middleware `validateSchema` valida:
- `body`: Corpo da requisição
- `query`: Parâmetros de query string
- `params`: Parâmetros de rota

Em caso de erro, retorna status `400` com detalhes dos erros de validação.

---

## 🛡️ Middlewares

### `validateSchema`
**Arquivo:** `src/middlewares/validateSchema.ts`

Valida os dados da requisição usando schemas Zod.

**Uso:**
```typescript
router.post("/endpoint", validateSchema(schema), controller.handle);
```

**Comportamento:**
- Valida `body`, `query` e `params`
- Retorna `400` com detalhes se houver erro de validação
- Retorna `500` em caso de erro interno

---

### `isAuthenticated`
**Arquivo:** `src/middlewares/isAuthenticated.ts`

Verifica se o usuário está autenticado através do token JWT.

**Uso:**
```typescript
router.get("/endpoint", isAuthenticated, controller.handle);
```

**Comportamento:**
- Extrai o token do header `Authorization` (formato: `Bearer <token>`)
- Valida o token usando `JWT_SECRET`
- Adiciona `user_id` ao objeto `req` (via extensão de tipos)
- Retorna `401` se token não fornecido ou inválido

**Extensão de Tipo:**
```typescript
// src/@types/express/index.d.ts
declare namespace Express {
  export interface Request {
    user_id: string;
  }
}
```

---

### `isAdmin`
**Arquivo:** `src/middlewares/isAdmin.ts`

Verifica se o usuário autenticado possui permissão de administrador.

**Uso:**
```typescript
router.post("/endpoint", isAuthenticated, isAdmin, controller.handle);
```

**Comportamento:**
- Requer que `isAuthenticated` seja executado antes
- Busca o usuário no banco de dados usando `req.user_id`
- Verifica se `user.role === "ADMIN"`
- Retorna `401` se usuário não encontrado
- Retorna `403` se usuário não é admin

---

## ⚙️ Configurações

### TypeScript (`tsconfig.json`)
- **Target**: ES2020
- **Module**: CommonJS
- **Strict Mode**: Habilitado
- **Source Maps**: Habilitado
- **Root Dir**: `./src`
- **Out Dir**: `./dist`

### Prisma (`prisma/schema.prisma`)
- **Provider**: PostgreSQL
- **Client Output**: `../src/generated/prisma`
- **Generator**: `prisma-client-js`

### Servidor (`src/server.ts`)
- **Porta**: `3333` (ou `process.env.PORT`)
- **CORS**: Habilitado para todas as origens
- **JSON Parser**: Habilitado
- **Error Handler**: Middleware global para tratamento de erros

### Multer (`src/config/multer.ts`)
Configuração de upload de arquivos:
- **Storage**: Memory Storage (arquivos mantidos em memória)
- **Limite de Tamanho**: 4MB máximo por arquivo
- **Tipos Aceitos**: `image/jpeg`, `image/jpg`, `image/png`
- **Validação**: Retorna erro se formato não permitido

**Uso:**
```typescript
const upload = multer(uploadConfig);
router.post("/product", upload.single('file'), controller.handle);
```

### Cloudinary (`src/config/cloudinary.ts`)
Configuração para armazenamento em nuvem de imagens:
- **Cloud Name**: Variável de ambiente `CLOUDINARY_CLOUD_NAME`
- **API Key**: Variável de ambiente `CLOUDINARY_APY_KEY`
- **API Secret**: Variável de ambiente `CLOUDINARY_APY_SECRET`

**Uso:** Integrado com controllers para fazer upload de imagens para a nuvem após recebimento via Multer

### Docker (`docker-compose.yml`)
- **PostgreSQL**: Porta `5432`
- **Adminer**: Porta `8080` (interface web para gerenciamento do banco)
- **Database**: `pizzaria`
- **User**: `postgres`
- **Password**: `postgres`

### Variáveis de Ambiente Necessárias
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/pizzaria
JWT_SECRET=sua_chave_secreta_jwt
PORT=3333
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_APY_KEY=sua_api_key
CLOUDINARY_APY_SECRET=seu_api_secret
```

---

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento (watch mode)
npm run dev
```

---

## 🔐 Segurança

- Senhas são criptografadas usando `bcryptjs` (8 rounds)
- Autenticação via JWT
- Validação de entrada com Zod
- Middleware de autorização por role (ADMIN)
- Tratamento de erros centralizado

---

## 📌 Observações Importantes

1. O Prisma Client é gerado em `src/generated/prisma` (configuração customizada)
2. O projeto utiliza TypeScript com modo estrito habilitado
3. Todos os IDs são UUIDs gerados automaticamente
4. Relacionamentos com `onDelete: Cascade` garantem integridade referencial
5. O middleware de erro global captura exceções não tratadas e retorna respostas padronizadas

---

**Última atualização:** Dezembro 2025

