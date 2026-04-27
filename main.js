/* =============================================
   CONSEJO DE PASTORES EL BOSQUE
   main.js — JavaScript principal compartido
   ============================================= */

// ---- NAVBAR: scroll + hamburger ----
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  // Cerrar al hacer click en un enlace
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// ---- CONTADOR ANIMADO (stats) ----
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString('es-CL');
  }, 16);
}

const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statNumbers.forEach(el => observer.observe(el));
}

// ---- FILTROS DE ACTIVIDADES ----
const filtros = document.querySelectorAll('.filtro-btn');
if (filtros.length > 0) {
  filtros.forEach(btn => {
    btn.addEventListener('click', () => {
      filtros.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      const cards = document.querySelectorAll('.act-card');
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.cat === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// ---- BÚSQUEDA DE IGLESIAS ----
const buscarInput = document.getElementById('buscar-iglesia');
if (buscarInput) {
  buscarInput.addEventListener('input', () => {
    const query = buscarInput.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.iglesia-card');
    let visible = 0;
    cards.forEach(card => {
      const nombre = card.dataset.nombre || '';
      if (nombre.includes(query)) {
        card.classList.remove('hidden');
        visible++;
      } else {
        card.classList.add('hidden');
      }
    });
    const noRes = document.getElementById('no-resultados');
    if (noRes) noRes.style.display = visible === 0 ? 'block' : 'none';
  });
}

// ---- TABS DEL FORMULARIO ----
const tabBtns = document.querySelectorAll('.tab-btn');
if (tabBtns.length > 0) {
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tab = btn.dataset.tab;
      document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
      const target = document.getElementById('tab-' + tab);
      if (target) target.classList.add('active');
    });
  });
}

// ---- FORMULARIO: submit simulado ----
const contactoForm = document.getElementById('contacto-form');
if (contactoForm) {
  contactoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    setTimeout(() => {
      contactoForm.querySelectorAll('.tab-content.active input, .tab-content.active textarea, .tab-content.active select')
        .forEach(el => el.value = '');
      submitBtn.style.display = 'none';
      const successMsg = document.getElementById('form-success');
      if (successMsg) successMsg.style.display = 'block';
    }, 1500);
  });
}

// ---- SCROLL REVEAL suave ----
const revealEls = document.querySelectorAll(
  '.mision-card, .evento-card, .act-card, .iglesia-card, .team-card, .mvv-card, .programa-item, .stat-item, .forma-card, .contacto-info-item'
);
if (revealEls.length > 0 && 'IntersectionObserver' in window) {
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = (i % 4) * 60 + 'ms';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    revealObs.observe(el);
  });
}
