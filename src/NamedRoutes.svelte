<script>
    import {
      Route
    } from "svelte-guard-history-router";
    import NamedPage from "./pages/NamedPage.svelte";
    import { Named } from "./network.mjs";
    import { fetch } from "./util.mjs";
  
    export let session;
    export let guards;
  </script>
  
  <Route
    path="/named"
    objectFor={(transition, properties)=>fetch("/named/state", Object, session)}
    objectInstance={Named}
    component={NamedPage}
    {guards}>
    <slot />
  </Route>
  