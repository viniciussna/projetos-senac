const express = require('express');
const router  = express.Router();
const c       = require('../controllers/pokemonController');

router.get('/',      c.listPokemons);
router.get('/:id',   c.getPokemonById);
router.post('/',     c.createPokemon);
router.put('/:id',   c.updatePokemon);
router.delete('/:id',c.deletePokemon);

module.exports = router;
