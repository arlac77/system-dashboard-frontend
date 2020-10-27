<script>
    import {
      Route,
      IteratorStoreRoute
    } from "svelte-guard-history-router";
    import Fail2Bans from "./pages/Fail2Bans.svelte";
    import { fetchIterator } from "./util.mjs";
    import { Fail2Ban } from "./network.mjs";

    export let session;
    export let guards;
  </script>
  
  <Route
    path="/fail2ban"
    factory={IteratorStoreRoute}
    iteratorFor={fetchIterator('/fail2ban', Fail2Ban, session)}
    component={Fail2Bans}
    {guards}>
    <slot />
  </Route>
  