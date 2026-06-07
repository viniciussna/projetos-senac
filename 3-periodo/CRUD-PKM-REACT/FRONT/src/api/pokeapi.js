import axios from 'axios';

const pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10000,
});

export const fetchPokemonByName = async (name) => {
  const normalized = name.trim().toLowerCase();
  const { data } = await pokeApi.get(`/pokemon/${normalized}`);

  const hp = data.stats.find((s) => s.stat.name === 'hp')?.base_stat ?? 0;
  const attack = data.stats.find((s) => s.stat.name === 'attack')?.base_stat ?? 0;
  const defense = data.stats.find((s) => s.stat.name === 'defense')?.base_stat ?? 0;
  const speed = data.stats.find((s) => s.stat.name === 'speed')?.base_stat ?? 0;

  return {
    pokeId: data.id,
    name: data.name,
    types: data.types.map((t) => t.type.name),
    sprite: data.sprites.front_default ?? '',
    imgOfficial:
      data.sprites.other?.['official-artwork']?.front_default ??
      data.sprites.front_default ??
      '',
    hp,
    attack,
    defense,
    speed,
    weight: data.weight,
    height: data.height,
  };
};
