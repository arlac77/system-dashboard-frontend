<script>
  import { Route, MasterRoute } from "svelte-guard-history-router";
  import TimersPage from "./pages/Timers.svelte";
  import { Timer } from "./unit.mjs";
  import { fetchIterator } from "./util.mjs";

  export let session;
  export let guards;
</script>

<Route
  path="/timer"
  factory={MasterRoute}
  iteratorFor={transition => fetchIterator("/systemctl/timer", Timer, session)}
  objectInstance={Timer}
  component={TimersPage}
  {guards}
>
  <slot />
</Route>
