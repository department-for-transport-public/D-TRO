// === Master script for D-TRO HTML User Guide ===

let currentMatchIndex = -1;
let matchElements = [];
let matches = [];

// DOM loaded setup
document.addEventListener("DOMContentLoaded", function () {
  setupFigures();
  setupLinks();
  setupDocumentSearch();
  setupLightbox();
  generateTOC();
  setupSectionHighlight();
  setupMainSearchControls();
});

// === Auto-insert figure images based on paragraph labels ===
function setupFigures() {
  const paragraphs = document.querySelectorAll("p");
  paragraphs.forEach(p => {
    const match = p.textContent.match(/Figure\s*(\d+)\s*[-–]/i);
    if (match) {
      const figNum = match[1];
      const img = document.createElement("img");
      img.src = `images/data_model_images/fig${figNum}.png`;
      img.alt = `Figure ${figNum}`;
      img.style.width = '600px';
      img.style.height = 'auto';

      const wrapper = document.createElement("div");
      wrapper.className = "figure-center";
      wrapper.appendChild(img);
      p.parentNode.insertBefore(wrapper, p.nextSibling);
    }
  });

  // Style figure titles
  paragraphs.forEach(p => {
    if (/^Figure\s*\d+\s*[-–]/i.test(p.textContent.trim())) {
      p.style.textAlign = "center";
      p.style.fontWeight = "bold";
      p.style.marginTop = "1rem";
    }
  });

  // Fix Figure2 to Figure 2 and unwrap anchor tags
  document.querySelectorAll("p a").forEach(anchor => {
    const parent = anchor.parentElement;
    anchor.textContent = anchor.textContent.replace(/Figure(\d+)/, 'Figure $1');
    if (parent && /^Figure\s*\d+/i.test(parent.textContent.trim())) {
      const span = document.createElement("span");
      span.textContent = anchor.textContent;
      anchor.replaceWith(span);
    }
  });
}

// === Convert [https://...] text into links ===
function setupLinks() {
  document.querySelectorAll("p").forEach(p => {
    [...p.childNodes].forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        const urlPattern = /\[(https?:\/\/[^\]]+)\]/g;

        if (urlPattern.test(text)) {
          const replacedHTML = text.replace(urlPattern, (match, url) => {
            return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
          });

          const wrapper = document.createElement("span");
          wrapper.innerHTML = replacedHTML;
          p.replaceChild(wrapper, node);
        }
      }
    });
  });

  document.querySelectorAll("a[href]").forEach(link => {
    const href = link.getAttribute("href");
    if (href && !href.startsWith("#") && !href.startsWith("mailto:") && !href.startsWith("tel:")) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }
  });
}

// === Fullscreen lightbox for figure images ===
function setupLightbox() {
  const imgs = document.querySelectorAll(".figure-center img");
  imgs.forEach(img => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => openLightbox(img.src, img.alt));
  });

  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target.id === "lightbox" || e.target.className === "lightbox-close") {
        closeLightbox();
      }
    });
  }
}

function openLightbox(src, alt) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  if (img && lightbox) {
    img.src = src;
    img.alt = alt;
    lightbox.style.display = "flex";
  }
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) lightbox.style.display = "none";
}

