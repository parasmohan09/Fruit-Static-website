/**
 * FreshFruits – script.js
 * Handles: fruit card rendering, search filtering,
 * modal open/close with dynamic benefits data.
 */

/* ============================================================
   DATA – All 20 fruits with emoji, tagline, benefits & nutrients
   ============================================================ */
const FRUITS = [
  {
    id: 1,
    name: "Apple",
    emoji: "🍎",
    tagline: "An apple a day keeps the doctor away",
    badge: "Classic",
    benefits: [
      { icon: "❤️", text: "Supports heart health by reducing LDL cholesterol levels." },
      { icon: "🦷", text: "Whitens teeth and promotes healthy gums naturally." },
      { icon: "🧠", text: "Linked to reduced risk of Alzheimer's and cognitive decline." },
      { icon: "🩸", text: "Helps regulate blood sugar thanks to soluble fibre (pectin)." },
      { icon: "⚖️", text: "Low calorie and high-fibre – ideal for weight management." },
      { icon: "🫁", text: "Quercetin content may protect lung function." }
    ],
    nutrients: ["Vitamin C", "Fiber", "Potassium", "Quercetin", "Vitamin B6"]
  },
  {
    id: 2,
    name: "Banana",
    emoji: "🍌",
    tagline: "Nature's original energy bar",
    badge: "Energy Boost",
    benefits: [
      { icon: "⚡", text: "Provides rapid natural energy – perfect pre-workout fuel." },
      { icon: "💪", text: "High in potassium, preventing muscle cramps and fatigue." },
      { icon: "😊", text: "Boosts serotonin and dopamine, improving mood naturally." },
      { icon: "🫀", text: "Potassium content supports healthy blood pressure." },
      { icon: "🦴", text: "Fructooligosaccharides help the body absorb calcium better." },
      { icon: "🧬", text: "Contains vitamin B6, crucial for protein metabolism." }
    ],
    nutrients: ["Potassium", "Vitamin B6", "Vitamin C", "Magnesium", "Fiber"]
  },
  {
    id: 3,
    name: "Mango",
    emoji: "🥭",
    tagline: "The king of fruits reigns supreme",
    badge: "King of Fruits",
    benefits: [
      { icon: "👁️", text: "Rich in beta-carotene, supporting eye health and night vision." },
      { icon: "🛡️", text: "Antioxidants like mangiferin fight oxidative stress and cancer." },
      { icon: "🧴", text: "Vitamin C boosts collagen production for glowing skin." },
      { icon: "🫁", text: "High vitamin A content keeps lungs and airways healthy." },
      { icon: "🦠", text: "Digestive enzymes (amylases) aid in breaking down complex carbs." },
      { icon: "🔋", text: "Natural sugars provide sustained energy without a crash." }
    ],
    nutrients: ["Vitamin A", "Vitamin C", "Folate", "Mangiferin", "Fiber"]
  },
  {
    id: 4,
    name: "Orange",
    emoji: "🍊",
    tagline: "Sunshine packed into a peel",
    badge: "Vitamin C King",
    benefits: [
      { icon: "🛡️", text: "One orange provides ~93% of your daily Vitamin C needs." },
      { icon: "🩸", text: "Hesperidin flavonoid reduces blood pressure significantly." },
      { icon: "🧬", text: "Folate is essential for DNA synthesis and cell repair." },
      { icon: "💆", text: "Reduces stress hormones and calms the nervous system." },
      { icon: "⚖️", text: "Helps control blood sugar and promotes satiety." },
      { icon: "💧", text: "High water content keeps you naturally hydrated." }
    ],
    nutrients: ["Vitamin C", "Folate", "Potassium", "Thiamine", "Calcium"]
  },
  {
    id: 5,
    name: "Grapes",
    emoji: "🍇",
    tagline: "Tiny berries with enormous benefits",
    badge: "Antioxidant Rich",
    benefits: [
      { icon: "🍷", text: "Resveratrol in red/purple grapes is a potent anti-ageing compound." },
      { icon: "❤️", text: "Reduces platelet clumping, protecting against heart attacks." },
      { icon: "🧠", text: "May slow cognitive decline and improve memory recall." },
      { icon: "🦷", text: "Antimicrobial properties help fight oral bacteria." },
      { icon: "👁️", text: "Lutein and zeaxanthin protect against macular degeneration." },
      { icon: "🌙", text: "Natural source of melatonin – helps regulate sleep cycles." }
    ],
    nutrients: ["Resveratrol", "Vitamin K", "Vitamin C", "Potassium", "B Vitamins"]
  },
  {
    id: 6,
    name: "Strawberry",
    emoji: "🍓",
    tagline: "A ruby-red burst of antioxidants",
    badge: "Beauty Fruit",
    benefits: [
      { icon: "🧴", text: "High Vitamin C stimulates collagen for youthful, firm skin." },
      { icon: "🧠", text: "Anthocyanins may improve memory and delay cognitive aging." },
      { icon: "🩸", text: "Polyphenols reduce inflammation and blood sugar spikes." },
      { icon: "❤️", text: "Lower LDL cholesterol and blood pressure over time." },
      { icon: "⚖️", text: "Very low in calories (32 kcal/cup) – excellent for weight loss." },
      { icon: "😁", text: "Malic acid acts as a natural tooth whitener." }
    ],
    nutrients: ["Vitamin C", "Manganese", "Folate", "Anthocyanins", "Fiber"]
  },
  {
    id: 7,
    name: "Pineapple",
    emoji: "🍍",
    tagline: "Tropical tang with healing powers",
    badge: "Tropical Star",
    benefits: [
      { icon: "🔬", text: "Bromelain enzymes reduce inflammation and swelling post-injury." },
      { icon: "🦷", text: "Rich in manganese, vital for building strong teeth and bones." },
      { icon: "🍽️", text: "Aids protein digestion and relieves bloating effectively." },
      { icon: "🛡️", text: "High vitamin C levels support a robust immune system." },
      { icon: "🩸", text: "Bromelain may help dissolve blood clots and improve circulation." },
      { icon: "😊", text: "Tryptophan content supports mood regulation and stress relief." }
    ],
    nutrients: ["Vitamin C", "Manganese", "Bromelain", "Thiamine", "Copper"]
  },
  {
    id: 8,
    name: "Watermelon",
    emoji: "🍉",
    tagline: "92% water, 100% refreshing",
    badge: "Hydration Hero",
    benefits: [
      { icon: "💧", text: "92% water content makes it the ultimate natural hydrator." },
      { icon: "💪", text: "L-citrulline in watermelon reduces muscle soreness after workouts." },
      { icon: "❤️", text: "Lycopene content may lower risk of heart disease and stroke." },
      { icon: "👁️", text: "Beta-carotene supports healthy vision and eye protection." },
      { icon: "🌞", text: "Lycopene and cucurbitacin E provide natural sun protection." },
      { icon: "⚖️", text: "Low calorie density (30 kcal/100g) promotes healthy weight." }
    ],
    nutrients: ["Lycopene", "Vitamin A", "Vitamin C", "Citrulline", "Potassium"]
  },
  {
    id: 9,
    name: "Papaya",
    emoji: "🫙",
    tagline: "Tropical enzyme powerhouse",
    badge: "Digestive Aid",
    benefits: [
      { icon: "🍽️", text: "Papain enzyme effectively breaks down proteins and eases digestion." },
      { icon: "🔥", text: "Potent anti-inflammatory properties reduce chronic pain." },
      { icon: "🛡️", text: "Lycopene lowers the risk of several cancers including prostate." },
      { icon: "🧴", text: "Vitamin C and E protect skin from free radical damage." },
      { icon: "🩸", text: "Fibre-rich nature helps control blood sugar levels." },
      { icon: "🦷", text: "Vitamin K promotes healthy bones and wound healing." }
    ],
    nutrients: ["Vitamin C", "Vitamin A", "Folate", "Papain", "Lycopene"]
  },
  {
    id: 10,
    name: "Kiwi",
    emoji: "🥝",
    tagline: "Small but nutritionally mighty",
    badge: "Nutrient Dense",
    benefits: [
      { icon: "💊", text: "More Vitamin C per gram than oranges – immunity superhero." },
      { icon: "🌙", text: "Studies show eating kiwi before bed improves sleep quality." },
      { icon: "🫁", text: "Vitamin C and antioxidants improve asthma and lung function." },
      { icon: "🩸", text: "Vitamin K and E support healthy blood clotting and circulation." },
      { icon: "🧬", text: "Folate is essential for DNA synthesis and foetal development." },
      { icon: "🦴", text: "Calcium content contributes to strong bones and teeth." }
    ],
    nutrients: ["Vitamin C", "Vitamin K", "Folate", "Potassium", "Actinidin"]
  },
  {
    id: 11,
    name: "Pomegranate",
    emoji: "🍎",
    tagline: "Ancient fruit, modern superfood",
    badge: "Superfood",
    benefits: [
      { icon: "🧬", text: "Punicalagins are uniquely powerful antioxidants – 3× more than red wine." },
      { icon: "🔬", text: "Strong anti-inflammatory properties combat chronic disease." },
      { icon: "🩸", text: "Lowers blood pressure and reduces arterial plaque build-up." },
      { icon: "🧠", text: "May improve memory and fight Alzheimer's disease progression." },
      { icon: "💪", text: "Reduces exercise-induced muscle soreness and fatigue." },
      { icon: "🦠", text: "Powerful antibacterial and antiviral properties fight infections." }
    ],
    nutrients: ["Punicalagins", "Vitamin C", "Folate", "Potassium", "Fiber"]
  },
  {
    id: 12,
    name: "Pear",
    emoji: "🍐",
    tagline: "Gently sweet, deeply nourishing",
    badge: "Gut Friendly",
    benefits: [
      { icon: "🧬", text: "High in pectin fibre which feeds beneficial gut bacteria (prebiotic)." },
      { icon: "🩸", text: "Anthocyanins reduce inflammation and lower heart disease risk." },
      { icon: "⚖️", text: "High fibre increases satiety and supports healthy weight." },
      { icon: "🦴", text: "Vitamin K and boron work together to maintain bone density." },
      { icon: "🛡️", text: "Plant compounds may reduce risk of certain cancers." },
      { icon: "🩺", text: "Associated with reduced risk of type-2 diabetes." }
    ],
    nutrients: ["Fiber", "Vitamin C", "Copper", "Potassium", "Vitamin K"]
  },
  {
    id: 13,
    name: "Cherry",
    emoji: "🍒",
    tagline: "Tart little bombs of wellness",
    badge: "Recovery Fruit",
    benefits: [
      { icon: "😴", text: "Natural melatonin content helps regulate sleep and treat insomnia." },
      { icon: "💪", text: "Reduces muscle damage and soreness after intense exercise." },
      { icon: "🔥", text: "Anthocyanins are among the most potent anti-inflammatories in nature." },
      { icon: "🩸", text: "Lowers blood pressure through its potassium and polyphenol content." },
      { icon: "🦴", text: "Tart cherry is proven to reduce gout attacks and uric acid levels." },
      { icon: "🧠", text: "Polyphenols may slow neurological degeneration and protect memory." }
    ],
    nutrients: ["Anthocyanins", "Melatonin", "Vitamin C", "Potassium", "Fiber"]
  },
  {
    id: 14,
    name: "Coconut",
    emoji: "🥥",
    tagline: "Tropical treasure trove of health",
    badge: "Tropical Gold",
    benefits: [
      { icon: "⚡", text: "MCTs (medium-chain triglycerides) provide instant energy for brain and body." },
      { icon: "🦠", text: "Lauric acid is a potent antimicrobial that kills harmful bacteria and viruses." },
      { icon: "⚖️", text: "MCTs boost fat burning and help reduce harmful belly fat." },
      { icon: "💧", text: "Coconut water is a natural electrolyte drink for rehydration." },
      { icon: "🧠", text: "MCTs are converted to ketones, providing fuel for the brain." },
      { icon: "🩸", text: "May improve cholesterol profile by raising beneficial HDL levels." }
    ],
    nutrients: ["MCTs", "Lauric Acid", "Potassium", "Manganese", "Copper"]
  },
  {
    id: 15,
    name: "Blueberry",
    emoji: "🫐",
    tagline: "Tiny blue gems of antioxidant power",
    badge: "Brain Booster",
    benefits: [
      { icon: "🧠", text: "Highest antioxidant content of any fruit – delays brain aging by years." },
      { icon: "🩸", text: "Anthocyanins protect LDL cholesterol from oxidative damage." },
      { icon: "💪", text: "Reduces DNA damage that drives aging and cancer development." },
      { icon: "👁️", text: "Anthocyanins improve night vision and protect retinal cells." },
      { icon: "🩺", text: "Regular consumption lowers blood pressure in hypertensive patients." },
      { icon: "😊", text: "Linked to improved memory, focus and reduced depression symptoms." }
    ],
    nutrients: ["Anthocyanins", "Vitamin C", "Vitamin K", "Manganese", "Fiber"]
  },
  {
    id: 16,
    name: "Raspberry",
    emoji: "🍓",
    tagline: "Jewel-red with remarkable nutrients",
    badge: "Weight Loss Aid",
    benefits: [
      { icon: "⚖️", text: "Raspberry ketones have been shown to break down fat cells more effectively." },
      { icon: "🩸", text: "High fibre slows sugar absorption and stabilises blood glucose." },
      { icon: "🔬", text: "Ellagic acid is a potent anti-cancer compound unique to raspberries." },
      { icon: "🛡️", text: "One cup provides 54% of your daily Vitamin C requirement." },
      { icon: "🦴", text: "Vitamin K content supports bone mineralisation and density." },
      { icon: "🧴", text: "Antioxidants protect skin cells from UV and environmental damage." }
    ],
    nutrients: ["Vitamin C", "Ellagic Acid", "Fiber", "Manganese", "Vitamin K"]
  },
  {
    id: 17,
    name: "Lemon",
    emoji: "🍋",
    tagline: "Zesty citrus with cleansing power",
    badge: "Detox Star",
    benefits: [
      { icon: "💧", text: "Lemon water in the morning stimulates liver detoxification enzymes." },
      { icon: "🛡️", text: "Exceptional Vitamin C content boosts immune response rapidly." },
      { icon: "⚖️", text: "Citric acid increases metabolic rate and supports fat burning." },
      { icon: "🪨", text: "Citrate in lemon juice prevents kidney stone formation effectively." },
      { icon: "🦠", text: "Antibacterial properties help combat common infections." },
      { icon: "🩸", text: "Flavonoids improve blood flow and protect artery walls." }
    ],
    nutrients: ["Vitamin C", "Citric Acid", "Flavonoids", "Potassium", "Folate"]
  },
  {
    id: 18,
    name: "Peach",
    emoji: "🍑",
    tagline: "Velvety sweetness rich in vitamins",
    badge: "Skin Glow",
    benefits: [
      { icon: "🧴", text: "Beta-carotene and Vitamin C work together for radiant, clear skin." },
      { icon: "👁️", text: "Lutein and zeaxanthin protect eyes from UV light and blue light damage." },
      { icon: "🍽️", text: "Soluble and insoluble fibre promotes smooth, healthy digestion." },
      { icon: "⚖️", text: "Low calorie (59 kcal) and fat-free – excellent diet-friendly fruit." },
      { icon: "🛡️", text: "Chlorogenic acid is a potent anti-inflammatory and antioxidant." },
      { icon: "🩸", text: "Potassium helps regulate blood pressure and reduce fluid retention." }
    ],
    nutrients: ["Vitamin A", "Vitamin C", "Potassium", "Niacin", "Chlorogenic Acid"]
  },
  {
    id: 19,
    name: "Plum",
    emoji: "🫒",
    tagline: "Deep purple goodness inside and out",
    badge: "Bone Health",
    benefits: [
      { icon: "🦴", text: "Dried plums (prunes) are the most effective food for bone loss prevention." },
      { icon: "🍽️", text: "Sorbitol and isatin act as mild natural laxatives for bowel regularity." },
      { icon: "🩸", text: "Antioxidants reduce oxidation of LDL cholesterol protecting arteries." },
      { icon: "🧠", text: "Anthocyanins in plums may protect neurons from oxidative stress." },
      { icon: "🩺", text: "Low glycaemic index makes plums suitable for diabetics." },
      { icon: "🛡️", text: "Vitamin C and A bolster natural immune defences significantly." }
    ],
    nutrients: ["Vitamin C", "Vitamin K", "Potassium", "Anthocyanins", "Sorbitol"]
  },
  {
    id: 20,
    name: "Avocado",
    emoji: "🥑",
    tagline: "Creamy, dreamy, heart-healthy fat",
    badge: "Healthy Fats",
    benefits: [
      { icon: "❤️", text: "Oleic acid (same as olive oil) reduces inflammation and supports heart health." },
      { icon: "⚖️", text: "High fibre and fat content increases fullness and reduces hunger." },
      { icon: "🩸", text: "More potassium than bananas – critical for blood pressure regulation." },
      { icon: "🧴", text: "Healthy fats enhance absorption of fat-soluble vitamins A, D, E, K." },
      { icon: "👁️", text: "Lutein and zeaxanthin protect eyes against age-related degeneration." },
      { icon: "🧠", text: "Folate supports brain function and reduces risk of depression." }
    ],
    nutrients: ["Monounsaturated Fat", "Potassium", "Folate", "Vitamin K", "Vitamin E"]
  }
];

