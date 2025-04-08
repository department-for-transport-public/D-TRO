// === Master script for D-TRO HTML User Guide ===

let currentMatchIndex = -1;
let matchElements = [];
let matches = [];

document.addEventListener("DOMContentLoaded", function () {
  setupFigures();
  setupLinks();
  setupDocumentSearch();
  setupLightbox();
  generateTOC();

  // Ensure these elements exist in your HTML
  const searchInput = document.getElementById('site-search');
  const searchButton = document.getElementById('searchButton');
  const prevMatchButton = document.getElementById('prevMatch');
  const nextMatchButton = document.getElementById('nextMatch');
  const clearSearchButton = document.getElementById('clearSearch');

  if (searchInput && searchButton && prevMatchButton && nextMatchButton && clearSearchButton) {
    searchButton.addEventListener('click', searchText);
    prevMatchButton.addEventListener('click', prevMatch);
    nextMatchButton.addEventListener('click', nextMatch);
    clearSearchButton.addEventListener('click', resetSearch);
  }
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

  // Center and style figure titles
  paragraphs.forEach(p => {
    if (/^Figure\s*\d+\s*[-–]/i.test(p.textContent.trim())) {
      p.style.textAlign = "center";
      p.style.fontWeight = "bold";
      p.style.marginTop = "1rem";
    }
  });

  // Fix Figure2 to Figure 2 and unwrap anchor tags
  const anchors = document.querySelectorAll("p a");
  anchors.forEach(anchor => {
    const parent = anchor.parentElement;
    anchor.textContent = anchor.textContent.replace(/Figure(\d+)/, 'Figure $1');
    if (parent && /^Figure\s*\d+/i.test(parent.textContent.trim())) {
      const span = document.createElement("span");
      span.textContent = anchor.textContent;
      anchor.replaceWith(span);
    }
  });
}

// === Convert [https://...] text into links and ensure all external links open in a new tab ===
function setupLinks() {
  document.querySelectorAll("p").forEach(p => {
    for (const node of [...p.childNodes]) {
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
    }
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

// === Live document-wide search with highlight + navigation ===
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

  if (btnNext) {
    btnNext.addEventListener("click", () => {
      if (!matchElements.length) return;
      currentMatchIndex = (currentMatchIndex + 1) % matchElements.length;
      updateCurrentHighlight();
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener("click", () => {
      if (!matchElements.length) return;
      currentMatchIndex = (currentMatchIndex - 1 + matchElements.length) % matchElements.length;
      updateCurrentHighlight();
    });
  }

  if (btnClear) {
    btnClear.addEventListener("click", () => {
      input.value = "";
      clearHighlights();
      matchElements = [];
      currentMatchIndex = -1;
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

function updateCurrentHighlight() {
  matchElements.forEach(el => el.classList.remove("highlight-current"));
  const current = matchElements[currentMatchIndex];
  current.classList.add("highlight-current");
  current.scrollIntoView({ behavior: "smooth", block: "center" });
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

// === (Optional) Generate TOC from headings ===
function generateTOC() {
  const tocList = document.getElementById("toc-list");
  if (!tocList) return;

  const headers = document.querySelectorAll("h1, h2, h3");
  headers.forEach((header, index) => {
    if (!header.id) {
      header.id = `section-${index}`;
    }

    const link = document.createElement("a");
    link.href = `#${header.id}`;
    link.textContent = header.textContent;

    const li = document.createElement("li");
    li.appendChild(link);
    tocList.appendChild(li);
  });
}

document.getElementById('searchButton').addEventListener('click', searchText);
document.getElementById('prevMatch').addEventListener('click', prevMatch);
document.getElementById('nextMatch').addEventListener('click', nextMatch);
document.getElementById('clearSearch').addEventListener('click', resetSearch);

function searchText() {
    const searchTerm = document.getElementById('site-search').value.toLowerCase();
    const mainContent = document.querySelector('main');
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    
    // Clear previous highlights
    mainContent.innerHTML = mainContent.innerHTML.replace(/<mark class="highlight">|<\/mark>/g, '');

    if (!searchTerm) {
        resetSearch();
        return;
    }

    // Highlight matches
    mainContent.innerHTML = mainContent.innerHTML.replace(regex, '<mark class="highlight">$1</mark>');
    matches = Array.from(mainContent.querySelectorAll('mark.highlight'));

    if (matches.length > 0) {
        currentMatchIndex = 0;
        updateMatchInfo();
        scrollToMatch();
    } else {
        document.getElementById('matchCounter').textContent = 'No matches found';
    }
}

function scrollToMatch() {
    if (matches.length > 0) {
        matches.forEach(match => match.classList.remove('active'));
        matches[currentMatchIndex].classList.add('active');
        matches[currentMatchIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function nextMatch() {
    if (matches.length > 0) {
        currentMatchIndex = (currentMatchIndex + 1) % matches.length;
        updateMatchInfo();
        scrollToMatch();
    }
}

function prevMatch() {
    if (matches.length > 0) {
        currentMatchIndex = (currentMatchIndex - 1 + matches.length) % matches.length;
        updateMatchInfo();
        scrollToMatch();
    }
}

function resetSearch() {
    const mainContent = document.querySelector('main');
    mainContent.innerHTML = mainContent.innerHTML.replace(/<mark class="highlight">|<\/mark>/g, '');
    document.getElementById('site-search').value = '';
    document.getElementById('matchCounter').textContent = '';
    matches = [];
    currentMatchIndex = -1;
}

function updateMatchInfo() {
    document.getElementById('matchCounter').textContent = `${currentMatchIndex + 1} / ${matches.length}`;
}
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".main-nav a");

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY + 150; // Offset for fixed header/hero

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
});
