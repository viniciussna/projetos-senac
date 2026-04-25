const API_POKE    = 'https://pokeapi.co/api/v2/pokemon/';
const API_BACKEND = '/api/pokemons';

const btn          = document.getElementById('btnDraw');
const card         = document.getElementById('pokemon-card');
const statsBar     = document.getElementById('stats-bar');
const ratingBtns   = document.getElementById('rating-buttons');
const msg          = document.getElementById('msg');

let pokemonAtual = null;

// ── Type colors ─────────────────────────────────
const typeColors = {
  fire:'#f08030', water:'#6890f0', grass:'#78c850',
  electric:'#f8d030', psychic:'#f85888', ice:'#98d8d8',
  dragon:'#7038f8', dark:'#705848', fairy:'#ee99ac',
  normal:'#a8a878', fighting:'#c03028', flying:'#a890f0',
  poison:'#a040a0', ground:'#e0c068', rock:'#b8a038',
  bug:'#a8b820', ghost:'#705898', steel:'#b8b8d0'
};

// ── Sortear ──────────────────────────────────────
async function sortear() {
  btn.disabled = true;
  card.className = 'card loading';
  card.innerHTML = '<div class="card-inner"></div>';
  statsBar.classList.add('hidden');
  ratingBtns.classList.add('hidden');
  msg.textContent = '';
  pokemonAtual = null;

  try {
    const id       = Math.floor(Math.random() * 898) + 1;
    const response = await fetch(`${API_POKE}${id}`);
    if (!response.ok) throw new Error('API error');
    const data = await response.json();

    const types      = data.types.map(t => t.type.name);
    const hp         = data.stats.find(s => s.stat.name === 'hp')?.base_stat || 0;
    const attack     = data.stats.find(s => s.stat.name === 'attack')?.base_stat || 0;
    const defense    = data.stats.find(s => s.stat.name === 'defense')?.base_stat || 0;
    const speed      = data.stats.find(s => s.stat.name === 'speed')?.base_stat || 0;
    const sprite     = data.sprites.front_default || '';
    const imgOfficial= data.sprites.other?.['official-artwork']?.front_default || sprite;

    pokemonAtual = {
      pokeId: data.id,
      name:   data.name,
      types,
      sprite,
      imgOfficial,
      hp, attack, defense, speed,
      weight: data.weight,
      height: data.height
    };

    renderCard(data, types, imgOfficial);
    renderStats(hp, attack, defense, speed);
    if ('vibrate' in navigator) navigator.vibrate([50, 30, 80]);

    ratingBtns.classList.remove('hidden');
  } catch (err) {
    card.className = 'card card-empty';
    card.innerHTML = `<div class="card-inner"><div class="empty-state"><p>Erro ao carregar.<br>Tente novamente!</p></div></div>`;
  } finally {
    btn.disabled = false;
  }
}

// ── Render Card ──────────────────────────────────
function renderCard(data, types, img) {
  const name   = data.name;
  const id     = String(data.id).padStart(3, '0');
  const type1  = types[0];
  const color1 = typeColors[type1] || '#888';
  const peso   = (data.weight / 10).toFixed(1) + ' kg';
  const altura = (data.height / 10).toFixed(1) + ' m';

  card.className = 'card';
  card.innerHTML = `
    <div class="card-inner" style="background:linear-gradient(160deg,#1a1a1a 0%,#0d0d0d 100%);">
      <div class="card-lines"></div>
      <div class="card-content">
        <div class="card-header">
          <span class="pokemon-name">${name}</span>
          <span class="pokemon-id">#${id}</span>
        </div>
        <div class="card-image-area">
          <div class="card-bg-circle" style="background:${color1};"></div>
          <img class="pokemon-img" src="${img}" alt="${name}" loading="lazy">
        </div>
        <div class="card-footer">
          <div class="card-detail">
            <span class="card-detail-label">Tipo</span>
            <div style="display:flex;gap:4px;margin-top:2px;">
              ${types.map(t => `<span class="type-badge type-${t}">${t}</span>`).join('')}
            </div>
          </div>
          <div class="card-detail">
            <span class="card-detail-label">Peso</span>
            <span class="card-detail-value">${peso}</span>
          </div>
          <div class="card-detail">
            <span class="card-detail-label">Altura</span>
            <span class="card-detail-value">${altura}</span>
          </div>
        </div>
      </div>
      <div class="card-holo"></div>
    </div>`;

  requestAnimationFrame(() => {
    card.classList.add('flip');
    setTimeout(() => card.classList.remove('flip'), 700);
  });
}

// ── Render Stats ─────────────────────────────────
function renderStats(hp, atk, def, spd) {
  const max = 255;
  const set = (valId, fillId, val) => {
    document.getElementById(valId).textContent = val;
    setTimeout(() => {
      document.getElementById(fillId).style.width = `${(val / max) * 100}%`;
    }, 100);
  };
  ['fill-hp','fill-atk','fill-def','fill-spd'].forEach(id => {
    document.getElementById(id).style.width = '0%';
  });
  statsBar.classList.remove('hidden');
  set('val-hp',  'fill-hp',  hp);
  set('val-atk', 'fill-atk', atk);
  set('val-def', 'fill-def', def);
  set('val-spd', 'fill-spd', spd);
}

// ── Salvar ───────────────────────────────────────
window.salvar = async function(rating) {
  if (!pokemonAtual) return;

  const labels = {
    deixa_escapar:  '❌ Deixa escapar',
    pokedex:        '🔵 Pokédex',
    time_favorito:  '⭐ Time favorito'
  };

  try {
    const res = await fetch(API_BACKEND, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ ...pokemonAtual, rating })
    });

    if (!res.ok) {
      const err = await res.json();
      msg.textContent = 'Erro: ' + (err.message || 'não foi possível salvar.');
      msg.className = 'msg-salvo erro';
      return;
    }

    msg.textContent = `Salvo como "${labels[rating]}"! Sorteie outro ou veja sua coleção.`;
    msg.className = 'msg-salvo ok';
    pokemonAtual = null;
    ratingBtns.classList.add('hidden');
  } catch {
    msg.textContent = 'Erro de conexão com o servidor.';
    msg.className = 'msg-salvo erro';
  }
};

// ── Shake ────────────────────────────────────────
let lastX, lastY, lastZ, lastShake = 0;
function handleMotion(e) {
  const acc = e.accelerationIncludingGravity;
  if (!acc) return;
  const { x, y, z } = acc;
  if (lastX === undefined) { lastX = x; lastY = y; lastZ = z; return; }
  const delta = Math.abs(x - lastX) + Math.abs(y - lastY) + Math.abs(z - lastZ);
  lastX = x; lastY = y; lastZ = z;
  const now = Date.now();
  if (delta > 25 && now - lastShake > 1500) { lastShake = now; if (!btn.disabled) sortear(); }
}

if ('DeviceMotionEvent' in window) {
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    btn.addEventListener('click', async () => {
      try {
        if (await DeviceMotionEvent.requestPermission() === 'granted')
          window.addEventListener('devicemotion', handleMotion);
      } catch {}
    }, { once: true });
  } else {
    window.addEventListener('devicemotion', handleMotion);
  }
} else {
  const hint = document.getElementById('shake-hint');
  if (hint) hint.style.display = 'none';
}

btn.addEventListener('click', sortear);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));
}
