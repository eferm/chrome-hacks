function updateBadge(enabled) {
  chrome.action.setBadgeText({ text: enabled ? '' : 'OFF' });
  chrome.action.setBadgeBackgroundColor({ color: '#888888' });
}

chrome.action.onClicked.addListener(async () => {
  const { enabled = true } = await chrome.storage.local.get('enabled');
  const newState = !enabled;
  chrome.storage.local.set({ enabled: newState });
  updateBadge(newState);
});

(async () => {
  const { enabled = true } = await chrome.storage.local.get('enabled');
  updateBadge(enabled);
})();
