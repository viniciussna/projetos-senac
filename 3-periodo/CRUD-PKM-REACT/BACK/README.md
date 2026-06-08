
# Pokémon Card App - Backend

API REST desenvolvida com Node.js e Express para gerenciamento da coleção de Pokémon do aplicativo.

## Funcionalidades

- Listar Pokémon cadastrados
- Adicionar novos Pokémon
- Atualizar classificação dos Pokémon
- Remover Pokémon da coleção

## Tecnologias Utilizadas

- Node.js
- Express
- Cors

## Estrutura do Projeto

```text
BACK/
├── server.js
├── package.json
└── package-lock.json
```

## Instalação

### 1. Entrar na pasta do backend

```bash
cd BACK
```

### 2. Instalar dependências

```bash
npm install
```

## Executando o Servidor

```bash
node server.js
```

Servidor disponível em:

```text
http://localhost:3000
```

ou

```text
http://SEU_IP:3000
```

## Rotas Disponíveis

### Listar Pokémon

```http
GET /api/pokemons
```

### Cadastrar Pokémon

```http
POST /api/pokemons
```

Exemplo de Body:

```json
{
  "name": "pikachu",
  "pokeId": 25,
  "rating": "time_favorito"
}
```

### Atualizar Pokémon

```http
PUT /api/pokemons/:id
```

Exemplo de Body:

```json
{
  "rating": "pokedex"
}
```

### Excluir Pokémon

```http
DELETE /api/pokemons/:id
```

## Armazenamento de Dados

Atualmente os dados são armazenados em memória utilizando um array local.

Exemplo:

```js
let pokemons = [];
```

Isso significa que:

- Não existe banco de dados persistente.
- Ao reiniciar o servidor, os dados são perdidos.
- A implementação foi criada para fins acadêmicos e demonstração das operações CRUD.

## Arquitetura

```text
Frontend (React Native)
        │
        ▼
      Axios
        │
        ▼
API REST (Node + Express)
        │
        ▼
Armazenamento em Memória
```

## Objetivo Acadêmico

Projeto desenvolvido para demonstrar:

- Operações CRUD completas;
- Integração com API externa (PokeAPI);
- Comunicação entre Frontend e Backend;
- Desenvolvimento Mobile com React Native;
- Desenvolvimento de APIs REST com Node.js e Express.
