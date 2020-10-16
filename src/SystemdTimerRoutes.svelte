<script>
  import { Route, IteratorStoreRoute } from "svelte-guard-history-router";
  import TimersPage from "./pages/Timers.svelte";
  import { Timer } from "./unit.mjs";
  import { fetchIterator } from "./util.mjs";

  export let session;
  export let guards;
</script>

<Route
  path="/timer"
  factory={IteratorStoreRoute}
  iteratorFor={fetchIterator('/systemctl/timers', Timer, session)}
  objectInstance={Timer}
  component={TimersPage}
  {guards}>
  <slot />
</Route>
