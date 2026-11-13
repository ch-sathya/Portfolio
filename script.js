const projects = {
  hil: {
    kicker: '01 / Applied AI / Concept in progress',
    title: 'An extra mind for engineering.',
    summary: 'An AI assistant concept for Hardware-in-the-Loop support, designed to help engineers investigate recurring tool and workflow issues.',
    sections: [
      ['The problem', 'HIL troubleshooting can involve several tools, versions, logs, and workflow dependencies. A useful support process needs to organize that evidence before offering guidance.'],
      ['My contribution', 'Defined a proposed workflow that collects symptoms, versions, workflow context, and logs, then organizes findings for guided diagnosis or engineer escalation. Designed structured prompts emphasizing evidence-based responses, clear troubleshooting steps, capability limits, and escalation when evidence is incomplete or risk is elevated.'],
      ['Initial scope', 'Engineering Tool, dSPACE ControlDesk, ATI Vision, and Python or Robot Framework orchestration. Engineers remain responsible for safety-relevant decisions.'],
      ['Status and limits', 'Concept / in progress. This is not a deployed product and makes no claim of production results. The workflow graphic on this page is a conceptual illustration, not a screenshot of a system.']
    ],
    tags: ['Prompt Engineering', 'Generative AI', 'HIL', 'Python', 'Robot Framework']
  },
  recognition: {
    kicker: '02 / Computer vision / Academic project',
    title: 'Finding a connection in the data.',
    summary: 'An academic Python facial-recognition system that matches images against a database and supports image storage and retrieval.',
    sections: [
      ['The question', 'How can computer vision assist image-based identification in a missing persons context?'],
      ['My contribution', 'Developed a Python system using Dlib for facial recognition, with database matching and image storage and retrieval functionality.'],
      ['Context and limits', 'An academic project, not a deployed identification service. Real-world use would require privacy safeguards, consent, accuracy evaluation, and human verification. The graphic on this page is an abstract schematic that depicts no real person or match.']
    ],
    tags: ['Python', 'Dlib', 'Facial Recognition', 'Image Retrieval']
  },
  bikes: {
    kicker: '03 / Machine learning / Prediction',
    title: 'Understanding the next ride.',
    summary: 'A machine learning project exploring bike rental demand through historical rental and weather data.',
    sections: [
      ['The question', 'How can patterns in historical and weather data help predict bike rental demand?'],
      ['My contribution', 'Cleaned and preprocessed historical and weather data, performed feature engineering, and evaluated Random Forest and Linear Regression models for demand prediction.'],
      ['The focus', 'A practical exploration of the end-to-end machine learning workflow, from preparing data to comparing models. The graphic on this page illustrates the process only; it does not show measured predictions or model performance.']
    ],
    tags: ['Python', 'Machine Learning', 'Random Forest', 'Linear Regression', 'Feature Engineering']
  },
  emi: {
    kicker: '04 / Web development / Financial utility',
    title: 'Big decisions. Clear numbers.',
    summary: 'A responsive car loan EMI calculator with input validation and dynamic calculations.',
    sections: [
      ['The build', 'A web project built around a straightforward goal: make monthly loan repayments easier to understand. The original project is a responsive HTML and CSS calculator with input validation and dynamic calculations.'],
      ['Working example', 'This portfolio includes a working implementation of the standard fixed-rate EMI formula. Change the loan amount, annual rate, or term below to estimate a monthly payment.']
    ],
    tags: ['HTML', 'CSS', 'Input Validation', 'Responsive Web']
  }
};

const currency = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
document.documentElement.classList.add('motion');

function calculateEmi(principal, annualRate, years) {
  const months = years * 12;
  const monthlyRate = annualRate / 1200;
  if (monthlyRate === 0) return principal / months;
  const growthMinusOne = Math.expm1(months * Math.log1p(monthlyRate));
  return principal * monthlyRate * (1 + 1 / growthMinusOne);
}

const header = document.querySelector('.site-header');
const progress = document.querySelector('.progress');
let frame = 0;
function onScroll() {
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = 0;
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.setProperty('--progress', max > 0 ? Math.min(scrollY / max, 1) : 0);
    header.classList.toggle('is-scrolled', scrollY > 12);
  });
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');

