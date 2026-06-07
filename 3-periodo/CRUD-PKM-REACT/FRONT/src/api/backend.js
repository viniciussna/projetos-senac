import axios from 'axios';

// ================================================================
// ⚠️  CONFIGURE O IP AQUI ANTES DE RODAR
// ================================================================
//
//  EMULADOR ANDROID (padrão):
//    http://10.0.2.2:3000
//
//  CELULAR FÍSICO (Android ou iOS):
//    Descubra o IP da sua máquina:
//      - Windows: abra o cmd e rode "ipconfig" → IPv4
//      - Mac/Linux: rode "ifconfig" → en0/eth0
//    Exemplo: http://192.168.1.105:3000
//
//  iOS SIMULATOR:
//    http://localhost:3000
//
// ================================================================
const BASE_URL = 'http://192.168.100.86:3000';
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('[Backend Error]', err?.response?.status, err?.message, err?.config?.url);
    return Promise.reject(err);
  }
);

export const getPokemons    = ()          => api.get('/api/pokemons');
export const getPokemonById = (id)        => api.get(`/api/pokemons/${id}`);
export const createPokemon  = (data)      => api.post('/api/pokemons', data);
export const updatePokemon  = (id, data)  => api.put(`/api/pokemons/${id}`, data);
export const deletePokemon  = (id)        => api.delete(`/api/pokemons/${id}`);

export default api;