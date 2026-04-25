# CardPokemon CRUD

Sorteie Pokémons aleatórios pela PokéAPI, classifique-os em três categorias e veja sua coleção em grade.

## Fluxo

1. **index.html** → landing page com dois botões
2. **sorteio.html** → sorteia um Pokémon → você escolhe: ❌ Deixa escapar / 🔵 Pokédex / ⭐ Time favorito → salva no backend
3. **colecao.html** → grade de cards com filtro por categoria → clique num card para mover ou excluir

## Estrutura

```
cardpokemon-crud/
├── backend/
│   ├── src/
│   │   ├── controllers/pokemonController.js
│   │   ├── models/Pokemon.js
│   │   └── routes/pokemonRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── frontend/
    ├── index.html
    ├── sorteio.html + sorteio.js
    ├── colecao.html + colecao.js
    ├── style.css
    ├── manifest.json
    ├── service-worker.js
    ├── icon-192.png
    └── icon-512.png
```

## Como rodar

```bash
cd backend
cp .env.example .env
# edite o .env com sua MONGO_URI do Atlas
npm install
npm start
```

Acesse: **http://localhost:3000**

## Rotas da API

| Método | Rota               | Descrição                        |
|--------|--------------------|----------------------------------|
| GET    | /api/pokemons      | Listar todos                     |
| GET    | /api/pokemons/:id  | Buscar por ID                    |
| POST   | /api/pokemons      | Salvar Pokémon com classificação |
| PUT    | /api/pokemons/:id  | Atualizar (mover de categoria)   |
| DELETE | /api/pokemons/:id  | Remover                          |

## Campos do model Pokemon

| Campo       | Tipo     | Obrigatório | Valores de rating                              |
|-------------|----------|-------------|------------------------------------------------|
| pokeId      | Number   | sim         | —                                              |
| name        | String   | sim         | —                                              |
| types       | [String] | sim         | —                                              |
| sprite      | String   | não         | —                                              |
| imgOfficial | String   | não         | —                                              |
| hp          | Number   | não         | —                                              |
| attack      | Number   | não         | —                                              |
| defense     | Number   | não         | —                                              |
| speed       | Number   | não         | —                                              |
| weight      | Number   | não         | —                                              |
| height      | Number   | não         | —                                              |
| rating      | String   | sim         | `deixa_escapar`, `pokedex`, `time_favorito`    |
