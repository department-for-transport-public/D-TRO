document.addEventListener("DOMContentLoaded", function () {
  buildNavbar();
  setupLightbox();
});

function buildNavbar() {
  // Dynamically builds the Navbar from the header content
  const links = document.querySelectorAll('[data-number]');
  const navList = document.querySelector('.main-nav');

  let currentSectionLi = null;
  let currentSubList = null;

  links.forEach((heading) => {
    const num = heading.dataset.number;
    const text = heading.textContent.trim();
    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.textContent = `${num} ${text.replace(/^[\d.]+\s*/, '')}`;

    if (/^\d+$/.test(num)) {
      const li = document.createElement('li');
      li.appendChild(link);

      currentSubList = document.createElement('ul');
      currentSubList.className = 'dropdown';
      li.appendChild(currentSubList);

      navList.appendChild(li);
      currentSectionLi = li;
    } else if (/^\d+\.\d+/.test(num) && currentSubList) {
      const subLi = document.createElement('li');
      subLi.appendChild(link);
      currentSubList.appendChild(subLi);
    }
  });

  const elementsToLink = document.querySelectorAll('.main-nav a');
  for (let i = 0; i < links.length; i++) {
    const element = elementsToLink[i];
    const link = links[i];
    element.href = `#${link.id}`;
  }
}

function setupLightbox() {
  const imgs = document.querySelectorAll("img");

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
