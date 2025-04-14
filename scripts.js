// === Master script for D-TRO HTML User Guide ===

document.addEventListener("DOMContentLoaded", function () {
  setupFigures();
  setupLinks();
  setupLightbox();
});

// === Insert figure images under proper captions ===
function setupFigures() {
  const paragraphs = document.querySelectorAll("p");

  paragraphs.forEach((p) => {
    if (p.dataset.figureInserted === "true") return;

    const text = p.textContent.trim();

    // Only match if paragraph starts with "Figure X – ..." with separator
    const match = text.match(/^Figure\s*(\d+)\s*[\-–:]\s+/i);

    if (match) {
      const figNum = match[1];
      const imgPath = `images/data_model_images/fig${figNum}.png`;

      const wrapper = document.createElement("div");
      wrapper.className = "figure-wrapper";

      const caption = p.cloneNode(true);
      caption.classList.add("figure-caption");

      const img = document.createElement("img");
      img.src = imgPath;
      img.alt = `Figure ${figNum}`;
      img.style.width = "600px";
      img.style.height = "auto";

      wrapper.appendChild(caption);
      wrapper.appendChild(img);
      p.parentNode.replaceChild(wrapper, p);

      wrapper.dataset.figureInserted = "true";

      console.log(`✅ Inserted Figure ${figNum}: ${imgPath}`);
    }
  });
}

// === Convert [https://...] to clickable links ===
function setupLinks() {
  document.querySelectorAll("p").forEach((p) => {
    [...p.childNodes].forEach((node) => {
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

  // Ensure external links open in new tab
  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (
      href &&
      !href.startsWith("#") &&
      !href.startsWith("mailto:") &&
      !href.startsWith("tel:")
    ) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }
  });
}

// === Lightbox for figure images ===
function setupLightbox() {
  const imgs = document.querySelectorAll(".figure-wrapper img");

  imgs.forEach((img) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => openLightbox(img.src, img.alt));
  });

  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (
        e.target.id === "lightbox" ||
        e.target.className === "lightbox-close"
      ) {
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
