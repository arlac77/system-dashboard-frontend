<script>
  import {
    Route,
    ChildStoreRoute,
    IteratorStoreRoute
  } from "svelte-guard-history-router";
  import api from "consts:api";
  import TimersPage from "./pages/Timers.svelte";

  export let session;
  export let guards;

  async function timers(transition, properties) {
    const res = await fetch(api + "/systemctl/timers", {
      headers: {
        ...session.authorizationHeader
      }
    });
    return await res.json();
  }
</script>

<Route
  path="/timer"
  factory={IteratorStoreRoute}
  iteratorFor={timers}
  component={TimersPage}
  {guards}>
  <slot />
</Route>