function closeNavigation() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('open');
  header.classList.remove('menu-open');
  document.documentElement.classList.remove('menu-open');
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('open', !isOpen);
  header.classList.toggle('menu-open', !isOpen);
  document.documentElement.classList.toggle('menu-open', !isOpen);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNavigation));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeNavigation();
    menuButton.focus();
  }
});

function splitWords(root) {
  const label = root.textContent.replace(/\s+/g, ' ').trim();
  const visual = document.createElement('span');
  visual.setAttribute('aria-hidden', 'true');
  visual.append(...root.childNodes);
  let index = 0;
  const walk = node => [...node.childNodes].forEach(child => {
    if (child.nodeType === Node.ELEMENT_NODE) return walk(child);
    const fragment = document.createDocumentFragment();
    child.textContent.split(/(\s+)/).forEach(part => {
      if (!part) return;
      if (!part.trim()) return fragment.append(' ');
      const outer = document.createElement('span');
      const inner = document.createElement('span');
      outer.className = 'w';
      inner.className = 'wi';
      inner.style.setProperty('--i', index++);
      inner.textContent = part;
      outer.append(inner);
      fragment.append(outer);
    });
    child.replaceWith(fragment);
  });
  walk(visual);
  const readable = document.createElement('span');
  readable.className = 'sr-only';
  readable.textContent = label;
  root.append(readable, visual);
}
if (!reduceMotion.matches) document.querySelectorAll('.words').forEach(splitWords);

document.querySelectorAll('[data-stagger] > .reveal').forEach(item => {
  const position = [...item.parentElement.children].indexOf(item);
  item.style.setProperty('--d', `${Math.min(position, 5) * 90}ms`);
});

const revealTargets = document.querySelectorAll('.reveal, .words');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const target = entry.target;
      target.classList.add('in');
      observer.unobserve(target);
      if (target.style.getPropertyValue('--d')) setTimeout(() => target.style.removeProperty('--d'), 1600);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  revealTargets.forEach(target => observer.observe(target));
} else {
  revealTargets.forEach(target => target.classList.add('in'));
}

if ('IntersectionObserver' in window) {
  const livePauser = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('is-offscreen', !entry.isIntersecting)), { rootMargin: '120px' });
  document.querySelectorAll('.marquee, .case-visual, .hero').forEach(item => livePauser.observe(item));

  const spyLinks = new Map([...navigation.querySelectorAll('a[href^="#"]')].map(link => [link.getAttribute('href').slice(1), link]));
  const spy = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    spyLinks.forEach(link => link.removeAttribute('aria-current'));
    const link = spyLinks.get(entry.target.id);
    if (link && !link.classList.contains('nav-cta')) link.setAttribute('aria-current', 'true');
  }), { rootMargin: '-45% 0px -50% 0px' });
  ['home', 'work', 'about', 'questions', 'contact'].forEach(id => spy.observe(document.getElementById(id)));
}

const hero = document.querySelector('.hero');
if (matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion.matches) {
  let targetX = 0, targetY = 0, currentX = 0, currentY = 0, heroFrame = 0;
  const follow = () => {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    hero.style.setProperty('--px', currentX.toFixed(3));
    hero.style.setProperty('--py', currentY.toFixed(3));
    heroFrame = Math.abs(targetX - currentX) > 0.002 || Math.abs(targetY - currentY) > 0.002 ? requestAnimationFrame(follow) : 0;
  };
  const kick = () => { if (!heroFrame) heroFrame = requestAnimationFrame(follow); };
  hero.addEventListener('pointermove', event => {
    const box = hero.getBoundingClientRect();
    targetX = (event.clientX - box.left) / box.width - 0.5;
    targetY = (event.clientY - box.top) / box.height - 0.5;
    kick();
  });
  hero.addEventListener('pointerleave', () => { targetX = 0; targetY = 0; kick(); });
}

