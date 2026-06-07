const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Banco de dados temporário em memória
let pokemons = [];

// Rota para listar os pokemons (GET)
app.get('/api/pokemons', (req, res) => {
  console.log('Frontend pediu a lista de pokémons!');
  res.json(pokemons);
});

// Rota para criar um novo pokémon (POST)
app.post('/api/pokemons', (req, res) => {
  console.log('Frontend enviou um novo pokémon:', req.body);
  const novoPokemon = { id: Date.now().toString(), ...req.body };
  pokemons.push(novoPokemon);
  res.status(201).json(novoPokemon);
});

// Rota para deletar (DELETE)
app.delete('/api/pokemons/:id', (req, res) => {
  const { id } = req.params;
  pokemons = pokemons.filter(p => p.id !== id);
  res.send({ message: 'Removido com sucesso' });
});

app.listen(PORT, () => {
  console.log(` Servidor Backend rodando com sucesso na porta ${PORT}!`);
});