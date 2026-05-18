# CardPokémon 🎴

Aplicativo mobile desenvolvido com **React Native + Expo** que sorteia Pokémons aleatórios e exibe um card com suas informações, tipagem e estatísticas de batalha.

---

## 📱 Demonstração

Ao tocar no botão **"Sortear Pokémon"**, o app busca um Pokémon aleatório na [PokéAPI](https://pokeapi.co/) e exibe um card dinâmico com:

- Nome e número da Pokédex
- Artwork oficial
- Badges de tipo (com cor específica por tipo)
- Peso e altura
- Barras de status: HP, ATK, DEF e VEL

A borda do card muda de cor de acordo com o tipo primário do Pokémon sorteado.

---

## 🚀 Tecnologias

| Tecnologia | Versão |
|---|---|
| React Native | 0.83.6 |
| Expo | ~55.0.24 |
| React | 19.2.0 |
| react-native-web | ^0.21.0 |
| @react-native-async-storage/async-storage | 2.2.0 |

**API utilizada:** [PokéAPI](https://pokeapi.co/) — gratuita e sem autenticação.

---

## ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/) (LTS recomendado)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Aplicativo **Expo Go** no celular (iOS ou Android) — ou um emulador configurado

---

## 🔧 Instalação e execução

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/PKM-react-native.git
cd PKM-react-native/meu-app

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

Com o servidor rodando, escaneie o QR Code exibido no terminal com o aplicativo **Expo Go** para abrir o app no seu dispositivo.

### Scripts disponíveis

```bash
npm start          # Inicia o Expo (QR Code para Expo Go)
npm run android    # Abre no emulador Android
npm run ios        # Abre no simulador iOS (macOS necessário)
npm run web        # Abre no navegador
```

---

## 🗂️ Estrutura do projeto

```
meu-app/
├── App.js           # Componente principal — toda a lógica e UI
├── index.js         # Ponto de entrada do app
├── app.json         # Configurações do Expo (ícone, splash, orientação)
├── package.json     # Dependências e scripts
└── assets/          # Ícones e imagens do app
```

---

## 🎨 Tipos e cores

O app mapeia os 18 tipos de Pokémon para cores visuais:

| Tipo | Cor | Tipo | Cor |
|---|---|---|---|
| Fire | `#f08030` | Water | `#6890f0` |
| Grass | `#78c850` | Electric | `#f8d030` |
| Psychic | `#f85888` | Ice | `#98d8d8` |
| Dragon | `#7038f8` | Dark | `#705848` |
| Fairy | `#ee99ac` | Normal | `#a8a878` |
| ... | ... | ... | ... |

---

## 📡 Como funciona

1. O usuário toca em **"Sortear Pokémon"**
2. O app gera um ID aleatório entre 1 e 898
3. Faz uma requisição para `https://pokeapi.co/api/v2/pokemon/{id}`
4. Extrai nome, tipos, artwork oficial, peso, altura e stats
5. Renderiza o card com a cor do tipo primário

---

## 📋 Observações

- O pool de sorteio abrange os **898 Pokémons** das gerações 1 a 8.
- É necessária conexão com a internet para buscar os dados na PokéAPI.
- O app exibe um alerta caso a requisição falhe.
- Compatível com iOS, Android e Web (via react-native-web).

---

## 📚 Referências

- [Documentação Expo v55](https://docs.expo.dev/versions/v55.0.0/)
- [PokéAPI](https://pokeapi.co/)
- [React Native Docs](https://reactnative.dev/)
