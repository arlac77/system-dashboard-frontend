<script>
  import { Route, MasterRoute } from "svelte-guard-history-router";
  import SocketsPage from "./pages/Sockets.svelte";
  import { Socket } from "./unit.mjs";
  import { fetchIterator } from "./util.mjs";

  export let session;
  export let guards;
</script>

<Route
  path="/socket"
  factory={MasterRoute}
  iteratorFor={transition =>
    fetchIterator("/systemctl/socket", Socket, session)}
  objectInstance={Socket}
  component={SocketsPage}
  {guards}
>
  <slot />
</Route>
