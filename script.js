// DOM Elements
const urlInput = document.getElementById('urlInput');
const goBtn = document.getElementById('goBtn');
const proxyFrame = document.getElementById('proxyFrame');
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const saveSettings = document.getElementById('saveSettings');
const closeSettings = document.getElementById('closeSettings');
const currentTab = document.getElementById('currentTab');
const pageTitle = document.getElementById('pageTitle');
const favicon = document.getElementById('favicon');
const loadingOverlay = document.getElementById('loadingOverlay');

// Default Settings (stored in localStorage for persistence across sessions)
let settings = JSON.parse(localStorage.getItem('stealthProxySettings')) || {
  browserName: 'Stealth Browser',
  cloakTitle: 'Google Docs',
  cloakFavicon: 'https://docs.google.com/favicon.ico'
};

// Apply Cloaking on Load
applyCloaking();

// Event Listeners
goBtn.addEventListener('click', handleSearch);
urlInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleSearch();
});

settingsBtn.addEventListener('click', () => {
  settingsPanel.classList.toggle('show');
});

saveSettings.addEventListener('click', () => {
  settings.browserName = document.getElementById('browserName').value || 'Stealth Browser';
  settings.cloakTitle = document.getElementById('cloakTitle').value || 'Google Docs';
  settings.cloakFavicon = document.getElementById('cloakFavicon').value || 'https://docs.google.com/favicon.ico';
  localStorage.setItem('stealthProxySettings', JSON.stringify(settings));
  applyCloaking();
  settingsPanel.classList.remove('show');
  alert('Settings saved!');
});

closeSettings.addEventListener('click', () => {
  settingsPanel.classList.remove('show');
});

// Handle Search (Keeps Inside Site, No Redirects)
// This function processes the user input, validates it, and loads the content into the iframe via the proxy.
// It ensures no new tabs are opened, hiding browsing history from the browser's tab bar or history.
function handleSearch() {
  const query = urlInput.value.trim();
  if (!query) return;

  loadingOverlay.style.display = 'flex'; // Show loading animation
  setTimeout(() => loadingOverlay.style.display = 'none', 2000); // Hide after 2s (simulate load time)

  let url = query;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url; // Assume HTTPS for security
  }

  try {
    new URL(url); // Validate URL format
    proxyFrame.src = https://school-proxy.up.railway.app/?url=${encodeURIComponent(url)};
    currentTab.textContent = settings.browserName + ' - ' + new URL(url).hostname;
  } catch (e) {
    alert('Invalid URL or search query.');
  }
}

// Apply Tab Cloaking
// Tab cloaking disguises the browser tab to look like a legitimate site (e.g., Google Docs) to avoid detection.
// This function updates the page title, favicon, and tab display name based on user settings.
// - pageTitle: Changes the <title> tag, which appears in the browser tab.
// - favicon: Dynamically sets the <link rel="icon"> href to the specified URL, matching the cloak (e.g., Google Docs favicon).
// - currentTab: Updates the in-page tab display to reflect the cloaked name.
// This works by manipulating DOM elements in real-time, ensuring the tab appears innocuous even if inspected.
function applyCloaking() {
  pageTitle.textContent = settings.cloakTitle; // Sets the browser tab title to the cloak title (e.g., "Google Docs")
  favicon.href = settings.cloakFavicon; // Changes the favicon to the cloak favicon URL, making the tab icon match (e.g., Google Docs icon)
  currentTab.textContent = settings.cloakTitle; // Updates the visible tab in the UI to the cloak title
}

// Pre-populate Settings Inputs
// Loads saved settings into the input fields when the page loads or settings panel opens.
document.getElementById('browserName').value = settings.browserName;
document.getElementById('cloakTitle').value = settings.cloakTitle;
document.getElementById('cloakFavicon').value = settings.cloakFavicon;