const miniAmount = document.querySelector('#mini-amount');
const miniRate = document.querySelector('#mini-rate');
const miniTerm = document.querySelector('#mini-term');
const miniVisual = document.querySelector('#mini-emi-visual');
const miniText = document.querySelector('#mini-emi-text');
let shownEmi = 0;
let emiFrame = 0;
let announceTimer = 0;
function updateMiniEmi(immediate = false) {
  const principal = Number(miniAmount.value);
  const rate = Number(miniRate.value);
  const years = Number(miniTerm.value);
  document.querySelector('#mini-amount-out').textContent = currency.format(principal);
  document.querySelector('#mini-rate-out').textContent = `${rate.toFixed(1)}%`;
  document.querySelector('#mini-term-out').textContent = `${years} ${years === 1 ? 'year' : 'years'}`;
  const target = Math.round(calculateEmi(principal, rate, years));
  const from = shownEmi;
  cancelAnimationFrame(emiFrame);
  if (immediate || reduceMotion.matches || from === target) {
    shownEmi = target;
    miniVisual.textContent = currency.format(target);
  } else {
    const start = performance.now();
    const tick = now => {
      const progress = Math.min((now - start) / 340, 1);
      shownEmi = from + (target - from) * (1 - Math.pow(1 - progress, 3));
      miniVisual.textContent = currency.format(shownEmi);
      if (progress < 1) emiFrame = requestAnimationFrame(tick);
      else shownEmi = target;
    };
    emiFrame = requestAnimationFrame(tick);
  }
  clearTimeout(announceTimer);
  announceTimer = setTimeout(() => { miniText.textContent = currency.format(target); }, 500);
}
[miniAmount, miniRate, miniTerm].forEach(input => input.addEventListener('input', () => updateMiniEmi()));
document.querySelector('.mini-emi').addEventListener('submit', event => event.preventDefault());
updateMiniEmi(true);
miniText.textContent = miniVisual.textContent;

const dialog = document.querySelector('.project-dialog');
let lastProjectTrigger;

function setupCalculator(container) {
  const calculator = document.createElement('form');
  calculator.className = 'calculator';
  calculator.innerHTML = `
    <h3>MONTHLY PAYMENT ESTIMATE</h3>
    <div class="calculator-fields">
      <label>Loan amount (INR)<input name="principal" type="number" min="1" max="100000000" value="500000" step="1" required></label>
      <label>Annual interest (%)<input name="rate" type="number" min="0" max="50" value="8.5" step="0.01" required></label>
      <label>Loan term (years)<input name="years" type="number" min="1" max="30" value="5" step="1" required></label>
    </div>
    <p class="calculator-error" role="status"></p>
    <div class="calculator-result"><span>Estimated monthly EMI</span><output aria-live="polite"></output></div>
    <p class="calculator-note">Fixed-rate estimate only. Excludes fees, insurance, and lender-specific terms. Not financial advice.</p>`;
  container.append(calculator);
  const update = () => {
    const principal = calculator.elements.namedItem('principal');
    const rate = calculator.elements.namedItem('rate');
    const years = calculator.elements.namedItem('years');
    const valid = [principal, rate, years].every(input => input.validity.valid && Number.isFinite(input.valueAsNumber));
    calculator.querySelector('.calculator-error').textContent = valid ? '' : 'Enter a positive amount up to INR 100,000,000, a rate from 0 to 50%, and a whole-year term from 1 to 30.';
    calculator.querySelector('output').textContent = valid ? currency.format(calculateEmi(principal.valueAsNumber, rate.valueAsNumber, years.valueAsNumber)) : 'Unavailable';
  };
  calculator.addEventListener('input', update);
  calculator.addEventListener('submit', event => event.preventDefault());
  update();
}

function openProject(key, trigger) {
  const project = projects[key];
  lastProjectTrigger = trigger;
  document.querySelector('#dialog-kicker').textContent = project.kicker;
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-summary').textContent = project.summary;
  const content = document.querySelector('#dialog-content');
  content.replaceChildren();
  project.sections.forEach(([heading, description]) => {
    const section = document.createElement('section');
    section.className = 'dialog-section';
    const title = document.createElement('h3');
    title.textContent = heading.toUpperCase();
    const paragraph = document.createElement('p');
    paragraph.textContent = description;
    section.append(title, paragraph);
    content.append(section);
  });
  if (key === 'emi') setupCalculator(content);
  document.querySelector('#dialog-tags').replaceChildren(...project.tags.map(tag => {
    const element = document.createElement('span');
    element.textContent = tag;
    return element;
  }));
  dialog.showModal();
  document.documentElement.classList.add('dialog-open');
  dialog.scrollTop = 0;
  document.querySelector('.dialog-close').focus({ preventScroll: true });
}

document.querySelectorAll('[data-project]').forEach(button => {
  button.addEventListener('click', () => openProject(button.dataset.project, button));
});
document.querySelectorAll('[data-open]').forEach(figure => {
  figure.addEventListener('click', event => {
    if (event.target.closest('form')) return;
    openProject(figure.dataset.open, figure.closest('.case').querySelector('[data-project]'));
  });
});

