/* AXIOMARC bookstore — data, 3D tilt, modal, scroll reveals.
 *
 * HOW TO ADD / EDIT A BOOK:
 *   1. Add an entry to the BOOKS array below.
 *   2. Put the cover image next to index.html and reference it as cover.
 *   3. Set buyUrl to the Whop product page URL (Buy Now redirects there).
 *      If buyUrl is empty, the button shows "Link coming soon" and is disabled.
 */

const BOOKS = [
  {
    id: "communication-essentials",
    title: "Communication Essentials",
    tagline: "Master every workplace conversation.",
    price: "$26.99",
    cover: "cover-communication-essentials-v2.webp",
    kicker: "Ebook",
    badge: null,
    buyUrl: "https://whop.com/axiomarc-aaa7/communication-essentials/",
    desc: "A practical guide to workplace communication — the skill behind every promotion, deal and relationship. Short chapters, simple language, and exercises you can use in your very next meeting.",
    points: [
      "Speak clearly in meetings, interviews and presentations",
      "Write emails people actually read and answer",
      "Handle difficult conversations with calm and confidence",
      "Application-based: every chapter ends with a do-it-now action",
    ],
  },
  {
    id: "leveling-up",
    title: "Leveling Up",
    tagline: "A gamified field manual for self-improvement.",
    price: "$47.99",
    cover: "cover-leveling-up-v2.webp",
    kicker: "Ebook",
    badge: null,
    buyUrl: "https://whop.com/axiomarc-aaa7/leveling-up-57/",
    desc: "Self-improvement treated like a game you can win. Follow the 100-day campaign, complete quests, earn XP and watch your character sheet fill up as you build real habits.",
    points: [
      "A 100-day gamified campaign with quests and XP",
      "Character-sheet system for tracking real growth",
      "Short, punchy chapters — no motivation fluff",
      "Built for consistency, not just inspiration",
    ],
  },
  {
    id: "personal-brand-code",
    title: "The Personal Brand Code",
    tagline: "The playbook for building a personal brand that gets you paid.",
    price: "$37.99",
    cover: "cover-personal-brand-code.webp",
    kicker: "Ebook · 57 pages",
    badge: "Bestseller",
    buyUrl: "https://whop.com/axiomarc-aaa7/the-personal-brand-code-e8",
    desc: "The complete, fully application-based playbook for building a personal brand from zero. Simple language, max 60 pages of pure signal — every chapter ends with an Abhi Karo (do it now) action box.",
    points: [
      "Find your niche and positioning in one sitting",
      "Content system: 50 hooks + 30-day posting calendar included",
      "DM scripts that turn followers into clients",
      "Bonuses: checklists, trackers and swipe files",
    ],
  },
  {
    id: "personal-brand-code-bundle",
    title: "The Personal Brand Code — Complete Bundle",
    tagline: "The book plus every tool to execute it.",
    price: "$67",
    cover: "cover-personal-brand-code.webp",
    kicker: "Bundle · 4 files",
    badge: "Best value",
    buyUrl: "https://whop.com/axiomarc-aaa7/the-personal-brand-code-complete-bundle",
    desc: "Everything in one package: the 57-page ebook, the 26-page Workbook with 10 worksheets, the Brand Sprint Tracker Excel with XP dashboard, and the 12-page Swipe Files. The full operating system for your personal brand.",
    points: [
      "The Personal Brand Code ebook (57 pages)",
      "Workbook: 10 worksheets + 30-day sprint checklist",
      "Brand Sprint Tracker Excel: dashboard, XP system, DM log",
      "Swipe Files: hooks, templates and scripts",
    ],
  },
];

/* ---------- render book cards ---------- */
const grid = document.getElementById("bookGrid");

BOOKS.forEach((book) => {
  const card = document.createElement("article");
  card.className = "book-card reveal";
  card.setAttribute("data-book", book.id);
  card.innerHTML = `
    ${book.badge ? `<span class="badge">${book.badge}</span>` : ""}
    <div class="cover-tilt"><img src="${book.cover}" alt="${book.title} cover" loading="lazy" /></div>
    <h3>${book.title}</h3>
    <p class="tagline">${book.tagline}</p>
    <div class="row">
      <span class="price">${book.price}</span>
      <span class="link-more">View details →</span>
    </div>`;
  card.addEventListener("click", () => openModal(book));
  grid.appendChild(card);
});

/* ---------- 3D tilt on cards ---------- */
document.querySelectorAll(".book-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(6px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateY(0deg) rotateX(0deg)";
  });
});

/* ---------- hero book: follows the mouse + gentle float ---------- */
const heroBook = document.getElementById("heroBook");
if (heroBook) {
  const inner = heroBook.querySelector(".book3d-inner");
  let raf = null;
  document.querySelector(".hero").addEventListener("mousemove", (e) => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      inner.style.transform = `rotateY(${-24 + x * 22}deg) rotateX(${6 - y * 16}deg)`;
      raf = null;
    });
  });
  // idle float
  let t = 0;
  setInterval(() => {
    t += 0.04;
    heroBook.style.transform = `translateY(${Math.sin(t) * 8}px)`;
  }, 40);
}

/* ---------- modal ---------- */
const backdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");

function openModal(book) {
  document.getElementById("modalCover").src = book.cover;
  document.getElementById("modalCover").alt = book.title + " cover";
  document.getElementById("modalKicker").textContent = book.kicker;
  document.getElementById("modalTitle").textContent = book.title;
  document.getElementById("modalTagline").textContent = book.tagline;
  document.getElementById("modalDesc").textContent = book.desc;
  document.getElementById("modalPrice").textContent = book.price;
  document.getElementById("modalPoints").innerHTML =
    book.points.map((p) => `<li>${p}</li>`).join("");

  const buy = document.getElementById("modalBuy");
  if (book.buyUrl) {
    buy.href = book.buyUrl;
    buy.textContent = "Buy now";
    buy.removeAttribute("disabled");
  } else {
    buy.href = "#books";
    buy.textContent = "Link coming soon";
    buy.setAttribute("disabled", "");
  }

  backdrop.hidden = false;
  requestAnimationFrame(() => backdrop.classList.add("show"));
  document.body.style.overflow = "hidden";
}

function closeModal() {
  backdrop.classList.remove("show");
  document.body.style.overflow = "";
  setTimeout(() => { backdrop.hidden = true; }, 250);
}

modalClose.addEventListener("click", closeModal);
backdrop.addEventListener("click", (e) => {
  if (e.target === backdrop) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !backdrop.hidden) closeModal();
});

/* ---------- scroll reveal ---------- */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), (i % 4) * 90);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* ---------- header shadow on scroll ---------- */
const header = document.getElementById("siteHeader");
window.addEventListener("scroll", () => {
  header.style.boxShadow = window.scrollY > 10
    ? "0 8px 30px -12px rgba(25,23,19,0.25)"
    : "none";
}, { passive: true });
