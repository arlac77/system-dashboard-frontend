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

export const state = readable(
  { version: "unknown", uptime: -1, memory: { heapTotal: 0, heapUsed: 0 } },
  set => {
    const f = async () => {
      const data = await fetch(config.api + "/state");
      set(await data.json());
    };

    f();

    const interval = setInterval(() => f(), 5000);

    return () => clearInterval(interval);
  }
);
