const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');

function initGsapEnhancements() {
  if (!window.gsap || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const heroItems = document.querySelectorAll('.hero, .section-heading, .content-section, .faq-item');
  if (heroItems.length) {
    window.gsap.fromTo(heroItems, {
      autoAlpha: 0,
      y: 18
    }, {
      autoAlpha: 1,
      y: 0,
      duration: 0.75,
      ease: 'power2.out',
      stagger: 0.08,
      clearProps: 'transform,opacity'
    });
  }
}

function loadGsap() {
  if (window.gsap || document.querySelector('[data-gsap-script]')) {
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js';
  script.async = true;
  script.dataset.gsapScript = 'true';
  script.onload = () => {
    initGsapEnhancements();
  };
  document.head.appendChild(script);
}

menuButton?.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Open menu' : 'Close menu');
  navigation?.classList.toggle('is-open', !expanded);
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open menu');
    navigation.classList.remove('is-open');
  });
});

if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const entranceObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-entered');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.08});
  document.querySelectorAll('.content-section').forEach((section) => entranceObserver.observe(section));
}

if (document.querySelector('.hero, .faq-item, .content-section')) {
  if (window.gsap) {
    initGsapEnhancements();
  } else {
    window.addEventListener('load', loadGsap, {once: true});
  }
}

const typedElement = document.querySelector('#typed');
const typedPhrases = ['Thoughtful websites, built for people.', 'Interfaces with a clear purpose.', 'Web development backed by real projects.'];
if (typedElement && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let phraseIndex = 0;
  let characterIndex = typedPhrases[0].length;
  let deleting = true;
  const typeNext = () => {
    if (document.hidden) {
      setTimeout(typeNext, 500);
      return;
    }
    const phrase = typedPhrases[phraseIndex];
    characterIndex += deleting ? -1 : 1;
    typedElement.textContent = phrase.slice(0, characterIndex);
    let delay = deleting ? 28 : 48;
    if (characterIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % typedPhrases.length;
      delay = 220;
    } else if (characterIndex === phrase.length) {
      deleting = true;
      delay = 1500;
    }
    setTimeout(typeNext, delay);
  };
  setTimeout(typeNext, 1700);
}

const projectRows = [...document.querySelectorAll('.project-row')];
const projectFilters = [...document.querySelectorAll('[data-project-filter]')];
const projectSearch = document.querySelector('#project-search');
const projectPagination = document.querySelector('#project-pagination');
const projectEmpty = document.querySelector('#project-empty');
const projectPageLabel = document.querySelector('#project-page');
const projectsPerPage = 6;
let activeProjectFilter = 'all';
let activeProjectPage = 0;

function renderProjects() {
  const searchTerm = projectSearch?.value.trim().toLowerCase() ?? '';
  const matchingProjects = projectRows.filter((project) => {
    const matchesFilter = activeProjectFilter === 'all' || project.dataset.category.split(' ').includes(activeProjectFilter);
    const searchableText = `${project.dataset.search} ${project.textContent}`.toLowerCase();
    return matchesFilter && searchableText.includes(searchTerm);
  });
  const pageCount = Math.max(1, Math.ceil(matchingProjects.length / projectsPerPage));
  activeProjectPage = Math.min(activeProjectPage, pageCount - 1);
  const visibleProjects = new Set(matchingProjects.slice(activeProjectPage * projectsPerPage, (activeProjectPage + 1) * projectsPerPage));

  projectRows.forEach((project) => { project.hidden = !visibleProjects.has(project); });
  if (projectEmpty) projectEmpty.hidden = matchingProjects.length !== 0;
  if (projectPagination) projectPagination.hidden = matchingProjects.length <= projectsPerPage;
  if (projectPageLabel) projectPageLabel.textContent = `${activeProjectPage + 1} / ${pageCount}`;
  document.querySelector('#project-prev').disabled = activeProjectPage === 0;
  document.querySelector('#project-next').disabled = activeProjectPage >= pageCount - 1;
}

projectFilters.forEach((button) => {
  button.addEventListener('click', () => {
    activeProjectFilter = button.dataset.projectFilter;
    activeProjectPage = 0;
    projectFilters.forEach((filter) => {
      const selected = filter === button;
      filter.classList.toggle('is-active', selected);
      filter.setAttribute('aria-pressed', String(selected));
    });
    renderProjects();
  });
});
projectSearch?.addEventListener('input', () => { activeProjectPage = 0; renderProjects(); });
document.querySelector('#project-prev')?.addEventListener('click', () => { activeProjectPage -= 1; renderProjects(); });
document.querySelector('#project-next')?.addEventListener('click', () => { activeProjectPage += 1; renderProjects(); });
renderProjects();

document.querySelectorAll('[data-skill-view]').forEach((button) => {
  button.addEventListener('click', () => {
    const showUsed = button.dataset.skillView === 'used';
    document.querySelector('#skills-used').hidden = !showUsed;
    document.querySelector('#skills-learning').hidden = showUsed;
    document.querySelectorAll('[data-skill-view]').forEach((tab) => {
      const selected = tab === button;
      tab.classList.toggle('is-active', selected);
      tab.setAttribute('aria-pressed', String(selected));
    });
  });
});

