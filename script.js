const compliments = [
  "I love you the most.",
  "I am so proud to call you mine",
  "I love you more and more everyday",
  "Your laugh is my favorite sound in the whole world",
  "Sending kisses!",
  "You make me want to wake up each day",
  "I wish you the best birthday ever!",
  "I love you the most my honey",
  "My good boy♥",
  "My handsome darling",
  "Let's cuddle until we fall asleep",
  "We will be together forever!",
  "I will never stop loving you",
  "I will love you forever",
  "I wish you the best night & the sweetest dreams",
  "I dream about you everyday",
  "I wish we could stay 5 more minutes in bed cuddling each morning",
  "We can do it together!",
  "I love hearing you talk about your day",
  "I can't wait to hold you in my arms",
  "Falling asleep is easier with you",
  "I want to wake each morning with you beside me",
  "I will hold you and never let go",
  "I never felt the love I feel for you before",
  "I will make sure you are feel loved every moment",
  "I will be with you through everything",
  "My heart burns with love for you",
  "You are doing an amazing job",
  "I'm so proud of youuuu",
  "You're the best husband ever!",
  "Your presence warms up my heart even when it's frozen",
  "I never knew true beauty until I saw you smile",
  "You made me smile again",
  "I love you for who you are",
  "No matter what happens, I will never stop loving you",
  "My heart beats for you",
  "You are the best",
  "I won at life when I met you",
  "Being with you is Perfect",
  "You're my sunshine",
  "I love you the most my darling♥"
];

// Shades of red, purple and pink — front cycles through these on each flip back
const frontShades = [
  "#c1121f", // deep crimson
  "#9b1919", // dark brick red
  "#a4262c", // muted red
  "#d62828", // vivid red
  "#b5192b", // rich rose-red
  "#7b1113", // near-black red
  "#e63946", // bright coral red
  "#8b0000", // dark red
  "#ff6b9d", // hot pink
  "#f72585", // electric magenta-pink
  "#e91e8c", // deep hot pink
  "#ff4d8f", // vivid strawberry pink
  "#7b2d8b", // deep violet
  "#9b5de5", // bright lavender-purple
  "#c77dff", // light lilac
  "#6a0572", // dark plum
  "#b5179e", // magenta-purple
  "#d63af9", // electric purple
];

const backShades = [
  "#e63946", // bright coral red
  "#c1121f", // deep crimson
  "#d62828", // vivid red
  "#a4262c", // muted red
  "#f72585", // electric magenta-pink
  "#ff6b9d", // hot pink
  "#e91e8c", // deep hot pink
  "#ff4d8f", // vivid strawberry pink
  "#ff85a1", // soft rose pink
  "#b5179e", // magenta-purple
  "#9b5de5", // bright lavender-purple
  "#d63af9", // electric purple
  "#c77dff", // light lilac
  "#7b2d8b", // deep violet
  "#6a0572", // dark plum
];

const card3d = document.getElementById('card3d');
const heartFront = document.getElementById('heartPathFront');
const heartBack = document.getElementById('heartPathBack');
const complimentEl = document.getElementById('complimentText');
const secretWrap = document.getElementById('secretWrap');
const secretInput = document.getElementById('secretInput');

let isFlipped = false;
let shadeIndex = 0;
let lastCompIdx = -1;

function getRandom() {
  let idx;
  do { idx = Math.floor(Math.random() * compliments.length); } while (idx === lastCompIdx);
  lastCompIdx = idx;
  return compliments[idx];
}

function spawnPetals() {
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const p = document.createElement('div');
      p.className = 'petal';
      p.textContent = '♥';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.top  = '-1.5rem';
      p.style.fontSize = (0.5 + Math.random() * 0.7) + 'rem';
      p.style.color = frontShades[Math.floor(Math.random() * frontShades.length)];
      p.style.animationDuration = (2.2 + Math.random() * 2.5) + 's';
      document.body.appendChild(p);
      p.addEventListener('animationend', () => p.remove());
    }, i * 55);
  }
}

let busy = false;

function clearAnimClasses() {
  card3d.classList.remove('anim-spin', 'anim-jump', 'anim-grow');
}

function doFlip() {
  isFlipped = !isFlipped;

  if (isFlipped) {
    const bShade = backShades[shadeIndex % backShades.length];
    heartBack.style.fill = bShade;
    complimentEl.textContent = getRandom();
    spawnPetals();
    card3d.classList.add('flipped');
  } else {
    shadeIndex++;
    const fShade = frontShades[shadeIndex % frontShades.length];
    heartFront.style.fill = fShade;
    card3d.classList.remove('flipped');
  }
}

