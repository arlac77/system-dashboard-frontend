import { Router, route, NotFound, Guard } from "svelte-guard-history-router";
import { Session } from "svelte-session-manager";


import App from "./App.svelte";

export const session = new Session(localStorage);

export const router = new Router(
  [
    route("*", NotFound)
  ],
  config.urlPrefix
);

export default new App({
  target: document.body
});