const testimonials = [
  {name: 'Ajay Namata', role: 'Startup Owner', image: 'img/ghost.png', quote: 'Working with Ekansh was a smooth experience from start to finish. He understood my requirements clearly and delivered a clean, responsive website ahead of schedule. I appreciated his attention to detail and willingness to make small refinements until it was perfect.'},
  {name: 'Priti Singh', role: 'Mentor', image: 'img/testi2.jpg', quote: 'Ekansh’s work on our project was not only technically sound but also well thought out from a user experience perspective. His ability to translate vague ideas into functional features really stood out.'},
  {name: 'Akhilesh Maurya', role: 'Saurabh Studio, Owner', image: 'img/akhi.png', quote: 'I approached Ekansh for a quick landing page and ended up with a full-fledged, beautifully designed site. The code was neat, easy to maintain, and performed flawlessly on all devices.'},
  {name: 'XPxBAKIIop', role: 'Teammate, XPLOSION eSPORTS', image: 'img/XPxDEADigl.png', quote: 'Ekansh reads the game like a book. His planning and adaptability give the squad a clear edge in every match.'}
];
let testimonialIndex = 0;
function showTestimonial(index, announce = false) {
  testimonialIndex = (index + testimonials.length) % testimonials.length;
  const testimonial = testimonials[testimonialIndex];
  const quote = document.querySelector('#testimonial-quote');
  quote.classList.remove('is-changing');
  void quote.offsetWidth;
  quote.classList.add('is-changing');
  document.querySelector('#testimonial-avatar').src = testimonial.image;
  document.querySelector('#testimonial-avatar').alt = testimonial.name;
  quote.textContent = `“${testimonial.quote}”`;
  document.querySelector('#testimonial-name').textContent = testimonial.name;
  document.querySelector('#testimonial-role').textContent = testimonial.role;
  document.querySelector('#testimonial-position').textContent = `${testimonialIndex + 1} / ${testimonials.length}`;
  if (announce) document.querySelector('#testimonial-announcement').textContent = `${testimonial.name}, ${testimonial.role}`;
}
document.querySelector('#testimonial-prev')?.addEventListener('click', () => showTestimonial(testimonialIndex - 1, true));
document.querySelector('#testimonial-next')?.addEventListener('click', () => showTestimonial(testimonialIndex + 1, true));
const testimonialSection = document.querySelector('#testimonials');
let testimonialTimer;
function startTestimonialTimer() {
  clearInterval(testimonialTimer);
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  testimonialTimer = setInterval(() => {
    if (!document.hidden && !testimonialSection.matches(':hover') && !testimonialSection.contains(document.activeElement)) {
      showTestimonial(testimonialIndex + 1);
    }
  }, 7000);
}
testimonialSection?.addEventListener('pointerenter', () => clearInterval(testimonialTimer));
testimonialSection?.addEventListener('pointerleave', startTestimonialTimer);
testimonialSection?.addEventListener('focusin', () => clearInterval(testimonialTimer));
testimonialSection?.addEventListener('focusout', startTestimonialTimer);
document.addEventListener('visibilitychange', startTestimonialTimer);
startTestimonialTimer();

const contactForm = document.querySelector('#contact-form');
contactForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const status = document.querySelector('#form-status');
  const submitButton = contactForm.querySelector('[type="submit"]');
  status.textContent = 'Sending…';
  status.className = 'form-status';
  submitButton.disabled = true;
  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: {Accept: 'application/json'}
    });
    if (!response.ok) throw new Error('Message could not be sent.');
    status.textContent = 'Message sent. Thank you for reaching out.';
    status.classList.add('is-success');
    contactForm.reset();
  } catch {
    status.textContent = 'Message could not be sent. Please email ekanshprataps@gmail.com.';
    status.classList.add('is-error');
  } finally {
    submitButton.disabled = false;
  }
});

function setFaqState(item, open) {
  const answer = item.querySelector('.faq-answer');
  const button = item.querySelector('.faq-question');
  const icon = button?.querySelector('.faq-icon');
  if (!answer || !button) return;

  item.classList.toggle('is-open', open);
  button.setAttribute('aria-expanded', String(open));

  if (window.gsap && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.gsap.to(answer, {
      maxHeight: open ? `${answer.scrollHeight + 32}px` : '0px',
      opacity: open ? 1 : 0,
      duration: 0.28,
      ease: 'power2.out',
      onStart: () => {
        answer.style.overflow = 'hidden';
      }
    });
    window.gsap.to(icon, {
      rotate: open ? 45 : 0,
      duration: 0.2,
      ease: 'power2.out'
    });
    return;
  }

  answer.style.maxHeight = open ? `${answer.scrollHeight + 32}px` : '0px';
  if (icon) icon.style.transform = `rotate(${open ? 45 : 0}deg)`;
}

document.querySelectorAll('.faq-item').forEach((item) => {
  const button = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  if (!button || !answer) return;

  setFaqState(item, item.classList.contains('is-open'));
  button.addEventListener('click', () => {
    const nextOpen = !item.classList.contains('is-open');
    setFaqState(item, nextOpen);
  });
  window.addEventListener('resize', () => {
    if (item.classList.contains('is-open')) {
      answer.style.maxHeight = `${answer.scrollHeight + 32}px`;
    }
  });
});

function loadAskEku() {
  if (document.querySelector('[data-askeku-script]')) return;
  const loader = document.createElement('script');
  loader.src = 'https://cdn.botpress.cloud/webchat/v3.2/inject.js';
  loader.async = true;
  loader.dataset.askekuScript = 'inject';
  loader.onload = () => {
    const config = document.createElement('script');
    config.src = 'https://files.bpcontent.cloud/2025/09/15/17/20250915174331-WD0JXCRQ.js';
    config.async = true;
    config.dataset.askekuScript = 'config';
    document.body.append(config);
  };
  loader.onerror = () => loader.remove();
  document.body.append(loader);
}

addEventListener('load', () => {
  if ('requestIdleCallback' in window) requestIdleCallback(loadAskEku, {timeout: 5000});
  else setTimeout(loadAskEku, 2000);
}, {once: true});