/* ============================================================
   DOM REFERENCES
   ============================================================ */
const fruitsGrid    = document.getElementById('fruitsGrid');
const searchInput   = document.getElementById('searchInput');
const modalOverlay  = document.getElementById('modalOverlay');
const modalClose    = document.getElementById('modalClose');
const modalEmoji    = document.getElementById('modalEmoji');
const modalTitle    = document.getElementById('modalTitle');
const modalTagline  = document.getElementById('modalTagline');
const modalBenefitsList = document.getElementById('modalBenefitsList');
const modalNutrients    = document.getElementById('modalNutrients');
const header        = document.getElementById('header');
const hamburger     = document.getElementById('hamburger');
const navLinks      = document.querySelector('.nav-links');

/* ============================================================
   RENDER FRUIT CARDS
   ============================================================ */

/**
 * Creates a single fruit card DOM element.
 * @param {Object} fruit
 * @param {number} index – used for staggered animation delay
 * @returns {HTMLElement}
 */
function createCard(fruit, index) {
  const card = document.createElement('div');
  card.className = 'fruit-card';
  card.style.animationDelay = `${index * 0.06}s`;
  card.setAttribute('data-id', fruit.id);
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `Learn about ${fruit.name}`);

  card.innerHTML = `
    <div class="card-img-wrap">
      <span class="card-emoji">${fruit.emoji}</span>
      <span class="card-badge">${fruit.badge}</span>
    </div>
    <div class="card-body">
      <h3 class="card-name">${fruit.name}</h3>
      <p class="card-tagline">${fruit.tagline}</p>
      <span class="card-cta">Explore Benefits <span>→</span></span>
    </div>
  `;

  // Click handler
  card.addEventListener('click', () => openModal(fruit));

  // Keyboard accessibility
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(fruit);
    }
  });

  return card;
}

