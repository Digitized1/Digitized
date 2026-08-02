# Clearlane

A multi-page marketing site for **Clearlane**, a fictional operations/virtual-assistant agency. Built with plain HTML, CSS, and JS — no build step, ready for GitHub Pages.

## Pages
- `index.html` — Home
- `about.html` — About
- `services.html` — Services
- `founders.html` — Founders Circle
- `ebook.html` — Free Guide (lead magnet)
- `contact.html` — Book a Call

## Structure
```
clearlane/
├── index.html
├── about.html
├── services.html
├── founders.html
├── ebook.html
├── contact.html
├── css/style.css
├── js/main.js
└── README.md
```

## Run locally
Just open `index.html` in a browser, or serve the folder:
```
python3 -m http.server 8000
```

## Deploy to GitHub Pages
1. `git init && git add . && git commit -m "Initial Clearlane site"`
2. Push to a GitHub repo
3. In repo Settings → Pages, set source to the `main` branch, root folder
