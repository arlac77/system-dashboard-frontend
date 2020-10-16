<script>
  import {
    Route,
    ChildStoreRoute,
    IteratorStoreRoute
  } from "svelte-guard-history-router";
  import api from "consts:api";
  import UnitsPage from "./pages/Units.svelte";
  import UnitPage from "./pages/Unit.svelte";
  import UnitLink from "./components/UnitLink.svelte";
  import { Unit, File } from "./unit.mjs";
  import { fetchIterator } from "./util.mjs";

  export let session;
  export let guards;

  async function unit(transition, properties) {
    const res = await fetch(api + `/systemctl/unit/${properties.unit}`, {
      headers: {
        ...session.authorizationHeader
      }
    });
    return new Unit(await res.json());
  }
</script>

<Route
  path="/unit"
  factory={IteratorStoreRoute}
  iteratorFor={fetchIterator('/systemctl/unit', Unit, session)}
  component={UnitsPage}
  {guards}>
  <slot />
  <Route
    path="/:unit"
    propertyMapping={{ unit: 'unit' }}
    objectInstance={Unit}
    linkComponent={UnitLink}
    objectFor={unit}
    factory={ChildStoreRoute}
    component={UnitPage}>
    <Route path="/file" iteratorFor="files">
      <Route
        path="/:file"
        propertyMapping={{ file: 'file' }}
        objectInstance={File} />
    </Route>
  </Route>
</Route>
