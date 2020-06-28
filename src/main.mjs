import { BaseRouter, Guard } from "svelte-guard-history-router";
import { Session } from "svelte-session-manager";
import base from "consts:base";
import App from "./App.svelte";

export const session = new Session(localStorage);

class SessionGuard extends Guard {
  async enter(transition) {
    if (!session.isValid) {
      return transition.redirect("/login");
    }
  }
}

export const needsSession = new SessionGuard();

export const router = new BaseRouter([], base);

export default new App({
  target: document.body
});
