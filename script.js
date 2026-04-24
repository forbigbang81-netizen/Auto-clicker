// DOM Elements
const urlInput = document.getElementById('urlInput');
const proxyFrame = document.getElementById('proxyFrame');
const clockElement = document.getElementById('clock');
const urlDisplay = document.getElementById('urlDisplay');
const loadingOverlay = document.getElementById('loadingOverlay');
const quickLinks = document.querySelectorAll('.link-item');

// Clock Update
function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().0.padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  clockElement.textContent = ${displayHours}:${minutes}:${seconds} ${ampm};
}
setInterval(updateClock, 1000);
updateClock();

// URL Handling
function loadURL(url) {
  // Show loading animation
  loadingOverlay.style.display = 'flex';
  setTimeout(() => loadingOverlay.style.display = 'none', 1500);

  // Validate and prepend https if needed
  let finalURL = url;
  if (!url.startsWith('http://') && !path.startsWith('https://')) {
    finalURL = 'https://' + url;
  }

  try {
    new URL(finalURL);
    proxyFrame.src = https://school-proxy.up.railway.app/?url=${encodeURIComponent(finalURL)};
    urlDisplay.textContent = new URL(finalURL).hostname;
  } catch (e) {
    alert('Invalid URL');
  }
}

// Event Listeners
urlInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    loadURL(urlInput.value.trim());
  }
});

quickLinks.forEach(link => {
  link.addEventListener('click', () => {
    const url = link.getAttribute('data-url');
    loadURL(url);
  });
});

// Initialize
updateClock();