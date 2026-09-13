# Ficha Clínica de Emergência

Projeto desenvolvido para a Disciplina Integradora de Desenvolvimento de Projetos (PUCRS Online).

A ideia é permitir que um trabalhador cadastre suas informações de saúde (tipo sanguíneo, alergias, medicamentos, doenças, cirurgias e contato de emergência) e gere um código QR para colar no crachá. Em caso de acidente, um colega ou socorrista escaneia o QR, digita a senha impressa ao lado do código e consegue ver a ficha.

Protótipo das telas no Figma: https://www.figma.com/design/1fLHVziCJPTC2dbsRh5Vgu/projeto-disciplina-integratoria

## Tecnologias

**Frontend**
- React com Vite
- Tailwind CSS
- React Router
- Axios

**Backend**
- Node.js com Express
- MongoDB Atlas com Mongoose
- JSON Web Token (JWT) para autenticação
- Bcrypt para hash das senhas
- uuid para gerar o código do link público
- cors e dotenv


## Como rodar o projeto

É preciso ter o Node.js instalado e uma conta no MongoDB Atlas (ou um MongoDB local).

### Backend

1. Entre na pasta do backend e instale as dependências:

   ```
   cd backend
   npm install
   ```

2. Crie um arquivo `.env` copiando o `.env.example` e preencha os valores:

   ```
   PORT=3003
   MONGO_URI=sua_string_de_conexao_do_mongodb
   JWT_SECRET=uma_chave_secreta
   ```

3. Inicie a API:

   ```
   npm run dev
   ```

   A API sobe em `http://localhost:3003`.

### Frontend

1. Em outro terminal, entre na pasta do frontend e instale as dependências:

   ```
   cd frontend/fichaclinica
   npm install
   ```

2. Inicie a aplicação:

   ```
   npm run dev
   ```

   O Vite abre em `http://localhost:5173`.

## Rotas da API

| Método | Rota                | Descrição                                   | Autenticação |
|--------|---------------------|---------------------------------------------|--------------|
| POST   | /usuarios           | Cria uma conta com e-mail e senha            | não          |
| POST   | /login              | Faz login e devolve o token JWT              | não          |
| GET    | /perfil             | Retorna a ficha do usuário logado            | sim          |
| PUT    | /perfil             | Atualiza os dados da ficha                   | sim          |
| DELETE | /perfil             | Apaga o registro completo                    | sim          |
| GET    | /publico/:codigo    | Consulta pública da ficha pelo código do QR  | não          |

Nas rotas autenticadas, o token deve ser enviado no header `Authorization: Bearer <token>`.

