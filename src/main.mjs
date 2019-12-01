import { readable } from "svelte/store";
import { Router, route, NotFound } from "svelte-guard-history-router";
import { Session } from "svelte-session-manager";
import About from "./pages/About.svelte";
import Journal from "./pages/Journal.svelte";
import Systemctl from "./pages/Systemctl.svelte";
import base from 'consts:base';
import api from 'consts:api';


import App from "./App.svelte";

export const session = new Session(localStorage);

export const router = new Router(
  [
    route("*", NotFound),
    route("/about", About),
    route("/journal", Journal),
    route("/systemctl", Systemctl),
  ],
  base
);

export default new App({
  target: document.body
});

export const uptime = readable(
  -1,
  set => {
    const f = async () => {
      const data = await fetch(api + "/state/uptime");
      set(await data.json());
    };

    f();

    const interval = setInterval(() => f(), 5000);

    return () => clearInterval(interval);
  }
);

export const memory = readable(
 { heapTotal: 0, heapUsed: 0 },
  set => {
    const f = async () => {
      const data = await fetch(api + "/state/memory");
      set(await data.json());
    };

    f();

    const interval = setInterval(() => f(), 5000);

    return () => clearInterval(interval);
  }
);
