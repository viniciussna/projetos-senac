const Pokemon = require('../models/Pokemon');

// GET /api/pokemons
exports.listPokemons = async (req, res) => {
  try {
    const pokemons = await Pokemon.find().sort({ createdAt: -1 });
    res.json(pokemons);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar Pokémons.', error: err.message });
  }
};

// GET /api/pokemons/:id
exports.getPokemonById = async (req, res) => {
  try {
    const pokemon = await Pokemon.findById(req.params.id);
    if (!pokemon) return res.status(404).json({ message: 'Pokémon não encontrado.' });
    res.json(pokemon);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar Pokémon.', error: err.message });
  }
};

// POST /api/pokemons
exports.createPokemon = async (req, res) => {
  try {
    const { pokeId, name, types, sprite, imgOfficial, hp, attack, defense, speed, weight, height, rating } = req.body;

    if (!pokeId || !name || !types || !rating) {
      return res.status(400).json({ message: 'pokeId, nome, tipos e classificação são obrigatórios.' });
    }

    // Evita duplicata: mesmo pokémon não pode estar duas vezes na coleção
    const existe = await Pokemon.findOne({ pokeId });
    if (existe) {
      // Atualiza a classificação se já existir
      existe.rating = rating;
      await existe.save();
      return res.status(200).json(existe);
    }

    const pokemon = await Pokemon.create({
      pokeId, name, types, sprite, imgOfficial,
      hp, attack, defense, speed, weight, height, rating
    });
    res.status(201).json(pokemon);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao salvar Pokémon.', error: err.message });
  }
};

// PUT /api/pokemons/:id — mover entre categorias
exports.updatePokemon = async (req, res) => {
  try {
    const pokemon = await Pokemon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!pokemon) return res.status(404).json({ message: 'Pokémon não encontrado.' });
    res.json(pokemon);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar Pokémon.', error: err.message });
  }
};

// DELETE /api/pokemons/:id
exports.deletePokemon = async (req, res) => {
  try {
    const pokemon = await Pokemon.findByIdAndDelete(req.params.id);
    if (!pokemon) return res.status(404).json({ message: 'Pokémon não encontrado.' });
    res.json({ message: 'Pokémon removido com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao remover Pokémon.', error: err.message });
  }
};
