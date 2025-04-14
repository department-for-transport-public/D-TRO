// === Document Search Without Overwriting Content ===

let currentMatchIndex = -1;
let matches = [];

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("site-search");
  const btnSearch = document.getElementById("searchButton");
  const btnNext = document.getElementById("nextMatch");
  const btnPrev = document.getElementById("prevMatch");
  const btnClear = document.getElementById("clearSearch");
  const counter = document.getElementById("matchCounter");
  const mainContent = document.getElementById("document-body");

  if (!input || !mainContent) return;

  btnSearch?.addEventListener("click", () => searchText(input.value.trim()));
  btnClear?.addEventListener("click", clearSearch);
  btnNext?.addEventListener("click", () => updateMatch("next"));
  btnPrev?.addEventListener("click", () => updateMatch("prev"));

  function searchText(query) {
    clearSearch();

    if (!query || query.length < 2) {
      counter.textContent = "";
      return;
    }

    const regex = new RegExp(escapeRegExp(query), "gi");

    const walker = document.createTreeWalker(
      mainContent,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) =>
          node.parentNode &&
          node.nodeValue.match(regex) &&
          node.parentNode.nodeName !== "SCRIPT"
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP,
      }
    );

    const nodes = [];

    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }

    nodes.forEach((node) => {
      const span = document.createElement("span");
      span.innerHTML = node.nodeValue.replace(
        regex,
        (match) => `<mark class="highlight">${match}</mark>`
      );
      node.parentNode.replaceChild(span, node);
    });

    matches = Array.from(mainContent.querySelectorAll("mark.highlight"));

    if (matches.length) {
      currentMatchIndex = 0;
      updateMatch("current");
    } else {
      counter.textContent = "No matches found";
    }
  }

  function updateMatch(direction) {
    if (!matches.length) return;

    matches.forEach((m) => m.classList.remove("active"));

    if (direction === "next") {
      currentMatchIndex = (currentMatchIndex + 1) % matches.length;
    } else if (direction === "prev") {
      currentMatchIndex =
        (currentMatchIndex - 1 + matches.length) % matches.length;
    }

    matches[currentMatchIndex].classList.add("active");
    matches[currentMatchIndex].scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    counter.textContent = `${currentMatchIndex + 1} / ${matches.length}`;
  }

  function clearSearch() {
    // 1. Remove highlights
    const highlights = mainContent.querySelectorAll("mark.highlight");
    highlights.forEach((mark) => {
      const parent = mark.parentNode;
      parent.replaceChild(document.createTextNode(mark.textContent), mark);
      parent.normalize();
    });

    // 2. Reset state
    matches = [];
    currentMatchIndex = -1;
    counter.textContent = "";
    input.value = "";

    // 3. Scroll to top of welcome section with offset
    const welcomeSection = document.getElementById("welcome-section");
    const offset = 200; // Adjust this to match your fixed nav height

    // Scroll to top position minus offset (so content is visible)
    const topPos =
      welcomeSection.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top: topPos,
      behavior: "smooth",
    });
  }

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
});
