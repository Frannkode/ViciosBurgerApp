// Registrar el Service Worker para PWA
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js")
    .then(() => console.log("✅ Service Worker registrado"))
    .catch(err => console.log("❌ Error SW:", err));
}