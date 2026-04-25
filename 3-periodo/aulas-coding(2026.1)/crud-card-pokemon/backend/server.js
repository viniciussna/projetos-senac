require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const path     = require('path');
const mongoose = require('mongoose');
const pokemonRoutes = require('./src/routes/pokemonRoutes');

const app = express();

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cardpokemon')
  .then(() => console.log('MongoDB conectado'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/pokemons', pokemonRoutes);
app.use('/', express.static(path.join(__dirname, '../frontend')));

app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'API funcionando com sucesso.' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
