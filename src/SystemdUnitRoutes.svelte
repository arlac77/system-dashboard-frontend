<script>
  import {
    Route,
    ChildStoreRoute,
    IteratorStoreRoute
  } from "svelte-guard-history-router";
  import api from "consts:api";
  import UnitsPage from "./pages/Units.svelte";
  import UnitPage from "./pages/Unit.svelte";

  export let session;
  export let guards;

  async function units(transition, properties) {
    const res = await fetch(api + "/systemctl/units", {
      headers: {
        ...session.authorizationHeader
      }
    });
    return await res.json();
  }
</script>

<Route
  path="/unit"
  factory={IteratorStoreRoute}
  iteratorFor={units}
  component={UnitsPage}
  {guards}>
  <slot />
  <Route
    path="/:unit"
    propertyMapping={{ unit: 'unit' }}
    factory={ChildStoreRoute}
    component={UnitPage} />
</Route>
