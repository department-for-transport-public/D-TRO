// === Master script for D-TRO HTML User Guide ===

// let currentMatchIndex = -1;
// let matchElements = [];
// let matches = [];

// DOM loaded setup
document.addEventListener("DOMContentLoaded", function () {
  setupFigures();
  setupLinks();
  setupLightbox();
  setupSectionHighlight();
});

// === Auto-insert figure images based on paragraph labels ===
function setupFigures() {
  const paragraphs = document.querySelectorAll("p");

  paragraphs.forEach((p) => {
    // Flexible match: handles "Figure 1", "Figure 2 –", "Figure 3:", etc.
    const match = p.textContent.match(/Figure\s*(\d+)[\s:–-]?/i);

    if (match) {
      const figNum = match[1];
      const imgPath = `images/data_model_images/fig${figNum}.png`;

      const img = document.createElement("img");
      img.src = imgPath;
      img.alt = `Figure ${figNum}`;
      img.style.width = "600px";
      img.style.height = "auto";

      const wrapper = document.createElement("div");
      wrapper.className = "figure-center";
      wrapper.appendChild(img);

      p.parentNode.insertBefore(wrapper, p.nextSibling);

      // Debugging: log matches and image paths
      console.log(`✅ Inserted Figure ${figNum}: ${imgPath}`);
    }
  });
}

// Style figure titles
paragraphs.forEach((p) => {
  if (/^Figure\s*\d+\s*[-–]/i.test(p.textContent.trim())) {
    p.style.textAlign = "center";
    p.style.fontWeight = "bold";
    p.style.marginTop = "1rem";
  }
});

// Fix Figure2 to Figure 2 and unwrap anchor tags
document.querySelectorAll("p a").forEach((anchor) => {
  const parent = anchor.parentElement;
  anchor.textContent = anchor.textContent.replace(/Figure(\d+)/, "Figure $1");
  if (parent && /^Figure\s*\d+/i.test(parent.textContent.trim())) {
    const span = document.createElement("span");
    span.textContent = anchor.textContent;
    anchor.replaceWith(span);
  }
});
// === Convert [https://...] text into links ===
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

// === Fullscreen lightbox for figure images ===
function setupLightbox() {
  const imgs = document.querySelectorAll(".figure-center img");
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
