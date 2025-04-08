DTRO v3.4.0 User Guide
This repository contains the HTML-based user guide for the D-TRO Platform, version 3.4.0.

📂 Contents
index.html – Main landing page of the guide

style.css – Stylesheet for layout and design

scripts.js – JavaScript for interactivity, figure handling, and custom lightbox

search.js – Script for local search functionality

/images/ – Visual assets, including auto-inserted figures

🚀 Features
✅ Auto-inserted figure images based on paragraph captions like Figure 1 – ...

✅ Centered figure headings with corresponding images below

✅ Custom fullscreen lightbox for viewing figure images

✅ Responsive and accessible layout for modern browsers

📖 Usage
To view the guide locally:

Clone or download this repository.

Open index.html in your web browser.

💡 Figures will automatically display when paragraphs beginning with Figure 1 –, Figure 2 –, etc. are detected. Images are loaded from the /images/data_model_images/ folder.

🛠 Development Notes
The figure insertion logic is handled by setupFigures() in scripts.js.

Custom lightbox functionality is provided by setupLightbox() and supports zoom-in viewing for figure images.

Ensure all figure images follow the naming convention: fig1.png, fig2.png, etc.