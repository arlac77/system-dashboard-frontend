import { readable } from "svelte/store";
import { Session } from "svelte-session-manager";
import App from "./App.svelte";

export const session = new Session(localStorage);

let serviceWorkerRegistration;

export const serviceWorker = readable({ state: "initial" }, set => {
  for (const state of ["installing", "waiting", "active"]) {
    const sw = serviceWorkerRegistration[state];
    if (sw) {
      set({ state: sw.state });
      sw.onstatechange = event => set({ state: event.target.state });
    }
  }

  return () => {};
});

async function init() {
  serviceWorkerRegistration = await navigator.serviceWorker.register(
    "bundle.service-worker.mjs"
  );
}

init();

export default new App({
  target: document.body
});
