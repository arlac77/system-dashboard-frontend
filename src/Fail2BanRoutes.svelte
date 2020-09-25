<script>
    import {
      Route,
      IteratorStoreRoute
    } from "svelte-guard-history-router";
    import api from "consts:api";
    import Fail2Bans from "./pages/Fail2Bans.svelte";
  
    export let session;
    export let guards;
  
    async function fail2bans(transition, properties) {
      const res = await fetch(api + "/other/fail2ban", {
        headers: {
          ...session.authorizationHeader
        }
      });
      if(!res.ok) {
        return transition.redirect('/error');
      }

      return res.json();
    }
  </script>
  
  <Route
    path="/fail2ban"
    factory={IteratorStoreRoute}
    iteratorFor={fail2bans}
    component={Fail2Bans}
    {guards}>
    <slot />
  </Route>
  