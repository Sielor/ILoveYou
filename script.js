const compliments = [
  "You make ordinary moments feel extraordinary.",
  "The way you care for others is genuinely beautiful.",
  "You have a rare and wonderful kind of courage.",
  "Your laugh is one of the best sounds in the world.",
  "You bring warmth to every room you walk into.",
  "The world is measurably better with you in it.",
  "You are so much more capable than you realize.",
  "Your kindness leaves ripples you never even see.",
  "There is something magnetic about your energy.",
  "You deserve all the softness life has to offer.",
  "You notice things most people miss — that's a gift.",
  "Being loved by you is an extraordinary privilege.",
  "You carry yourself with a quiet, unshakeable grace.",
  "Your heart is one of the most generous I've known.",
  "You have a rare ability to make people feel truly seen."
];

// Shades of red — front cycles through these on each flip back
const redShades = [
  "#c1121f",
  "#9b1919",
  "#a4262c",
  "#d62828",
  "#b5192b",
  "#7b1113",
  "#e63946",
  "#8b0000",
];

// Back heart gets a complementary shade
const backShades = [
  "#e63946",
  "#c1121f",
  "#d62828",
  "#a4262c",
  "#e63946",
  "#b5192b",
  "#9b1919",
  "#c1121f",
];

const card3d = document.getElementById('card3d');
const heartFront = document.getElementById('heartPathFront');
const heartBack = document.getElementById('heartPathBack');
const complimentEl = document.getElementById('complimentText');

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
  for (let i = 0; i < 14; i++) {
    setTimeout(() => {
      const p = document.createElement('div');
      p.className = 'petal';
      p.textContent = '♥';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.top  = '-1.5rem';
      p.style.fontSize = (0.5 + Math.random() * 0.7) + 'rem';
      p.style.color = redShades[Math.floor(Math.random() * redShades.length)];
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
    const fShade = redShades[shadeIndex % redShades.length];
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

  if (preAnim) {
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