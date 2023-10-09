
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service-worker.js', { scope: '/' })
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  }
  
  window.addEventListener('load', () => {
    if (!navigator.onLine) {
      offlineMessage();
    }
  });
  
  function offlineMessage() {
    const output = document.getElementById('main-cont');
    output.innerHTML = `
      <div id="offline">
          <div id="offline-content">
            <h3>No Connection</h3>
            <p>Sorry, but this page is not available offline.</p>
          </div>
      </div>
      `;
  }
  