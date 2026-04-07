function applyState(enabled) {
  document.documentElement.classList.toggle('chrome-hacks-off', !enabled);
}

chrome.storage.local.get('enabled', ({ enabled = true }) => {
  applyState(enabled);
});

chrome.storage.onChanged.addListener((changes) => {
  if ('enabled' in changes) {
    applyState(changes.enabled.newValue);
  }
});
