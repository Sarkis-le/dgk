// Reveal on scroll
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