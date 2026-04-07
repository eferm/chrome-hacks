# Chrome Hacks

A personal Brave/Chrome extension that applies per-website CSS overrides and JS fixes. The goal is a single extension that houses all site-specific tweaks — narrower layouts, hidden annoyances, behavioral fixes — organized so that each site is isolated and adding a new one is trivial.

## Architecture

This is a Manifest V3 extension using **declarative content scripts**. Each site gets:

1. A directory under `sites/` named after its hostname (e.g., `sites/news.ycombinator.com/`)
2. A `styles.css` and/or `fix.js` inside that directory
3. A corresponding `content_scripts` entry in `manifest.json`

There is no build system, no background service worker, no popup UI. CSS is injected at `document_start` to avoid flash of unstyled content.

## Adding a new site

1. Create `sites/<hostname>/` with `styles.css` and/or `fix.js`
2. Add an entry to the `content_scripts` array in `manifest.json`:
   ```json
   {
     "matches": ["*://<hostname>/*"],
     "css": ["sites/<hostname>/styles.css"],
     "run_at": "document_start"
   }
   ```
   Include `"js": ["sites/<hostname>/fix.js"]` if the site needs JS fixes.
3. Reload the extension in `brave://extensions`

## Installation

1. Clone this repo
2. Open `brave://extensions` (or `chrome://extensions`)
3. Enable **Developer mode** (toggle in the top-right corner)
4. Click **Load unpacked** and select the repo directory
5. The extension is now active — navigate to a supported site to verify
