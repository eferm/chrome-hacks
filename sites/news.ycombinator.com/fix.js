// Compress HN's indent spacer images (<img width="40*depth">) so deep threads
// fit inside our 65ch wrapper instead of overflowing and getting clipped by
// `body > center { overflow: hidden }`.
//
// Also pin the enclosing td.ind width inline: without this, the browser gives
// empty (depth-0) cells a small minimum width, making the first step of the
// indent ladder ~3px shorter than the rest.

const SCALE = 0.4;

function scaleOne(img) {
  const td = img.closest('.ind');
  let orig = img.dataset.chOrigWidth;
  if (orig === undefined) {
    const attr = img.getAttribute('width');
    if (!attr) return;
    orig = attr;
    img.dataset.chOrigWidth = attr;
  }
  const n = parseInt(orig, 10);
  const scaled = n > 0 ? Math.round(n * SCALE) : 0;
  img.setAttribute('width', scaled);
  td.style.setProperty('width', scaled + 'px', 'important');
}

function restoreOne(img) {
  const td = img.closest('.ind');
  const orig = img.dataset.chOrigWidth;
  if (orig !== undefined) img.setAttribute('width', orig);
  td.style.removeProperty('width');
}

function apply(enabled) {
  const imgs = document.querySelectorAll('.ind img');
  for (const img of imgs) (enabled ? scaleOne : restoreOne)(img);
}

function init() {
  chrome.storage.local.get('enabled', ({ enabled = true }) => apply(enabled));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

chrome.storage.onChanged.addListener((changes) => {
  if ('enabled' in changes) apply(changes.enabled.newValue);
});
