import { readable } from "svelte/store";
import { Session } from "svelte-session-manager";
import App from "./App.svelte";

export const session = new Session(localStorage);

let serviceWorkerRegistration;

export const serviceWorker = readable({ state: "initial" }, set => {
  for (const state of ["active", "waiting", "installing"]) {
    const sw = serviceWorkerRegistration[state];
    if (sw) {
      set({ state: sw.state, sw });
      sw.onstatechange = event => set({ state: event.target.state, sw });
      return;
    }
  }

  set({ state: "unknown", "sw" : {} });

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
