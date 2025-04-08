// === Modular Document Search with original content restore ===

let currentMatchIndex = -1;
let matches = [];
let originalContent = "";

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("site-search");
  const btnSearch = document.getElementById("searchButton");
  const btnNext = document.getElementById("nextMatch");
  const btnPrev = document.getElementById("prevMatch");
  const btnClear = document.getElementById("clearSearch");
  const counter = document.getElementById("matchCounter");
  const mainContent = document.getElementById("document-body");

  if (!input || !mainContent) return;

  // Cache the original content once
  originalContent = mainContent.innerHTML;

  btnSearch?.addEventListener("click", () => searchText(input.value.trim()));
  btnClear?.addEventListener("click", clearSearch);
  btnNext?.addEventListener("click", () => updateMatch("next"));
  btnPrev?.addEventListener("click", () => updateMatch("prev"));

  function searchText(query) {
    matches = [];

    if (!query || query.length < 2) {
      resetState();
      return;
    }

    const regex = new RegExp(`(${escapeRegExp(query)})`, "gi");
    mainContent.innerHTML = originalContent.replace(
      regex,
      '<mark class="highlight">$1</mark>'
    );

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
    mainContent.innerHTML = originalContent;
    input.value = "";
    resetState();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetState() {
    matches = [];
    currentMatchIndex = -1;
    counter.textContent = "";
  }

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
});
