# Kanastra Spotify (Frontend)

Projeto React + TypeScript que simula busca e visualização de artistas (e álbuns) usando mocks da API do Spotify, com Material UI, React Query e Tailwind.

## 1. Instalar dependências

Use Yarn (recomendado):

```
yarn install
```

Ou, se preferir npm:

```
npm install
```

## 2. Configurar variáveis de ambiente

Edite o arquivo `.env` na raiz do projeto e preencha (ou ajuste) as chaves:

```
SPOTIFY_API_TOKEN=SEU_TOKEN_AQUI
SPOTIFY_CLIENT_SECRET=SUA_SECRET_AQUI
```

Mesmo que os dados atuais estejam mockados, manter essas chaves facilita uma futura integração real.

(Não coloque aspas nas variáveis.)

## 3. Rodar o projeto em desenvolvimento

```
yarn start
```

Ou:

```
npm run start
```

A aplicação deve abrir em: http://localhost:3000

## 4. Scripts úteis

- `yarn build` – Gera build de produção.
- `yarn lint` – Executa ESLint.
- `yarn format` – Aplica Prettier.

## 5. Estrutura rápida

- `src/shared/services` – Serviços.
- `src/shared/queries` – Hooks com React Query.
- `src/shared/contexts` – Contexto .
- `src/pages` – Páginas.
- `src/shared/components` – Componentes reutilizáveis.
