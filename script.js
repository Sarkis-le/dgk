// Reveal on scroll
  const nav = document.querySelector('nav');
  const navToggle = document.querySelector('.nav-toggle');

  navToggle?.addEventListener('click', () => {
    const isOpen = nav?.classList.toggle('is-open') || false;
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    const icon = navToggle.querySelector('i');
    icon?.classList.toggle('bi-list', !isOpen);
    icon?.classList.toggle('bi-x-lg', isOpen);
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      nav?.classList.remove('is-open');
      navToggle?.setAttribute('aria-expanded', 'false');
      navToggle?.setAttribute('aria-label', 'Ouvrir le menu');
      const icon = navToggle?.querySelector('i');
      icon?.classList.add('bi-list');
      icon?.classList.remove('bi-x-lg');
    });
  });

  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(r => observer.observe(r));

  // Counter animation
  const counters = document.querySelectorAll('[data-target]');
  const cObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = +e.target.dataset.target;
        let count = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          count += step;
          if (count >= target) { count = target; clearInterval(timer); }
          e.target.textContent = count + '+';
        }, 40);
        cObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => cObserver.observe(c));

  // Catalogue search and filters
  const catalogueSearch = document.querySelector('#catalogueSearch');
  const catalogueCards = [...document.querySelectorAll('.catalogue-card')];
  const filterButtons = [...document.querySelectorAll('.filter-btn')];
  const catalogueCount = document.querySelector('#catalogueCount');
  const catalogueEmpty = document.querySelector('#catalogueEmpty');
  let activeFilter = 'all';

  const updateCatalogue = () => {
    const query = (catalogueSearch?.value || '').trim().toLowerCase();
    let visibleCount = 0;

    catalogueCards.forEach(card => {
      const matchesFilter = activeFilter === 'all' || card.dataset.category === activeFilter;
      const matchesSearch = !query || (card.dataset.title || '').includes(query);
      const isVisible = matchesFilter && matchesSearch;

      card.classList.toggle('is-hidden', !isVisible);
      if (isVisible) visibleCount += 1;
    });

    if (catalogueCount) {
      const label = visibleCount > 1 ? 'ressources disponibles' : 'ressource disponible';
      catalogueCount.textContent = `${visibleCount} ${label}`;
    }

    catalogueEmpty?.classList.toggle('is-visible', visibleCount === 0);
  };

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter || 'all';
      filterButtons.forEach(btn => btn.classList.toggle('active', btn === button));
      updateCatalogue();
    });
  });

  catalogueSearch?.addEventListener('input', updateCatalogue);
  if (catalogueCards.length) updateCatalogue();
