const API_URL = 'http://localhost:8080/api/movies';
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80';
const categories = ['Ação', 'Comédia', 'Terror', 'Ficção científica', 'Drama', 'Romance', 'Animação', 'Suspense', 'Aventura'];
const seriesCatalog = [
  { id: 'tv-1', type: 'series', title: 'The Last of Us', year: '2023', rating: 8.6, genre: 'Drama · Ficção científica', seasons: 2, episodes: 16, posterUrl: 'https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg', backdropUrl: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1400&q=85', source: 'https://myembed.biz/serie/tt22084616', description: 'Vinte anos após o colapso da civilização, um sobrevivente endurecido recebe a missão de atravessar os Estados Unidos ao lado de uma jovem que pode mudar tudo.' },
  { id: 'tv-2', type: 'series', title: 'Ruptura', year: '2022', rating: 8.7, genre: 'Suspense · Ficção científica', seasons: 2, episodes: 19, posterUrl: 'https://image.tmdb.org/t/p/w500/pPHpeI2X1qEd1CS1SeyrdhZ4qnT.jpg', backdropUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85', source: 'https://myembed.biz/serie/tt22084616', description: 'Uma experiência radical separa as lembranças de trabalho e vida pessoal de funcionários de uma empresa enigmática.' },
  { id: 'tv-3', type: 'series', title: 'Fallout', year: '2024', rating: 8.3, genre: 'Aventura · Ficção científica', seasons: 2, episodes: 16, posterUrl: 'https://image.tmdb.org/t/p/w500/AnsSKR9LuK0T9bAOcP1ShMHiRjF.jpg', backdropUrl: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1400&q=85', source: 'https://myembed.biz/serie/tt22084616', description: 'Dois séculos após o apocalipse, a vida confortável de moradores de abrigos subterrâneos é interrompida quando eles precisam conhecer o mundo da superfície.' },
  { id: 'tv-4', type: 'series', title: 'Arcane', year: '2021', rating: 9.0, genre: 'Animação · Ação', seasons: 2, episodes: 18, posterUrl: 'https://image.tmdb.org/t/p/w500/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg', backdropUrl: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1400&q=85', source: 'https://myembed.biz/serie/tt22084616', description: 'Em meio à tensão entre duas cidades, duas irmãs acabam em lados opostos de um conflito que pode mudar o futuro de todos.' },
  { id: 'tv-5', type: 'series', title: 'O Urso', year: '2022', rating: 8.2, genre: 'Drama · Comédia', seasons: 4, episodes: 38, posterUrl: 'https://image.tmdb.org/t/p/w500/sHFlbKS3WLqMnp9t2ghADIJFnuQ.jpg', backdropUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1400&q=85', source: 'https://myembed.biz/serie/tt22084616', description: 'Um jovem chef retorna a Chicago para comandar a lanchonete da família, enfrentando uma cozinha caótica e relações complicadas.' },
  { id: 'tv-6', type: 'series', title: 'Andor', year: '2022', rating: 8.4, genre: 'Ação · Aventura', seasons: 2, episodes: 24, posterUrl: 'https://image.tmdb.org/t/p/w500/khZqmwHQicTYoS7Flreb9EddFZC.jpg', backdropUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1400&q=85', source: 'https://myembed.biz/serie/tt22084616', description: 'A jornada de Cassian Andor revela como um homem comum se transforma em um dos heróis da rebelião.' }
];
const navItems = [
  ['home', 'Início', 'home'], ['explore', 'Explorar', 'compass'], ['movies', 'Filmes', 'film'],
  ['series', 'Séries', 'clapper'], ['watchlist', 'Minha lista', 'bookmark'], ['history', 'Histórico', 'clock']
];
const iconPaths = {
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8z"/>',
  film: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4m-4 6h4m10-6h4m-4 6h4"/>',
  clapper: '<path d="M4 4h16l2 5H2zM2 9h20v11H2zM8 4 5 9m9-5-3 5m9-5-3 5"/>',
  bookmark: '<path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18l-6-4-6 4z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  play: '<path d="m8 5 12 7-12 7z"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  back: '<path d="m15 18-6-6 6-6"/>',
  close: '<path d="m18 6-12 12M6 6l12 12"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.7 10.7 6.6-4.4m-6.6 9.4 6.6 2.6"/>',
  sliders: '<path d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M2 14h4m4-6h4m4 8h4"/>',
  star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z"/>',
  sparkle: '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l1 2.5 2.5 1-2.5 1L19 23l-1-2.5-2.5-1 2.5-1z"/>',
  logout: '<path d="M10 17l5-5-5-5m5 5H3m9-9h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7"/>'
};

const icon = (name, className = '') => `<svg class="icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.film}</svg>`;
const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const readStore = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};
const state = {
  route: 'home', movies: [], loading: true, loadError: false, query: '', genre: '',
  saved: readStore('rogerio-list', []), history: readStore('rogerio-history', []),
  listFilter: 'Todos', searchFilters: { type: 'Todos', year: 'Todos', rating: 'Todas', genre: 'Todos' },
  detail: null, season: 1, toastTimer: null
};

const app = document.querySelector('#app');

function header() {
  return `<aside class="sidebar" aria-label="Navegação principal">
    <a class="brand" href="#home" aria-label="Rogério, início"><span class="brand-mark">r</span><span>rogério<span class="brand-period">.</span></span></a>
    <p class="nav-label">MENU</p>
    <nav class="side-nav">${navItems.map(([route, label, glyph]) => `<a class="nav-link ${state.route === route ? 'active' : ''}" href="#${route}">${icon(glyph)}<span>${label}</span>${route === 'watchlist' && state.saved.length ? `<small>${state.saved.length}</small>` : ''}</a>`).join('')}</nav>
    <div class="sidebar-bottom"><div class="plan-note"><span class="plan-symbol">${icon('sparkle')}</span><strong>Seu próximo favorito está por aqui.</strong><span>Um bom filme muda qualquer noite.</span><a href="#explore">Explorar catálogo ${icon('arrow')}</a></div><button class="user-mini" type="button" data-action="profile"> <span class="user-avatar">D</span><span><strong>Diego</strong><small>Plano pessoal</small></span>${icon('logout', 'user-menu-icon')}</button></div>
  </aside>
  <div class="app-column"><header class="topbar"><div class="breadcrumb"><span>Descubra</span><span class="breadcrumb-divider">/</span><strong>${escapeHtml(pageTitle())}</strong></div>
    <form class="global-search" data-search-form role="search">${icon('search')}<input name="q" type="search" value="${escapeHtml(state.query)}" placeholder="Filmes, séries, diretores..." aria-label="Pesquisar filmes e séries"><kbd>↵</kbd></form>
    <div class="top-actions"><button class="icon-button notification-button" type="button" data-action="notifications" aria-label="Notificações">${icon('bell')}<span class="notification-dot"></span></button><button class="header-avatar" type="button" data-action="profile" aria-label="Abrir perfil de Diego">D</button></div>
  </header><main id="app-view" tabindex="-1"></main><footer class="site-footer"><a class="footer-brand" href="#home">rogério<span>.</span></a><span>Um lugar para encontrar o que vale a pena assistir.</span><span>Feito para boas histórias.</span></footer></div>
  <nav class="mobile-nav" aria-label="Navegação móvel">${[['home', 'Início', 'home'], ['explore', 'Explorar', 'compass'], ['search', 'Buscar', 'search'], ['watchlist', 'Minha lista', 'bookmark'], ['profile', 'Perfil', 'user']].map(([route, label, glyph]) => `<a class="mobile-nav-link ${state.route === route || (route === 'profile' && state.route === 'profile') ? 'active' : ''}" href="#${route === 'search' ? 'explore' : route}" ${route === 'search' ? 'data-mobile-search' : ''}>${icon(glyph)}<span>${label}</span></a>`).join('')}</nav>
  <div class="toast" role="status" aria-live="polite"></div>`;
}

function pageTitle() {
  if (state.route === 'detail') return 'Detalhes';
  return ({ home: 'Início', explore: 'Explorar', movies: 'Filmes', series: 'Séries', watchlist: 'Minha lista', history: 'Histórico', profile: 'Seu perfil' })[state.route] || 'Início';
}

function image(item, large = false) {
  const src = item.posterUrl || FALLBACK_IMAGE;
  return `<img src="${escapeHtml(src)}" alt="Pôster de ${escapeHtml(item.title)}" loading="lazy" data-fallback="${FALLBACK_IMAGE}">`;
}

function movieKey(item) { return `${item.type || 'movie'}:${item.id}`; }
function isSaved(item) { return state.saved.includes(movieKey(item)); }
function stars(item) { return Number(item.rating ?? item.voteAverage ?? 0).toFixed(1); }
function year(item) { return String(item.year || item.releaseDate || '').slice(0, 4) || '—'; }
function allContent() { return [...state.movies.map((movie) => ({ ...movie, type: 'movie', rating: movie.voteAverage })), ...seriesCatalog]; }
function findItem(type, id) { return allContent().find((item) => item.type === type && String(item.id) === String(id)); }

function posterCard(item, options = {}) {
  const typeLabel = item.type === 'series' ? 'Série' : 'Filme';
  return `<article class="poster-card ${options.ranked ? 'ranked-card' : ''}" data-title="${escapeHtml(item.title.toLowerCase())}">
    <button class="poster-open" type="button" data-action="detail" data-type="${item.type}" data-id="${escapeHtml(item.id)}" aria-label="Ver detalhes de ${escapeHtml(item.title)}">${options.ranked ? `<span class="rank-number">${options.ranked}</span>` : ''}${image(item)}<span class="poster-hover"><span>${icon('play')} Ver detalhes</span></span></button>
    <button class="save-button ${isSaved(item) ? 'saved' : ''}" type="button" data-action="save" data-type="${item.type}" data-id="${escapeHtml(item.id)}" aria-label="${isSaved(item) ? 'Remover da' : 'Adicionar à'} minha lista" title="${isSaved(item) ? 'Remover da minha lista' : 'Adicionar à minha lista'}">${icon(isSaved(item) ? 'check' : 'plus')}</button>
    <div class="poster-info"><div class="poster-title-line"><h3>${escapeHtml(item.title)}</h3><span class="rating">${icon('star')} ${stars(item)}</span></div><p>${year(item)} <span>·</span> ${escapeHtml(item.genre || typeLabel)}</p></div>
  </article>`;
}

function sectionHeading(kicker, title, href, action = 'Ver tudo') {
  return `<div class="section-heading"><div><p class="section-kicker">${kicker}</p><h2>${title}</h2></div>${href ? `<a class="text-link" href="#${href}">${action} ${icon('arrow')}</a>` : ''}</div>`;
}

function emptyState(glyph, title, copy, action = '') {
  return `<div class="empty-state"><span class="empty-icon">${icon(glyph)}</span><h3>${title}</h3><p>${copy}</p>${action ? `<a class="button button-secondary" href="#explore">Explorar catálogo ${icon('arrow')}</a>` : ''}</div>`;
}

function skeletons(count = 6) {
  return `<div class="poster-grid skeleton-grid">${Array.from({ length: count }, () => '<div class="skeleton-card"><div class="skeleton-poster"></div><div class="skeleton-line"></div><div class="skeleton-line short"></div></div>').join('')}</div>`;
}

function renderHome() {
  const featured = state.movies[0];
  const backdrop = 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=2200&q=90';
  const continueItems = state.movies.slice(0, 3).map((item, index) => ({ ...item, progress: [62, 34, 81][index], episode: ['Você parou há 2 dias', 'Uma descoberta recente', 'Retome de onde parou'][index] }));
  const recs = state.movies.slice(3, 9);
  return `<section class="hero" style="--hero-image:url('${backdrop}')"><div class="hero-grain"></div><div class="hero-copy"><span class="hero-eyebrow"><i></i> A ESCOLHA DE HOJE <span class="hero-eyebrow-line"></span></span><h1>${featured ? escapeHtml(featured.title) : 'Sua próxima<br>grande história.'}</h1><div class="hero-meta"><span class="hero-rating">${icon('star')} ${featured ? stars(featured) : '9,2'}</span><span>${featured ? year(featured) : '2025'}</span><span class="meta-tag">Destaque</span><span>Filme</span></div><p>${featured ? 'Uma história que merece ser vista na tela grande. Descubra por que este título está entre os mais comentados da semana.' : 'Encontre histórias que ficam com você. Explore novidades, favoritos e aquela surpresa que faltava na sua noite.'}</p><div class="hero-actions"><button class="button button-primary" type="button" data-action="watch-featured" ${featured ? '' : 'disabled'}>${icon('play')} Assistir agora</button><button class="button button-secondary" type="button" data-action="featured-detail" ${featured ? '' : 'disabled'}>${icon('film')} Mais informações</button><button class="hero-save" type="button" data-action="save-featured" aria-label="Adicionar destaque à minha lista">${icon('plus')}</button></div></div><div class="hero-credit"><span>ROGÉRIO ORIGINALS</span><span>HISTÓRIAS QUE FICAM</span></div><div class="hero-pagination"><span class="active"></span><span></span><span></span></div></section>
    <div class="home-content"><section class="content-section continue-section">${sectionHeading('VOLTAR À HISTÓRIA', 'Continue assistindo', 'history')}<div class="continue-grid">${continueItems.length ? continueItems.map(continueCard).join('') : `<div class="quiet-empty">${icon('play')}<span>Seus títulos em andamento aparecem aqui.</span></div>`}</div></section>
    <section class="content-section">${sectionHeading('O QUE ESTÁ EM ALTA', 'Mais assistidos agora', 'movies')}<div class="poster-rail">${state.loading ? skeletons(5) : state.loadError ? loadErrorState() : state.movies.slice(0, 8).map((item, index) => posterCard({ ...item, type: 'movie', rating: item.voteAverage }, { ranked: index + 1 })).join('')}</div></section>
    <section class="content-section recommendation-section">${sectionHeading('SELEÇÃO PARA VOCÊ', 'Filmes que valem a noite', 'movies')}<div class="poster-grid">${state.loading ? skeletons(6) : state.loadError ? loadErrorState() : (recs.length ? recs : state.movies.slice(0, 6)).map((item) => posterCard({ ...item, type: 'movie', rating: item.voteAverage })).join('')}</div></section>
    <section class="content-section series-feature-section">${sectionHeading('SÉRIES PARA MARATONAR', 'Histórias em episódios', 'series')}<div class="series-grid">${seriesCatalog.slice(0, 3).map((item, index) => seriesFeature(item, index)).join('')}</div></section>
    <section class="content-section category-section">${sectionHeading('ESCOLHA SEU CLIMA', 'Explore por gênero', 'explore')}<div class="category-grid">${categories.map((category, index) => `<a class="category-chip category-${index % 5}" href="#explore" data-genre="${escapeHtml(category)}"><span class="category-index">0${index + 1}</span><span>${category}</span>${icon('arrow')}</a>`).join('')}</div></section></div>`;
}

function continueCard(item) {
  return `<article class="continue-card"><button class="continue-art" type="button" data-action="watch" data-type="movie" data-id="${escapeHtml(item.id)}">${image(item)}<span class="continue-play">${icon('play')}</span><span class="continue-progress"><i style="width:${item.progress}%"></i></span></button><div class="continue-copy"><div><h3>${escapeHtml(item.title)}</h3><p>${item.episode}</p></div><button class="continue-action" type="button" data-action="watch" data-type="movie" data-id="${escapeHtml(item.id)}" aria-label="Continuar ${escapeHtml(item.title)}">${icon('play')}</button></div></article>`;
}

function seriesFeature(item, index) {
  return `<button class="series-feature series-feature-${index + 1}" style="--series-image:url('${escapeHtml(item.backdropUrl)}')" type="button" data-action="detail" data-type="series" data-id="${escapeHtml(item.id)}"><span class="series-feature-content"><span class="series-kicker">SÉRIE EM DESTAQUE</span><strong>${escapeHtml(item.title)}</strong><span>${item.seasons} temporadas <i>·</i> ${item.genre}</span><span class="series-open">Conhecer a série ${icon('arrow')}</span></span></button>`;
}

function loadErrorState() {
  return `<div class="inline-state"><span class="empty-icon">${icon('film')}</span><strong>Não conseguimos carregar o catálogo.</strong><span>Confirme se a API está ativa e tente novamente.</span><button class="text-link" type="button" data-action="retry">Tentar novamente ${icon('arrow')}</button></div>`;
}

function renderCatalogPage(type = 'movie') {
  const items = type === 'series' ? seriesCatalog : state.movies.map((item) => ({ ...item, type: 'movie', rating: item.voteAverage }));
  const title = type === 'series' ? 'Séries para descobrir' : 'Filmes em alta';
  const intro = type === 'series' ? 'Grandes histórias, um episódio de cada vez.' : 'Novas estreias e histórias que todo mundo está assistindo.';
  if (type === 'movie' && state.loading) return pageIntro('CATÁLOGO', title, intro) + skeletons(8);
  if (type === 'movie' && state.loadError) return pageIntro('CATÁLOGO', title, intro) + loadErrorState();
  return `${pageIntro(type === 'series' ? 'NO SEU PRÓXIMO EPISÓDIO' : 'TENDÊNCIAS', title, intro)}<div class="catalog-tools"><span>${items.length} títulos</span><div class="sort-control">${icon('sliders')}<span>Em alta</span></div></div><div class="poster-grid catalog-grid">${items.map((item) => posterCard(item)).join('')}</div>`;
}

function pageIntro(kicker, title, copy) {
  return `<section class="page-intro"><p class="section-kicker">${kicker}</p><h1>${title}</h1><p>${copy}</p></section>`;
}

function renderExplore() {
  const query = state.query.trim().toLocaleLowerCase('pt-BR');
  const filters = state.searchFilters;
  const items = allContent().filter((item) => {
    const queryMatch = !query || item.title.toLocaleLowerCase('pt-BR').includes(query);
    const typeMatch = filters.type === 'Todos' || (filters.type === 'Filmes' ? item.type === 'movie' : filters.type === 'Séries' && item.type === 'series');
    const genreMatch = filters.genre === 'Todos' || (item.genre || '').toLocaleLowerCase('pt-BR').includes(filters.genre.toLocaleLowerCase('pt-BR'));
    const yearMatch = filters.year === 'Todos' || year(item) === filters.year;
    const ratingMatch = filters.rating === 'Todas' || Number(item.rating ?? item.voteAverage) >= Number(filters.rating);
    return queryMatch && typeMatch && genreMatch && yearMatch && ratingMatch;
  });
  return `${pageIntro('ENCONTRE SUA PRÓXIMA HISTÓRIA', 'O que você quer assistir?', 'Busque por título ou descubra algo novo para hoje.')}<form class="search-page-form" data-search-form>${icon('search')}<input name="q" type="search" value="${escapeHtml(state.query)}" placeholder="Busque filmes e séries" aria-label="Buscar no catálogo"><button class="button button-primary" type="submit">Buscar ${icon('arrow')}</button></form>
    <div class="filter-tabs" role="group" aria-label="Tipo de conteúdo">${['Todos', 'Filmes', 'Séries', 'Pessoas'].map((filter) => `<button class="filter-tab ${filters.type === filter ? 'active' : ''}" type="button" data-filter="type" data-value="${filter}">${filter}</button>`).join('')}</div>
    <div class="search-filters"><label>Gênero<select data-select-filter="genre"><option>Todos</option>${categories.map((genre) => `<option ${filters.genre === genre ? 'selected' : ''}>${genre}</option>`).join('')}</select></label><label>Ano<select data-select-filter="year"><option>Todos</option>${[...new Set(allContent().map(year))].filter((value) => value !== '—').sort((a, b) => b - a).map((value) => `<option ${filters.year === value ? 'selected' : ''}>${value}</option>`).join('')}</select></label><label>Avaliação<select data-select-filter="rating"><option>Todas</option><option value="8" ${filters.rating === '8' ? 'selected' : ''}>8+ estrelas</option><option value="7" ${filters.rating === '7' ? 'selected' : ''}>7+ estrelas</option></select></label><label>Idioma<select aria-label="Idioma"><option>Todos os idiomas</option><option>Português</option><option>Inglês</option></select></label></div>
    <div class="results-heading"><h2>${query ? `Resultados para “${escapeHtml(state.query)}”` : 'Em destaque para você'}</h2><span>${items.length} ${items.length === 1 ? 'resultado' : 'resultados'}</span></div>${items.length ? `<div class="poster-grid catalog-grid">${items.map((item) => posterCard(item)).join('')}</div>` : emptyState('search', 'Nada por aqui, ainda.', 'Tente outro título ou ajuste os filtros.')}`;
}

function renderWatchlist() {
  const savedItems = state.saved.map((key) => allContent().find((item) => movieKey(item) === key)).filter(Boolean);
  const filters = ['Todos', 'Filmes', 'Séries', 'Assistir depois', 'Já assistidos'];
  const filtered = savedItems.filter((item) => {
    if (state.listFilter === 'Filmes') return item.type === 'movie';
    if (state.listFilter === 'Séries') return item.type === 'series';
    if (state.listFilter === 'Já assistidos') return state.history.includes(movieKey(item));
    if (state.listFilter === 'Assistir depois') return !state.history.includes(movieKey(item));
    return true;
  });
  return `${pageIntro('GUARDADOS PARA DEPOIS', 'Minha lista', 'Tudo o que você marcou, reunido em um só lugar.')}<div class="filter-tabs list-filters" role="group" aria-label="Filtrar minha lista">${filters.map((filter) => `<button class="filter-tab ${state.listFilter === filter ? 'active' : ''}" type="button" data-list-filter="${filter}">${filter}</button>`).join('')}</div>${filtered.length ? `<div class="poster-grid catalog-grid">${filtered.map((item) => posterCard(item)).join('')}</div>` : emptyState('bookmark', state.saved.length ? 'Nenhum título neste filtro.' : 'Sua lista começa com uma boa história.', state.saved.length ? 'Tente outra categoria para ver seus títulos salvos.' : 'Guarde filmes e séries para encontrar tudo por aqui.', !state.saved.length)}`;
}

function renderHistory() {
  const items = state.history.map((key) => allContent().find((item) => movieKey(item) === key)).filter(Boolean);
  return `${pageIntro('SEU TEMPO, SUAS HISTÓRIAS', 'Histórico', 'Volte aos títulos que você já começou a assistir.')}<div class="history-summary"><span>${icon('clock')}</span><div><strong>${items.length} títulos</strong><small>Seu histórico fica salvo neste dispositivo.</small></div></div>${items.length ? `<div class="poster-grid catalog-grid">${items.map((item) => posterCard(item)).join('')}</div>` : emptyState('clock', 'Sua próxima sessão ainda está por vir.', 'Quando você assistir a um título, ele aparecerá no seu histórico.', true)}`;
}

function renderProfile() {
  const movieCount = state.history.filter((key) => key.startsWith('movie:')).length;
  const seriesCount = state.history.filter((key) => key.startsWith('series:')).length;
  const recent = state.history.map((key) => allContent().find((item) => movieKey(item) === key)).filter(Boolean).slice(0, 4);
  return `${pageIntro('SEU ESPAÇO', 'Perfil', 'Preferências e histórias, do seu jeito.')}<section class="profile-hero"><span class="profile-avatar-large">D</span><div><span class="section-kicker">PLANO PESSOAL</span><h2>Diego</h2><p>Membro desde 2024 <span>·</span> Português (Brasil)</p></div><button class="button button-secondary" type="button" data-action="profile-edit">Editar perfil</button></section>
    <section class="stats-grid"><article class="stat-card"><span>${icon('film')}</span><strong>${movieCount}</strong><small>Filmes assistidos</small></article><article class="stat-card"><span>${icon('clapper')}</span><strong>${seriesCount}</strong><small>Séries acompanhadas</small></article><article class="stat-card"><span>${movieCount * 2 + seriesCount * 5}<small>h</small></strong><small>Tempo assistido</small></article><article class="stat-card"><span>${icon('bookmark')}</span><strong>${state.saved.length}</strong><small>Na minha lista</small></article></section>
    <div class="profile-columns"><section class="settings-panel"><div class="section-heading"><div><p class="section-kicker">SUA EXPERIÊNCIA</p><h2>Preferências</h2></div></div><label class="setting-row"><span><strong>Idioma da interface</strong><small>Escolha como navegar pelo catálogo.</small></span><select><option>Português (Brasil)</option><option>English</option><option>Español</option></select></label><label class="setting-row"><span><strong>Qualidade de reprodução</strong><small>O vídeo se adapta à sua conexão.</small></span><select><option>Automática</option><option>Alta</option><option>Economia de dados</option></select></label><div class="setting-row"><span><strong>Aparência</strong><small>Seu ambiente de cinema.</small></span><div class="appearance-control"><button class="active" type="button" aria-pressed="true">Escuro</button><button type="button" data-action="theme-light" aria-pressed="false">Claro</button></div></div></section><section class="history-panel">${sectionHeading('RECENTES', 'Visto por último', 'history')}${recent.length ? recent.map((item) => `<button class="recent-item" type="button" data-action="detail" data-type="${item.type}" data-id="${item.id}">${image(item)}<span><strong>${escapeHtml(item.title)}</strong><small>${year(item)} · ${item.type === 'series' ? 'Série' : 'Filme'}</small></span>${icon('arrow')}</button>`).join('') : emptyState('clock', 'Sem histórico ainda.', 'Sua atividade aparecerá aqui assim que você assistir a um título.')}</section></div>`;
}

function renderDetail() {
  const item = state.detail;
  if (!item) return renderHome();
  const backdrop = item.backdropUrl || 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=2200&q=90';
  const cast = item.type === 'series' ? ['Bella Ramsey', 'Pedro Pascal', 'Kaitlyn Dever'] : ['Elenco principal', 'Direção original', 'Produção internacional'];
  return `<section class="detail-hero" style="--detail-image:url('${escapeHtml(backdrop)}')"><a class="back-link" href="#${state.previousRoute || 'home'}">${icon('back')} Voltar</a><div class="detail-summary"><div class="detail-poster">${image(item, true)}</div><div class="detail-copy"><span class="hero-eyebrow"><i></i> ${item.type === 'series' ? 'SÉRIE' : 'FILME'} EM DESTAQUE</span><h1>${escapeHtml(item.title)}</h1><p class="original-title">${escapeHtml(item.originalTitle || item.title)}</p><div class="hero-meta"><span class="hero-rating">${icon('star')} ${stars(item)}</span><span>${year(item)}</span><span>${item.type === 'series' ? `${item.seasons} temporadas` : '2h 08min'}</span><span class="meta-tag">16</span><span>${escapeHtml(item.genre || 'Drama')}</span></div><p class="detail-description">${escapeHtml(item.description || 'Uma história envolvente, repleta de encontros inesperados e momentos que ficam com você muito depois dos créditos.')}</p><div class="hero-actions"><button class="button button-primary" data-action="watch" data-type="${item.type}" data-id="${escapeHtml(item.id)}">${icon('play')} Assistir agora</button><button class="button button-secondary" data-action="save" data-type="${item.type}" data-id="${escapeHtml(item.id)}">${icon(isSaved(item) ? 'check' : 'plus')} ${isSaved(item) ? 'Na minha lista' : 'Minha lista'}</button><button class="hero-save" data-action="share" aria-label="Compartilhar título">${icon('share')}</button></div></div></div></section>
    <div class="detail-content"><div class="detail-credits"><div><span>Direção</span><strong>${item.type === 'series' ? 'Craig Mazin' : 'Direção e roteiro'}</strong></div><div><span>Elenco principal</span><strong>${cast.join(' · ')}</strong></div><div><span>Disponibilidade</span><strong>Consulte os players disponíveis</strong></div></div>
    ${item.type === 'series' ? renderEpisodes(item) : `<section class="trailer-feature" style="--trailer-image:url('${escapeHtml(backdrop)}')"><div><span class="section-kicker">POR TRÁS DA HISTÓRIA</span><h2>Entre no universo de ${escapeHtml(item.title)}</h2><p>Uma primeira olhada na história que você está prestes a descobrir.</p><button class="button button-secondary" data-action="trailer" data-title="${escapeHtml(item.title)}">${icon('play')} Assistir ao trailer</button></div><span class="trailer-play">${icon('play')}</span></section>`}
    <section class="content-section similar-section">${sectionHeading('PARA CONTINUAR DESCOBRINDO', 'Você também pode gostar', item.type === 'series' ? 'series' : 'movies') }<div class="poster-grid">${(item.type === 'series' ? seriesCatalog.filter((other) => other.id !== item.id).slice(0, 4) : state.movies.filter((other) => String(other.id) !== String(item.id)).slice(0, 4).map((movie) => ({ ...movie, type: 'movie', rating: movie.voteAverage }))).map((other) => posterCard(other)).join('')}</div></section></div>`;
}

function renderEpisodes(item) {
  const episodeCount = item.episodes / item.seasons;
  return `<section class="episodes-section"><div class="episodes-heading"><div><p class="section-kicker">${item.seasons} TEMPORADAS · ${item.episodes} EPISÓDIOS</p><h2>Todos os episódios</h2></div><label class="season-select">Temporada<select data-season>${Array.from({ length: item.seasons }, (_, index) => `<option value="${index + 1}" ${state.season === index + 1 ? 'selected' : ''}>${index + 1}</option>`).join('')}</select></label></div><div class="episode-list">${Array.from({ length: Math.min(episodeCount, 5) }, (_, index) => `<article class="episode-card"><span class="episode-number">${String(index + 1).padStart(2, '0')}</span><div class="episode-thumb" style="--episode-image:url('${escapeHtml(item.backdropUrl)}')"><span>${icon('play')}</span></div><div class="episode-copy"><h3>${['Quando você está perdido na escuridão', 'Infectados', 'Por muito tempo', 'Por favor, segure minha mão', 'Resistir e sobreviver'][index]}</h3><span>Temporada ${state.season} · Episódio ${index + 1} <i>·</i> ${45 + index * 4} min</span><p>Uma nova etapa transforma tudo o que os personagens acreditavam saber sobre o caminho à frente.</p><div class="episode-progress"><i style="width:${index === 0 ? 68 : 0}%"></i></div></div><button class="episode-watch" type="button" data-action="watch" data-type="series" data-id="${escapeHtml(item.id)}" aria-label="Assistir episódio ${index + 1}">${icon('play')}</button></article>`).join('')}</div></section>`;
}

function render() {
  app.innerHTML = header();
  const view = document.querySelector('#app-view');
  if (state.route === 'detail') view.innerHTML = renderDetail();
  else if (state.route === 'explore') view.innerHTML = renderExplore();
  else if (state.route === 'movies') view.innerHTML = renderCatalogPage('movie');
  else if (state.route === 'series') view.innerHTML = renderCatalogPage('series');
  else if (state.route === 'watchlist') view.innerHTML = renderWatchlist();
  else if (state.route === 'history') view.innerHTML = renderHistory();
  else if (state.route === 'profile') view.innerHTML = renderProfile();
  else view.innerHTML = renderHome();
}

function showToast(message) {
  const toast = document.querySelector('.toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('visible');
  window.clearTimeout(state.toastTimer);
  state.toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 2700);
}

function setRoute(route) {
  state.route = route;
  state.detail = null;
  if (window.location.hash !== `#${route}`) window.location.hash = route;
  else render();
}

function openDetail(type, id) {
  const item = findItem(type, id);
  if (!item) return showToast('Este título não está disponível no catálogo agora.');
  state.previousRoute = state.route === 'detail' ? state.previousRoute : state.route;
  state.detail = item;
  state.route = 'detail';
  window.location.hash = `detail/${encodeURIComponent(type)}/${encodeURIComponent(id)}`;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleSaved(item) {
  if (!item) return;
  const key = movieKey(item);
  state.saved = isSaved(item) ? state.saved.filter((savedKey) => savedKey !== key) : [...state.saved, key];
  localStorage.setItem('rogerio-list', JSON.stringify(state.saved));
  render();
  showToast(isSaved(item) ? 'Adicionado à sua lista.' : 'Removido da sua lista.');
}

function startPlayback(item) {
  if (!item) return showToast('Este título está indisponível para reprodução.');
  const params = new URLSearchParams({ type: item.type, title: item.title });
  if (item.type === 'movie') params.set('id', item.id);
  else if (item.source) params.set('source', item.source);
  const key = movieKey(item);
  if (!state.history.includes(key)) {
    state.history = [...state.history, key];
    localStorage.setItem('rogerio-history', JSON.stringify(state.history));
  }
  window.location.href = `player.html?${params.toString()}`;
}

async function loadMovies() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Catalog unavailable');
    const movies = await response.json();
    if (!Array.isArray(movies)) throw new Error('Invalid catalog response');
    state.movies = movies.filter((movie) => movie.id && movie.title && movie.posterUrl);
    state.loadError = state.movies.length === 0;
  } catch {
    state.loadError = true;
  } finally {
    state.loading = false;
    render();
  }
}

function syncLocation() {
  const parts = decodeURIComponent(window.location.hash.slice(1) || 'home').split('/');
  if (parts[0] === 'detail' && parts.length >= 3) {
    state.route = 'detail';
    state.detail = findItem(parts[1], parts.slice(2).join('/'));
  } else {
    state.route = parts[0] || 'home';
    state.detail = null;
  }
  render();
  window.scrollTo(0, 0);
}

app.addEventListener('click', (event) => {
  const genreLink = event.target.closest('[data-genre]');
  if (genreLink) {
    state.searchFilters.genre = genreLink.dataset.genre;
    if (state.route === 'explore') render();
    return;
  }
  const mobileSearch = event.target.closest('[data-mobile-search]');
  if (mobileSearch) {
    event.preventDefault();
    setRoute('explore');
    window.setTimeout(() => document.querySelector('.search-page-form input')?.focus(), 0);
    return;
  }
  const filter = event.target.closest('[data-filter]');
  if (filter) {
    state.searchFilters[filter.dataset.filter] = filter.dataset.value;
    render();
    return;
  }
  const listFilter = event.target.closest('[data-list-filter]');
  if (listFilter) {
    state.listFilter = listFilter.dataset.listFilter;
    render();
    return;
  }
  const action = event.target.closest('[data-action]');
  if (!action) return;
  const item = findItem(action.dataset.type, action.dataset.id);
  switch (action.dataset.action) {
    case 'detail': openDetail(action.dataset.type, action.dataset.id); break;
    case 'save': toggleSaved(item); break;
    case 'watch': startPlayback(item); break;
    case 'watch-featured': startPlayback(state.movies[0] && { ...state.movies[0], type: 'movie' }); break;
    case 'featured-detail': state.movies[0] && openDetail('movie', state.movies[0].id); break;
    case 'save-featured': toggleSaved(state.movies[0] && { ...state.movies[0], type: 'movie' }); break;
    case 'retry': state.loading = true; state.loadError = false; render(); loadMovies(); break;
    case 'profile': setRoute('profile'); break;
    case 'notifications': showToast('Você está por dentro. Novidades em breve.'); break;
    case 'share': navigator.clipboard?.writeText(window.location.href).then(() => showToast('Link copiado para compartilhar.')).catch(() => showToast('Copie o endereço desta página para compartilhar.')); break;
    case 'trailer': window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(`${action.dataset.title} trailer oficial`)}`, '_blank', 'noopener,noreferrer'); break;
    case 'profile-edit': showToast('As informações do perfil estão atualizadas.'); break;
    case 'theme-light': showToast('O tema escuro mantém a experiência de cinema.'); break;
  }
});

app.addEventListener('submit', (event) => {
  if (!event.target.matches('[data-search-form]')) return;
  event.preventDefault();
  state.query = new FormData(event.target).get('q')?.toString().trim() || '';
  state.searchFilters = { ...state.searchFilters, type: 'Todos' };
  if (state.route !== 'explore') setRoute('explore'); else render();
});

app.addEventListener('change', (event) => {
  if (event.target.matches('[data-select-filter]')) {
    state.searchFilters[event.target.dataset.selectFilter] = event.target.value;
    render();
  }
  if (event.target.matches('[data-season]')) {
    state.season = Number(event.target.value);
    render();
  }
});

app.addEventListener('error', (event) => {
  const target = event.target;
  if (target instanceof HTMLImageElement && target.dataset.fallback && target.src !== target.dataset.fallback) {
    target.src = target.dataset.fallback;
  }
}, true);
window.addEventListener('hashchange', syncLocation);
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && state.route === 'detail') setRoute(state.previousRoute || 'home');
});

syncLocation();
loadMovies();