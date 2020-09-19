import { readable } from "svelte/store";
import { Session } from "svelte-session-manager";
import App from "./App.svelte";

export const session = new Session(localStorage);

export const serviceWorker = readable({ state: "unknown" }, set => {
  navigator.serviceWorker
    .register("bundle.service-worker.mjs")
    .then(serviceWorkerRegistration => {
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

export default new App({
  target: document.body
});
