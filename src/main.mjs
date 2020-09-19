import { readable } from "svelte/store";
import { Session } from "svelte-session-manager";
import App from "./App.svelte";

export const session = new Session(localStorage);

export function initializeServiceWorker(script) {
  const serviceWorker = readable({ state: "unknown" }, set => {
    navigator.serviceWorker
      .register(script)
      .then(serviceWorkerRegistration => {
        // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/update
        for (const state of ["active", "waiting", "installing"]) {
          const sw = serviceWorkerRegistration[state];
          if (sw) {
            set(sw);
            sw.onstatechange = event => set(sw);
            return;
          }
        }
      });

    return () => {};
  });

  return { serviceWorker };
}

const { serviceWorker } = initializeServiceWorker("bundle.service-worker.mjs");
export { serviceWorker };

export default new App({
  target: document.body
});
