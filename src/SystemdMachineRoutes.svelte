<script>
  import {
    Route,
    ChildStoreRoute,
    IteratorStoreRoute
  } from "svelte-guard-history-router";
  import api from "consts:api";
  import MachinesPage from "./pages/Machines.svelte";

  export let session;
  export let guards;

  async function machines(transition, properties) {
    const res = await fetch(api + "/systemctl/machines", {
      headers: {
        ...session.authorizationHeader
      }
    });
    return await res.json();
  }
</script>

<Route
  path="/machines"
  factory={IteratorStoreRoute}
  iteratorFor={machines}
  component={MachinesPage}
  {guards}>
  <slot />
</Route>
