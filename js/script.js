// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("/service-worker.js", { scope: "/" })
//     .then((registration) => {
//       console.log("Register Success", registration);
//     })
//     .catch((error) => {
//       console.log("Register Failed", error);
//     });
// } else {
//   console.log("Service workers is not supported.");
// }

window.addEventListener("load", () => {
  if (navigator.onLine) {
    navigator.serviceWorker
      .register("/service-worker.js", { scope: "/" })
      .then((registration) => {
        console.log("Register Success", registration);
      })
      .catch((error) => {
        console.log("Register Failed", error);
      });
  } else {
    offlinepage();
  }
});

function offlinepage() {
  const output = document.getElementById("main-cont");
  output.innerHTML = `
    <div id="offline">
        <div id="offline-content">
          <h3>No Connection</h3>
          <p>Sorry!, but this page is not available offline.</p>
        </div>
    </div>
    `;
}