function finishClose() {
  if (!dialog.classList.contains('closing')) return;
  dialog.classList.remove('closing');
  dialog.close();
}
dialog.addEventListener('animationend', event => { if (event.target === dialog) finishClose(); });

function closeDialog() {
  if (!dialog.open || dialog.classList.contains('closing')) return;
  if (reduceMotion.matches) return dialog.close();
  dialog.classList.add('closing');
  setTimeout(finishClose, 360);
}

document.querySelector('.dialog-close').addEventListener('click', closeDialog);
dialog.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeDialog();
  }
});
dialog.addEventListener('cancel', event => {
  event.preventDefault();
  closeDialog();
});
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) closeDialog();
});
dialog.addEventListener('close', () => {
  document.documentElement.classList.remove('dialog-open');
  lastProjectTrigger?.focus({ preventScroll: true });
});

const answers = document.querySelectorAll('.qa-list details');
answers.forEach(item => item.addEventListener('toggle', () => {
  if (item.open) answers.forEach(other => { if (other !== item) other.open = false; });
}));

document.querySelector('.copy-email').addEventListener('click', async event => {
  const status = document.querySelector('.copy-status');
  const button = event.currentTarget;
  try {
    await navigator.clipboard.writeText('cheela.sathya@gmail.com');
    status.textContent = 'Email address copied.';
    button.classList.add('copied');
    setTimeout(() => button.classList.remove('copied'), 1800);
  } catch {
    status.textContent = 'Copy unavailable. Email: cheela.sathya@gmail.com';
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();

const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const motionOk = !reduceMotion.matches;

function rollify(element) {
  const text = element.textContent;
  const visual = document.createElement('span');
  visual.className = 'roll';
  visual.setAttribute('aria-hidden', 'true');
  [...text].forEach((character, index) => {
    const glyph = document.createElement('span');
    glyph.className = 'rl';
    glyph.dataset.c = character;
    glyph.style.setProperty('--i', index);
    glyph.textContent = character;
    visual.append(glyph);
  });
  const readable = document.createElement('span');
  readable.className = 'sr-only';
  readable.textContent = text;
  element.replaceChildren(readable, visual);
}

if (motionOk) {
  document.querySelectorAll('.link-button, .social a, .back-top').forEach(link => {
    const node = [...link.childNodes].find(child => child.nodeType === Node.TEXT_NODE && child.textContent.trim());
    if (!node) return;
    const wrapper = document.createElement('span');
    wrapper.dataset.roll = '';
    wrapper.textContent = node.textContent.trim();
    node.replaceWith(wrapper, ' ');
  });
  document.querySelectorAll('[data-roll]').forEach(rollify);
}

if (finePointer && motionOk) {
  document.querySelectorAll('.btn, .copy-email, .social a').forEach(control => {
    control.dataset.magnet = '';
    control.addEventListener('pointermove', event => {
      const box = control.getBoundingClientRect();
      control.style.setProperty('--mx', `${((event.clientX - box.left - box.width / 2) * 0.22).toFixed(1)}px`);
      control.style.setProperty('--my', `${((event.clientY - box.top - box.height / 2) * 0.32).toFixed(1)}px`);
    });
    control.addEventListener('pointerleave', () => {
      control.style.removeProperty('--mx');
      control.style.removeProperty('--my');
    });
  });

  document.querySelectorAll('.case-visual[data-open]').forEach(figure => { figure.dataset.cursor = 'Open'; });
  document.querySelectorAll('.mini-emi input[type=range]').forEach(input => { input.dataset.cursor = 'Drag'; });

  const cursor = document.querySelector('.cursor');
  const cursorLabel = cursor.querySelector('.cursor-label');
  let targetX = -100, targetY = -100, currentX = -100, currentY = -100, cursorFrame = 0, cursorShown = false;
  const glide = () => {
    currentX += (targetX - currentX) * 0.22;
    currentY += (targetY - currentY) * 0.22;
    cursor.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0)`;
    cursorFrame = Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1 ? requestAnimationFrame(glide) : 0;
  };
  addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse') return;
    targetX = event.clientX;
    targetY = event.clientY;
    if (!cursorShown) {
      cursorShown = true;
      currentX = targetX;
      currentY = targetY;
      document.documentElement.classList.add('has-cursor');
    }
    cursor.classList.remove('is-hidden');
    const interactive = event.target.closest('a, button, summary, [data-open], input[type=range]');
    const label = event.target.closest('[data-cursor]')?.dataset.cursor || '';
    cursor.classList.toggle('is-link', Boolean(interactive));
    cursor.classList.toggle('has-label', Boolean(label));
    if (cursorLabel.textContent !== label) cursorLabel.textContent = label;
    if (!cursorFrame) cursorFrame = requestAnimationFrame(glide);
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => cursor.classList.add('is-hidden'));
  addEventListener('pointerdown', () => cursor.classList.add('is-down'));
  addEventListener('pointerup', () => cursor.classList.remove('is-down'));
}

const decodeGlyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>_';
function decode(element) {
  const finalText = element.textContent;
  const visual = document.createElement('span');
  visual.setAttribute('aria-hidden', 'true');
  const readable = document.createElement('span');
  readable.className = 'sr-only';
  readable.textContent = finalText;
  element.replaceChildren(readable, visual);
  const start = performance.now();
  const step = now => {
    const progressRatio = Math.min((now - start) / 700, 1);
    const settled = Math.floor(progressRatio * finalText.length);
    visual.textContent = [...finalText].map((character, index) => index < settled || character === ' ' ? character : decodeGlyphs[Math.floor(Math.random() * decodeGlyphs.length)]).join('');
    if (progressRatio < 1) requestAnimationFrame(step);
    else visual.textContent = finalText;
  };
  requestAnimationFrame(step);
}
if (motionOk && 'IntersectionObserver' in window) {
  const decoder = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    decoder.unobserve(entry.target);
    decode(entry.target);
  }), { threshold: 0.6 });
  document.querySelectorAll('.label').forEach(label => decoder.observe(label));
}

document.querySelectorAll('.prin-head').forEach(button => button.addEventListener('click', () => {
  const item = button.closest('.prin');
  const willOpen = !item.classList.contains('open');
  document.querySelectorAll('.prin').forEach(other => {
    other.classList.remove('open');
    other.querySelector('.prin-head').setAttribute('aria-expanded', 'false');
  });
  if (willOpen) {
    item.classList.add('open');
    button.setAttribute('aria-expanded', 'true');
  }
}));

const scrubTitle = document.querySelector('.scrub');
const scrubWords = scrubTitle ? [...scrubTitle.querySelectorAll('.wi')] : [];
const clamp01 = value => Math.min(1, Math.max(0, value));
let litCount = -1;
let lastScroll = scrollY;
let marqueeRate = 1;
const marqueeAnimation = document.querySelector('.marquee-track')?.getAnimations()[0];

function updateEffects() {
  const viewport = innerHeight;

  if (scrubWords.length) {
    const box = scrubTitle.getBoundingClientRect();
    const ratio = clamp01((viewport * 0.85 - box.top) / (viewport * 0.3 + box.height));
    const lit = Math.round(ratio * scrubWords.length * 1.04);
    if (lit !== litCount) {
      litCount = lit;
      scrubWords.forEach((word, index) => word.classList.toggle('lit', index < lit));
    }
  }

  if (marqueeAnimation && motionOk) {
    const speed = Math.abs(scrollY - lastScroll);
    lastScroll = scrollY;
    marqueeRate += (Math.min(1 + speed / 5, 7) - marqueeRate) * 0.15;
    marqueeAnimation.playbackRate = marqueeRate;
  }
}

let effectsFrame = 0;
function effectsLoop() {
  effectsFrame = 0;
  updateEffects();
  if (marqueeRate > 1.02) {
    effectsFrame = requestAnimationFrame(effectsLoop);
  }
}
function scheduleEffects() {
  if (!effectsFrame) effectsFrame = requestAnimationFrame(effectsLoop);
}
addEventListener('scroll', scheduleEffects, { passive: true });
addEventListener('resize', () => { scheduleEffects(); gateFooterReveal(); });

const pageMain = document.querySelector('main');
const contactSection = document.querySelector('.contact');
function gateFooterReveal() {
  const fits = motionOk && contactSection.offsetHeight <= innerHeight;
  pageMain.classList.toggle('reveal-footer', fits);
}
gateFooterReveal();
document.fonts?.ready.then(() => { gateFooterReveal(); scheduleEffects(); });
updateEffects();
