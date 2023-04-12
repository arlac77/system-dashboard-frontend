<script>
  import { Route } from "svelte-guard-history-router";
  import NamedPage from "./pages/NamedPage.svelte";
  import { Named } from "./network.mjs";
  import { fetchObject } from "./util.mjs";

  export let session;
  export let guards;
</script>

<Route
  path="/named"
  objectFor={(transition, properties) =>
    fetchObject("/named/state", Object, session)}
  objectInstance={Named}
  component={NamedPage}
  {guards}
>
  <slot />
</Route>
