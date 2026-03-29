# 🃏 CardPokemon

Aplicação web **PWA** responsiva desenvolvida com HTML, CSS e JavaScript que consome dados da **PokéAPI** e exibe cartas animadas de Pokémon com design moderno e foco em mobile.

## 🚀 Deploy

A aplicação está disponível online através do Netlify:

🔗 __https://cardpokemon-coding-mobile.netlify.app/__

## 📌 Objetivo da Atividade

Desenvolver um aplicativo web que:

* Consuma dados de uma API pública
* Exiba as informações de forma dinâmica e visualmente atraente
* Seja responsivo com prioridade mobile
* Funcione como **PWA** (Progressive Web App), podendo ser instalado na tela inicial
* Utilize recursos de **hardware do dispositivo**
* Seja publicado online

## 🛠️ Tecnologias Utilizadas

* HTML5 – Estrutura da aplicação
* CSS3 – Estilização, animações e responsividade
* JavaScript (Vanilla) – Consumo da API, lógica e acesso ao hardware
* Netlify – Deploy da aplicação

## 🌐 API Utilizada

A aplicação consome dados da **PokéAPI** https://pokeapi.co/

A API fornece informações sobre Pokémon como:

* Nome e ID
* Imagem oficial
* Tipo(s)
* Peso e altura
* Estatísticas base (HP, Ataque, Defesa, Velocidade)

## 📱 Responsividade

O layout foi desenvolvido com prioridade **Mobile First**, garantindo boa experiência em:

* Smartphones 📱
* Tablets 📲
* Desktop 💻

## 📲 PWA (Progressive Web App)

O projeto foi transformado em um PWA completo, permitindo:

* Instalação na **tela inicial** do celular como um app nativo
* Funcionamento **offline** graças ao Service Worker com cache inteligente
* **Splash screen** animada ao abrir o app
* Ícones e tema personalizados

## 📳 Recursos de Hardware

| Recurso | API Web | Uso no App |
|---|---|---|
| **Vibração** | `navigator.vibrate()` | Feedback ao sortear um Pokémon |
| **Acelerômetro** | `DeviceMotionEvent` | Agite o celular para sortear automaticamente |

## 📂 Arquivos do Projeto

O projeto completo com os arquivos utilizados na aplicação está disponível no arquivo compactado abaixo:

📦 CardPokemon.zip

Dentro deste arquivo estão incluídos:

* `index.html` – Estrutura da aplicação
* `style.css` – Estilização e responsividade
* `script.js` – Lógica da aplicação, consumo da API e acesso ao hardware
* `service-worker.js` – Cache e funcionamento offline
* `manifest.json` – Configuração do PWA
* `icon-192.png` – Ícone do app (192×192)
* `icon-512.png` – Ícone do app (512×512)

## ▶️ Como executar o projeto localmente

1. Baixe o arquivo `CardPokemon.zip`
2. Extraia os arquivos
3. Abra a pasta no **VS Code**
4. Instale a extensão **Live Server** (caso ainda não tenha)
5. Clique com o botão direito no `index.html` e selecione **"Open with Live Server"**
6. O projeto abrirá automaticamente no navegador em `http://localhost:5500`

> ⚠️ O Service Worker exige HTTPS ou `localhost` para funcionar. Não abra o `index.html` direto pelo explorador de arquivos.

