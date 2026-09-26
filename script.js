const rails = document.querySelectorAll('.rail-wrap');

rails.forEach((railWrap) => {
  const rail = railWrap.querySelector('.poster-rail');
  const buttons = railWrap.querySelectorAll('[data-scroll]');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const direction = button.dataset.scroll === 'left' ? -1 : 1;
      rail.scrollBy({ left: direction * rail.clientWidth * 0.78, behavior: 'smooth' });
    });
  });
});

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const viewport = carousel.querySelector('.carousel-viewport');
  const previousButton = carousel.querySelector('[data-carousel-direction="previous"]');
  const nextButton = carousel.querySelector('[data-carousel-direction="next"]');

  const updateButtons = () => {
    previousButton.disabled = viewport.scrollLeft <= 1;
    nextButton.disabled = viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 1;
  };

  previousButton.addEventListener('click', () => {
    viewport.scrollBy({ left: -viewport.clientWidth, behavior: 'smooth' });
  });
  nextButton.addEventListener('click', () => {
    viewport.scrollBy({ left: viewport.clientWidth, behavior: 'smooth' });
  });
  viewport.addEventListener('scroll', updateButtons, { passive: true });
  window.addEventListener('resize', updateButtons);
  updateButtons();
});

document.querySelectorAll('[data-add]').forEach((button) => {
  button.addEventListener('click', () => {
    const added = button.classList.toggle('is-added');
    button.innerHTML = added ? '<span class="plus">✓</span> Na minha lista' : '<span class="plus">+</span> Minha lista';
  });
});

document.querySelectorAll('[data-play]').forEach((button) => {
  button.addEventListener('click', () => {
    button.innerHTML = '<span class="play-triangle"></span> Reproduzindo';
    button.classList.add('is-playing');
  });
});

const themeToggle = document.querySelector('[data-theme-toggle]');

if (themeToggle) {
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem('rogerio-theme');
  } catch {
    savedTheme = null;
  }

  if (savedTheme === 'light') document.body.classList.add('light-mode');

  const updateThemeButton = () => {
    const lightMode = document.body.classList.contains('light-mode');
    themeToggle.setAttribute('aria-pressed', String(lightMode));
    themeToggle.setAttribute('aria-label', lightMode ? 'Ativar modo escuro' : 'Ativar modo claro');
    themeToggle.setAttribute('title', lightMode ? 'Ativar modo escuro' : 'Ativar modo claro');
    themeToggle.innerHTML = lightMode
      ? '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5 8.5 8.5 0 1 0 20.5 15.5Z"></path></svg>'
      : '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path></svg>';
  };

  updateThemeButton();
  themeToggle.addEventListener('click', () => {
    const lightMode = document.body.classList.toggle('light-mode');
    try {
      localStorage.setItem('rogerio-theme', lightMode ? 'light' : 'dark');
    } catch {
      savedTheme = null;
    }
    updateThemeButton();
  });
}

const seriesCatalog = [
  { title: 'Arquivo 09', details: 'Suspense · 3 temporadas', duration: '8 episódios', image: 'photo-1516339901601-2e1b62dc0c45', embedUrl: 'https://myembed.biz/serie/tt22084616' },
  { title: 'Entre Linhas', details: 'Drama · 2 temporadas', duration: '10 episódios', image: 'photo-1497366811353-6870744d04b2', embedUrl: 'https://myembed.biz/serie/tt22084616' },
  { title: 'Ponto de Virada', details: 'Ação · 4 temporadas', duration: '12 episódios', image: 'photo-1485846234645-a62644f84728', embedUrl: 'https://myembed.biz/serie/tt22084616' },
  { title: 'Cidade Invisível', details: 'Fantasia · 1 temporada', duration: '7 episódios', image: 'photo-1500534623283-312aade485b7', embedUrl: 'https://myembed.biz/serie/tt22084616' },
  { title: 'Horizonte Norte', details: 'Aventura · 3 temporadas', duration: '8 episódios', image: 'photo-1464822759023-fed622ff2c3b', embedUrl: 'https://myembed.biz/serie/tt22084616' },
  { title: 'Código Aberto', details: 'Ficção · 2 temporadas', duration: '9 episódios', image: 'photo-1446776811953-b23d57bd21aa', embedUrl: 'https://myembed.biz/serie/tt22084616' }
];

const movieGrid = document.querySelector('.movie-grid-list');
const movieCount = document.querySelector('.movie-count');
const seriesGrid = document.querySelector('.series-grid');
const seriesCount = document.querySelector('.series-count');
const movieApiUrl = 'http://localhost:8080/api/movies';

const createCatalogCard = (item, type) => {
  const card = document.createElement('article');
  card.className = 'poster-card wide-card';
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `Assistir ${item.title}`);
  const image = document.createElement('img');
  image.src = item.posterUrl || `https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=800&q=85`;
  image.alt = `Pôster de ${item.title}`;
  image.loading = 'lazy';

  const caption = document.createElement('div');
  caption.className = 'card-caption';
  const title = document.createElement('strong');
  title.textContent = item.title;
  const details = document.createElement('span');
  const releaseYear = item.releaseDate?.slice(0, 4);
  const rating = Number(item.voteAverage);
  details.textContent = type === 'movie'
    ? `${releaseYear || 'Ano indisponível'} · Nota ${rating.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}`
    : item.details;
  const duration = document.createElement('b');
  duration.textContent = item.duration;
  caption.append(title, details);
  if (item.duration) caption.append(duration);
  card.append(image, caption);

  const goToPlayer = () => {
    if (card.getAttribute('aria-busy') === 'true') return;
    card.setAttribute('aria-busy', 'true');

    const params = new URLSearchParams({
      type,
      title: item.title
    });
    if (type === 'movie') {
      params.set('id', item.id);
    } else if (item.embedUrl) {
      params.set('source', item.embedUrl);
    }
    window.location.href = `player.html?${params.toString()}`;
  };

  card.addEventListener('click', goToPlayer);
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      goToPlayer();
    }
  });

  return card;
};

const renderCatalog = (items, grid, type, countElement) => {
  if (!grid) return;
  grid.replaceChildren(...items.map((item) => createCatalogCard(item, type)));
  if (countElement) countElement.textContent = `${items.length} títulos`;
};

const loadMovies = async () => {
  if (!movieGrid) return;
  if (movieCount) movieCount.textContent = 'Carregando...';

  try {
    const response = await fetch(movieApiUrl);
    if (!response.ok) throw new Error('Não foi possível carregar os filmes.');
    const movies = await response.json();
    if (!movies.length) throw new Error('Nenhum filme em alta foi encontrado.');
    renderCatalog(movies, movieGrid, 'movie', movieCount);
  } catch {
    const message = document.createElement('p');
    message.className = 'catalog-message';
    message.textContent = 'Não foi possível carregar os filmes. Inicie a API e configure a chave do TMDB.';
    movieGrid.replaceChildren(message);
    if (movieCount) movieCount.textContent = 'Indisponível';
  }
};

loadMovies();
renderCatalog(seriesCatalog, seriesGrid, 'series', seriesCount);

window.dispatchEvent(new Event('resize'));
