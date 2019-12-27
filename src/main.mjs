import { Router, route, NotFound, Guard } from "svelte-guard-history-router";
import { Session } from "svelte-session-manager";
import About from "./pages/About.svelte";
import Login from "./pages/Login.svelte";
import Journal from "./pages/Journal.svelte";
import Systemctl from "./pages/Systemctl.svelte";
import Services from "./pages/Services.svelte";
import base from 'consts:base';
import App from "./App.svelte";

export const session = new Session(localStorage);

class SessionGuard extends Guard {
  async enter(transition) {
    if (!session.isValid) {
      return transition.redirect("/login");
    }
  }
}

const needsSession = new SessionGuard();

export const router = new Router(
  [
    route("*", NotFound),
    route("/about", About),
    route("/login", Login),
    route("/journal", needsSession, Journal),
    route("/systemctl", needsSession, Systemctl),
    route("/services", needsSession, Services),
  ],
  base
);

export default new App({
  target: document.body
});

