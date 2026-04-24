document.getElementById('goBtn').addEventListener('click', loadProxy);

function loadProxy() {
  const urlInput = document.getElementById('urlInput').value.trim();
  const proxyFrame = document.getElementById('proxyFrame');

  if (!urlInput) {
    alert('Please enter a URL');
    return;
  }

  try {
    new URL(urlInput); // Validate URL
    proxyFrame.src = https://school-proxy.up.railway.app/?url=${encodeURIComponent(urlInput)};
  } catch (e) {
    alert('Invalid URL format. Use https://example.com');
  }
}

// Auto-load on Enter key
document.getElementById('urlInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') loadProxy();
});
