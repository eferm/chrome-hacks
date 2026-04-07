# Chrome Hacks

A personal Brave/Chrome extension that applies per-website CSS overrides and JS fixes. The goal is a single extension that houses all site-specific tweaks — narrower layouts, hidden annoyances, behavioral fixes — organized so that each site is isolated and adding a new one is trivial.

## Architecture

This is a Manifest V3 extension using **declarative content scripts**. Each site gets:

1. A directory under `sites/` named after its hostname (e.g., `sites/news.ycombinator.com/`)
2. A `styles.css` and/or `fix.js` inside that directory
3. A corresponding `content_scripts` entry in `manifest.json`

A background service worker (`background.js`) powers the toolbar toggle button. A shared `toggle.js` content script is injected into every site to enable/disable overrides without removing the extension.

All CSS selectors are prefixed with `html:not(.chrome-hacks-off)` so the toggle script can disable them by adding a class to `<html>`.

## Adding a new site

1. Create `sites/<hostname>/` with `styles.css` and/or `fix.js`
2. Prefix all CSS selectors with `html:not(.chrome-hacks-off)` so the toggle works
3. Add an entry to the `content_scripts` array in `manifest.json`:
   ```json
   {
     "matches": ["*://<hostname>/*"],
     "css": ["sites/<hostname>/styles.css"],
     "js": ["toggle.js"],
     "run_at": "document_start"
   }
   ```
   Include `"sites/<hostname>/fix.js"` in the `js` array if the site needs JS fixes.
4. Reload the extension in `brave://extensions`

## Toggle

Click the extension icon in the toolbar to toggle all overrides on/off. An "OFF" badge appears on the icon when disabled. State persists across browser restarts.

## Installation

1. Clone this repo
2. Open `brave://extensions` (or `chrome://extensions`)
3. Enable **Developer mode** (toggle in the top-right corner)
4. Click **Load unpacked** and select the repo directory
5. The extension is now active — navigate to a supported site to verify
