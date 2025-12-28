import { initializeServiceWorker } from "svelte-common";

const { serviceWorker, serviceWorkerRegistration } = initializeServiceWorker(
  "service-worker/main.mjs",
  { type: "module" }
);
export { serviceWorker, serviceWorkerRegistration };
