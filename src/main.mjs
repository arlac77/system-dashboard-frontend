import { redirectGuard } from "svelte-guard-history-router";
import { Session } from "svelte-session-manager";
import App from "./App.svelte";

export const session = new Session(localStorage);
export const enshureSession = redirectGuard("/login",() => !session.isValid);

export default new App({
  target: document.body
});
