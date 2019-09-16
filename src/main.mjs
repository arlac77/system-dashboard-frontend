import { Router, route, NotFound } from "svelte-guard-history-router";
import { Session } from "svelte-session-manager";
import About from "./pages/About.svelte";
import { config } from "../package.json";


import App from "./App.svelte";

export const session = new Session(localStorage);

export const router = new Router(
  [
    route("*", NotFound),
    route("/about", About),
  ],
  config.urlPrefix
);

export default new App({
  target: document.body
});
