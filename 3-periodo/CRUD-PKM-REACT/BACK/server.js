const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Banco de dados temporário na memória do PC
let pokemons = [];

// [R] LISTAR - Rota para o app listar os pokémons
app.get('/api/pokemons', (req, res) => {
  console.log('📋 O app pediu a lista de pokémons!');
  res.json(pokemons);
});

// [C] CADASTRAR - Rota para o app salvar um pokémon
app.post('/api/pokemons', (req, res) => {
  console.log('➕ O app enviou um novo pokémon:', req.body);
  // Garante que o ID vire string para não dar erro de tipo depois
  const novoPokemon = { id: Date.now().toString(), ...req.body };
  pokemons.push(novoPokemon);
  res.status(201).json(novoPokemon);
});

// [U] EDITAR - Rota para atualizar o rating do pokémon pelo ID
app.put('/api/pokemons/:id', (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;
  console.log(`✏️ Tentando editar o pokémon com ID: ${id}`);

  const pokemon = pokemons.find(p => String(p.id) === String(id));

  if (pokemon) {
    pokemon.rating = rating;
    console.log(`✅ Pokémon ${pokemon.name} atualizado com sucesso!`);
    return res.json(pokemon);
  }

  console.log(`❌ Pokémon com ID ${id} não foi encontrado.`);
  res.status(404).send({ message: 'Pokémon não encontrado' });
});

// [D] EXCLUIR - Rota para deletar um pokémon pelo ID
app.delete('/api/pokemons/:id', (req, res) => {
  const { id } = req.params;
  console.log(`🗑️ Tentando excluir o pokémon com ID: ${id}`);

  const index = pokemons.findIndex(p => String(p.id) === String(id));

  if (index !== -1) {
    const removido = pokemons.splice(index, 1);
    console.log(`✅ Pokémon ${removido[0].name} removido com sucesso!`);
    return res.send({ message: 'Removido com sucesso' });
  }

  console.log(`❌ Não foi possível excluir: ID ${id} não encontrado.`);
  res.status(404).send({ message: 'Pokémon não encontrado' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor Backend rodando em http://192.168.100.86:${PORT}`);
});
