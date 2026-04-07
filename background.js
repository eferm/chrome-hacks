chrome.action.onClicked.addListener(async () => {
  const { enabled = true } = await chrome.storage.local.get('enabled');
  const newState = !enabled;
  await chrome.storage.local.set({ enabled: newState });
  chrome.action.setBadgeText({ text: newState ? '' : 'OFF' });
  chrome.action.setBadgeBackgroundColor({ color: '#888888' });
});

// Set initial badge on service worker start
chrome.storage.local.get('enabled', ({ enabled = true }) => {
  if (!enabled) {
    chrome.action.setBadgeText({ text: 'OFF' });
    chrome.action.setBadgeBackgroundColor({ color: '#888888' });
  }
});
