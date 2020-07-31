<script>
  import {
    Route,
    ChildStoreRoute,
    IteratorStoreRoute
  } from "svelte-guard-history-router";
  import api from "consts:api";
  import SocketsPage from "./pages/Sockets.svelte";

  export let session;
  export let guards;

  async function sockets(transition, properties) {
    const res = await fetch(api + "/systemctl/sockets", {
      headers: {
        ...session.authorizationHeader
      }
    });
    return await res.json();
  }
</script>

<Route
  path="/socket"
  factory={IteratorStoreRoute}
  iteratorFor={sockets}
  component={SocketsPage}
  {guards}>
  <slot />
</Route>