/**
 * Renders cards for a given array of fruits.
 * @param {Array} fruitsToShow
 */
function renderCards(fruitsToShow) {
  fruitsGrid.innerHTML = '';

  if (fruitsToShow.length === 0) {
    fruitsGrid.innerHTML = `
      <div class="no-results">
        <p>🍃 No fruits found. Try a different search!</p>
      </div>`;
    return;
  }

  fruitsToShow.forEach((fruit, i) => {
    fruitsGrid.appendChild(createCard(fruit, i));
  });
}

/* ============================================================
   MODAL
   ============================================================ */

/**
 * Opens the modal and populates it with the fruit's data.
 * @param {Object} fruit
 */
function openModal(fruit) {
  // Populate
  modalEmoji.textContent = fruit.emoji;
  modalTitle.textContent = fruit.name;
  modalTagline.textContent = `"${fruit.tagline}"`;

  // Benefits list
  modalBenefitsList.innerHTML = '';
  fruit.benefits.forEach(b => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="benefit-icon">${b.icon}</span><span>${b.text}</span>`;
    modalBenefitsList.appendChild(li);
  });

  // Nutrient tags
  modalNutrients.innerHTML = '';
  fruit.nutrients.forEach(n => {
    const tag = document.createElement('span');
    tag.className = 'nutrient-tag';
    tag.textContent = n;
    modalNutrients.appendChild(tag);
  });

  // Show
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

/** Closes the modal. */
function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Close button
modalClose.addEventListener('click', closeModal);

// Click outside card
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

// Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

/* ============================================================
   SEARCH / FILTER
   ============================================================ */
searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = FRUITS.filter(f =>
    f.name.toLowerCase().includes(query) ||
    f.tagline.toLowerCase().includes(query) ||
    f.badge.toLowerCase().includes(query)
  );
  renderCards(filtered);
});

/* ============================================================
   STICKY HEADER SHADOW
   ============================================================ */
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

/* ============================================================
   MOBILE HAMBURGER MENU
   ============================================================ */
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ============================================================
   INTERSECTION OBSERVER – scroll-triggered fade-in
   ============================================================ */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.strip-item, .section-header').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
  observer.observe(el);
});

/* ============================================================
   INIT
   ============================================================ */
renderCards(FRUITS);
