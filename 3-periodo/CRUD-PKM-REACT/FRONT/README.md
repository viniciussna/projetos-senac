
# Pokémon Card App - Frontend

Aplicativo mobile desenvolvido com React Native e Expo para gerenciamento de uma coleção personalizada de Pokémon.

## Funcionalidades

- Buscar Pokémon utilizando a PokeAPI
- Adicionar Pokémon à coleção
- Classificar Pokémon em categorias:
  - Time Favorito
  - Pokédex
  - Deixa Escapar
- Editar classificação dos Pokémon cadastrados
- Excluir Pokémon da coleção
- Visualizar Pokédex da Geração 1
- Filtrar Pokémon por categoria
- Atualização da lista em tempo real

## Tecnologias Utilizadas

- React Native
- Expo
- React Navigation
- Axios
- Async Storage
- Expo Linear Gradient

## Estrutura do Projeto

```text
src/
├── api/
│   ├── backend.js
│   └── pokeapi.js
├── components/
│   ├── PokemonCard.js
│   └── RatingBadge.js
├── screens/
│   ├── HomeScreen.js
│   ├── AddPokemonScreen.js
│   ├── EditPokemonScreen.js
│   └── PokedexScreen.js
```

## Instalação

### 1. Clonar o projeto

```bash
git clone <repositorio>
```

### 2. Entrar na pasta FRONT

```bash
cd FRONT
```

### 3. Instalar dependências

```bash
npm install
```

### 4. Configurar IP do Backend

No arquivo:

```js
src/api/backend.js
```

Alterar a URL para o IP da máquina que está executando o backend.

Exemplo:

```js
const BASE_URL = 'http://192.168.1.100:3000';
```

## Executando o Projeto

```bash
npx expo start
```

ou

```bash
npm start
```

## Fluxo da Aplicação

1. Usuário busca um Pokémon pelo nome.
2. A aplicação consulta a PokeAPI.
3. Os dados são exibidos na tela.
4. O usuário escolhe uma classificação.
5. O Pokémon é enviado para o Backend.
6. A coleção é exibida na tela inicial.
7. O usuário pode editar ou excluir registros.

## Integrações

### PokeAPI

API utilizada para obter informações dos Pokémon.

https://pokeapi.co

### Backend Local

Responsável pelo armazenamento e gerenciamento da coleção cadastrada pelo usuário.

## Observações

- Os nomes dos Pokémon devem ser informados em inglês.
- O backend deve estar em execução para que o aplicativo funcione corretamente.
- Projeto desenvolvido para fins acadêmicos, demonstrando integração entre React Native, API externa e API própria.
