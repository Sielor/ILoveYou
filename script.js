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
  for (let i = 0; i < 30; i++) {
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