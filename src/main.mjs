import { Router, route, NotFound } from "svelte-guard-history-router";
import { Session } from "svelte-session-manager";
import About from "./pages/About.svelte";
import Journal from "./pages/Journal.svelte";
import Systemctl from "./pages/Systemctl.svelte";
import { config } from "../package.json";


import App from "./App.svelte";

export const session = new Session(localStorage);

export const router = new Router(
  [
    route("*", NotFound),
    route("/about", About),
    route("/journal", Journal),
    route("/systemctl", Systemctl),
  ],
  config.base
);

export default new App({
  target: document.body
});
