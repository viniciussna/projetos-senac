const API = '/api/pokemons';

let todosPokemons = [];
let filtroAtual   = 'all';
let emEdicao      = null;

const typeColors = {
  fire:'#f08030', water:'#6890f0', grass:'#78c850',
  electric:'#f8d030', psychic:'#f85888', ice:'#98d8d8',
  dragon:'#7038f8', dark:'#705848', fairy:'#ee99ac',
  normal:'#a8a878', fighting:'#c03028', flying:'#a890f0',
  poison:'#a040a0', ground:'#e0c068', rock:'#b8a038',
  bug:'#a8b820', ghost:'#705898', steel:'#b8b8d0'
};

const ratingLabel = {
  deixa_escapar: '❌',
  pokedex:       '🔵',
  time_favorito: '⭐'
};

// ── Carregar ─────────────────────────────────────
async function loadPokemons() {
  document.getElementById('grid').innerHTML = '<p class="grid-empty">Carregando...</p>';
  try {
    const res  = await fetch(API);
    todosPokemons = await res.json();
    renderGrid();
  } catch {
    document.getElementById('grid').innerHTML = '<p class="grid-empty erro">Erro ao carregar.</p>';
  }
}

// ── Renderizar grid ──────────────────────────────
function renderGrid() {
  const lista = filtroAtual === 'all'
    ? todosPokemons
    : todosPokemons.filter(p => p.rating === filtroAtual);

  const grid = document.getElementById('grid');

  if (!lista.length) {
    grid.innerHTML = '<p class="grid-empty">Nenhum Pokémon aqui ainda.</p>';
    return;
  }

  grid.innerHTML = lista.map(p => {
    const color = typeColors[p.types[0]] || '#888';
    const img   = p.sprite || p.imgOfficial || '';
    return `
      <div class="poke-card" onclick="abrirModal('${p._id}')">
        <div class="poke-card-badge">${ratingLabel[p.rating]}</div>
        <div class="poke-card-circle" style="background:${color};"></div>
        ${img ? `<img class="poke-card-img" src="${img}" alt="${p.name}" loading="lazy">` : '<div class="poke-card-img poke-no-img">?</div>'}
        <p class="poke-card-name">${p.name}</p>
        <p class="poke-card-id">#${String(p.pokeId).padStart(3,'0')}</p>
        <div class="poke-card-types">
          ${p.types.map(t => `<span class="type-badge type-${t}">${t}</span>`).join('')}
        </div>
      </div>`;
  }).join('');
}

// ── Abas ─────────────────────────────────────────
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    filtroAtual = tab.dataset.rating;
    renderGrid();
  });
});

// ── Modal ─────────────────────────────────────────
window.abrirModal = function(id) {
  const p = todosPokemons.find(x => x._id === id);
  if (!p) return;
  emEdicao = p;

  document.getElementById('modal-img').src  = p.imgOfficial || p.sprite || '';
  document.getElementById('modal-img').alt  = p.name;
  document.getElementById('modal-name').textContent = p.name;
  document.getElementById('modal-id').textContent   = `#${String(p.pokeId).padStart(3,'0')} · ${ratingLabel[p.rating]} ${p.rating.replace(/_/g,' ')}`;
  document.getElementById('modal-types').innerHTML  =
    p.types.map(t => `<span class="type-badge type-${t}">${t}</span>`).join('');

  // destaca botão atual
  document.querySelectorAll('.modal-ratings .rate-btn').forEach(btn => btn.classList.remove('ativo'));
  const map = { deixa_escapar: 0, pokedex: 1, time_favorito: 2 };
  const btns = document.querySelectorAll('.modal-ratings .rate-btn');
  if (btns[map[p.rating]]) btns[map[p.rating]].classList.add('ativo');

  document.getElementById('modal').classList.remove('hidden');
};

window.fecharModal = function() {
  document.getElementById('modal').classList.add('hidden');
  emEdicao = null;
};

document.getElementById('modal').addEventListener('click', e => {
  if (e.target === document.getElementById('modal')) fecharModal();
});

// ── Mover (PUT) ───────────────────────────────────
window.moverPara = async function(novoRating) {
  if (!emEdicao) return;
  try {
    const res = await fetch(`${API}/${emEdicao._id}`, {
      method:  'PUT',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ rating: novoRating })
    });
    if (!res.ok) throw new Error();
    fecharModal();
    await loadPokemons();
  } catch {
    alert('Erro ao mover Pokémon.');
  }
};

// ── Excluir (DELETE) ──────────────────────────────
window.excluir = async function() {
  if (!emEdicao) return;
  if (!confirm(`Remover ${emEdicao.name} da coleção?`)) return;
  try {
    const res = await fetch(`${API}/${emEdicao._id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error();
    fecharModal();
    await loadPokemons();
  } catch {
    alert('Erro ao remover Pokémon.');
  }
};

// ── Init ──────────────────────────────────────────
document.getElementById('btn-reload').addEventListener('click', loadPokemons);

loadPokemons();