card3d.addEventListener('click', () => {
  if (busy) return;

  // ~50% chance of a pre-flip animation
  const roll = Math.random();
  let preAnim = null;
  if (roll < 0.17)      preAnim = 'anim-spin';
  else if (roll < 0.34) preAnim = 'anim-jump';
  else if (roll < 0.50) preAnim = 'anim-grow';

  if (preAnim && !isFlipped) {
    busy = true;
    clearAnimClasses();
    // Pause the flip transition during pre-anim
    card3d.querySelector('.card-inner').style.transition = 'none';
    card3d.classList.add(preAnim);

    card3d.addEventListener('animationend', function handler() {
      card3d.removeEventListener('animationend', handler);
      clearAnimClasses();
      // Re-enable flip transition, then flip
      requestAnimationFrame(() => {
        card3d.querySelector('.card-inner').style.transition = '';
        requestAnimationFrame(() => {
          doFlip();
          busy = false;
        });
      });
    });
  } else {
    doFlip();
  }
});

// Replace the secretInput event listener in script.js

secretInput.addEventListener('input', () => {
  if (secretInput.value.toLowerCase().includes('reki')) {
    secretWrap.classList.add('hidden');
    triggerCelebration();
  }
});

function triggerCelebration() {
  const emojis = ['♥', '💋', '😘', '💕', '💖', '💗', '💓', '💝', '🌹', '✨', '💫', '🥰', '💞', '❣️', '💑'];
  const colors = [...frontShades, '#ff85a1', '#ffb3c6', '#f72585', '#ff6b9d', '#ffffff', '#ffe4e1'];

  // Wave 1 — immediate burst upward from bottom
  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      const p = document.createElement('div');
      p.className = 'petal celebrate-throw';
      p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      p.style.left   = (10 + Math.random() * 80) + 'vw';
      p.style.bottom = '0';
      p.style.top    = 'unset';
      p.style.fontSize = (1 + Math.random() * 2.2) + 'rem';
      p.style.color  = colors[Math.floor(Math.random() * colors.length)];
      const rise  = 30 + Math.random() * 65;
      const drift = (Math.random() - 0.5) * 300;
      const dur   = 1.8 + Math.random() * 1.6;
      p.style.setProperty('--rise', `-${rise}vh`);
      p.style.setProperty('--drift', `${drift}px`);
      p.style.animationDuration = dur + 's';
      document.body.appendChild(p);
      p.addEventListener('animationend', () => p.remove());
    }, i * 30);
  }

  // Wave 2 — rain from top
  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const p = document.createElement('div');
      p.className = 'petal';
      p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      p.style.left  = Math.random() * 100 + 'vw';
      p.style.top   = '-2rem';
      p.style.fontSize = (0.8 + Math.random() * 1.6) + 'rem';
      p.style.color = colors[Math.floor(Math.random() * colors.length)];
      p.style.animationDuration = (2.5 + Math.random() * 3) + 's';
      document.body.appendChild(p);
      p.addEventListener('animationend', () => p.remove());
    }, 400 + i * 50);
  }

  // Wave 3 — floaters that drift across screen sideways
  for (let i = 0; i < 25; i++) {
    setTimeout(() => {
      const p = document.createElement('div');
      p.className = 'petal celebrate-drift';
      p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      p.style.top   = (5 + Math.random() * 85) + 'vh';
      p.style.left  = '-3rem';
      p.style.fontSize = (1.2 + Math.random() * 2) + 'rem';
      p.style.color = colors[Math.floor(Math.random() * colors.length)];
      p.style.animationDuration = (3 + Math.random() * 3) + 's';
      document.body.appendChild(p);
      p.addEventListener('animationend', () => p.remove());
    }, 200 + i * 80);
  }

  // Wave 4 — giant emojis that pop and fade in center
  const centerEmojis = ['💋', '🥰', '💖', '😘', '💝'];
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      const p = document.createElement('div');
      p.className = 'celebrate-pop';
      p.textContent = centerEmojis[Math.floor(Math.random() * centerEmojis.length)];
      p.style.left = (15 + Math.random() * 70) + 'vw';
      p.style.top  = (15 + Math.random() * 70) + 'vh';
      document.body.appendChild(p);
      p.addEventListener('animationend', () => p.remove());
    }, i * 300);
  }

  // Pulse the background a few times
  let pulses = 0;
  const pulseInterval = setInterval(() => {
    document.body.style.backgroundColor = pulses % 2 === 0 ? '#2a1020' : '#1c1c20';
    pulses++;
    if (pulses >= 8) {
      clearInterval(pulseInterval);
      document.body.style.backgroundColor = '';
    }
  }, 180);
}