// === Document search using #document-body ===
function setupMainSearchControls() {
  const mainContent = document.getElementById('document-body');
  const input = document.getElementById('site-search');
  const btnNext = document.getElementById('nextMatch');
  const btnPrev = document.getElementById('prevMatch');
  const btnClear = document.getElementById('clearSearch');
  const btnSearch = document.getElementById('searchButton');
  const counter = document.getElementById('matchCounter');

  if (!mainContent || !input || !btnSearch) return;

  function clearSearchHighlights() {
    mainContent.innerHTML = mainContent.innerHTML.replace(/<mark class="highlight">|<\/mark>/g, '');
    matches = [];
    currentMatchIndex = -1;
    counter.textContent = '';
  }

  function updateSearchCounter() {
    counter.textContent = matches.length > 0 ? `${currentMatchIndex + 1} / ${matches.length}` : '0 / 0';
  }

  function scrollToCurrentMatch() {
    matches.forEach(m => m.classList.remove('active'));
    if (matches[currentMatchIndex]) {
      matches[currentMatchIndex].classList.add('active');
      matches[currentMatchIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function runSearch() {
    const term = input.value.trim();
    if (!term) return clearSearchHighlights();
    const regex = new RegExp(`(${term})`, 'gi');
    clearSearchHighlights();
    mainContent.innerHTML = mainContent.innerHTML.replace(regex, '<mark class="highlight">$1</mark>');
    matches = Array.from(mainContent.querySelectorAll('mark.highlight'));
    if (matches.length > 0) {
      currentMatchIndex = 0;
      updateSearchCounter();
      scrollToCurrentMatch();
    } else {
      counter.textContent = 'No matches found';
    }
  }

  function nextMatch() {
    if (matches.length > 0) {
      currentMatchIndex = (currentMatchIndex + 1) % matches.length;
      updateSearchCounter();
      scrollToCurrentMatch();
    }
  }

  function prevMatch() {
    if (matches.length > 0) {
      currentMatchIndex = (currentMatchIndex - 1 + matches.length) % matches.length;
      updateSearchCounter();
      scrollToCurrentMatch();
    }
  }

  btnSearch.addEventListener('click', runSearch);
  btnClear.addEventListener('click', () => {
    input.value = '';
    clearSearchHighlights();
  });
  btnNext.addEventListener('click', nextMatch);
  btnPrev.addEventListener('click', prevMatch);
}

// === Live document-wide background search (optional) ===
function setupDocumentSearch() {
  const input = document.getElementById("search-input");
  const btnPrev = document.getElementById("search-prev");
  const btnNext = document.getElementById("search-next");
  const btnClear = document.getElementById("search-clear");

  if (!input) return;

  input.addEventListener("input", function () {
    const query = input.value.trim();
    clearHighlights();
    matchElements = [];
    currentMatchIndex = -1;

    if (query.length < 2) return;

    highlightMatches(document.body, query.toLowerCase());
    matchElements = Array.from(document.querySelectorAll(".highlight"));

    if (matchElements.length > 0) {
      currentMatchIndex = 0;
      updateCurrentHighlight();
    }
  });

  input.addEventListener("keydown", function (e) {
    if (!matchElements.length) return;
    if (e.key === "ArrowDown" || e.key === "Enter") {
      e.preventDefault();
      currentMatchIndex = (currentMatchIndex + 1) % matchElements.length;
      updateCurrentHighlight();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      currentMatchIndex = (currentMatchIndex - 1 + matchElements.length) % matchElements.length;
      updateCurrentHighlight();
    }
  });

  if (btnNext) btnNext.addEventListener("click", () => nextMatchHighlight());
  if (btnPrev) btnPrev.addEventListener("click", () => prevMatchHighlight());
  if (btnClear) btnClear.addEventListener("click", () => {
    input.value = "";
    clearHighlights();
    matchElements = [];
    currentMatchIndex = -1;
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function updateCurrentHighlight() {
  matchElements.forEach(el => el.classList.remove("highlight-current"));
  const current = matchElements[currentMatchIndex];
  if (current) {
    current.classList.add("highlight-current");
    current.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function clearHighlights() {
  document.querySelectorAll("span.highlight").forEach(span => {
    const parent = span.parentNode;
    parent.replaceChild(document.createTextNode(span.textContent), span);
    parent.normalize();
  });
}

function highlightMatches(root, query) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
  let node;
  while ((node = walker.nextNode())) {
    const text = node.nodeValue;
    const lower = text.toLowerCase();
    const index = lower.indexOf(query);
    if (index !== -1 && node.parentNode.nodeName !== "SCRIPT") {
      const before = text.slice(0, index);
      const match = text.slice(index, index + query.length);
      const after = text.slice(index + query.length);
      const highlight = document.createElement("span");
      highlight.className = "highlight";
      highlight.textContent = match;
      const fragment = document.createDocumentFragment();
      if (before) fragment.appendChild(document.createTextNode(before));
      fragment.appendChild(highlight);
      if (after) fragment.appendChild(document.createTextNode(after));
      node.parentNode.replaceChild(fragment, node);
    }
  }
}

// === Highlight active section in nav ===
function setupSectionHighlight() {
  const sections = document.querySelectorAll("#document-body section[id]");
  const navLinks = document.querySelectorAll(".main-nav a");

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY + 150;
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute("id");
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });
}