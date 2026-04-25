const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema(
  {
    pokeId: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    types: {
      type: [String],
      required: true
    },
    sprite: {
      type: String,
      default: ''
    },
    imgOfficial: {
      type: String,
      default: ''
    },
    hp: { type: Number, default: 0 },
    attack: { type: Number, default: 0 },
    defense: { type: Number, default: 0 },
    speed: { type: Number, default: 0 },
    weight: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    rating: {
      type: String,
      enum: ['deixa_escapar', 'pokedex', 'time_favorito'],
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pokemon', pokemonSchema);
