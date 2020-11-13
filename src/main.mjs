import { initializeServiceWorker } from "svelte-common";
import App from "./App.svelte";

const { serviceWorker, serviceWorkerRegistration } = initializeServiceWorker("bundle.service-worker.mjs");
export { serviceWorker, serviceWorkerRegistration };

export default new App({
  target: document.body
});
