<script>
  import { Route, IteratorStoreRoute } from "svelte-guard-history-router";
  import api from "consts:api";
  import TimersPage from "./pages/Timers.svelte";
  import { Timer } from "./unit.mjs";

  export let session;
  export let guards;

  async function timers(transition, properties) {
    const res = await fetch(api + "/systemctl/timers", {
      headers: {
        ...session.authorizationHeader
      }
    });
    return (await res.json()).map(u => new Timer(u));
  }
</script>

<Route
  path="/timer"
  factory={IteratorStoreRoute}
  iteratorFor={timers}
  objectInstance={Timer}
  component={TimersPage}
  {guards}>
  <slot />
</Route>
