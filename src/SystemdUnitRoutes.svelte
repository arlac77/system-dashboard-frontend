<script>
  import {
    Route,
    ChildStoreRoute,
    IteratorStoreRoute
  } from "svelte-guard-history-router";
  import UnitsPage from "./pages/Units.svelte";
  import UnitPage from "./pages/Unit.svelte";
  import UnitLink from "./components/UnitLink.svelte";
  import { Unit, File } from "./unit.mjs";
  import { fetchIterator, fetchObject } from "./util.mjs";

  export let session;
  export let guards;
</script>

<Route
  path="/unit"
  factory={IteratorStoreRoute}
  iteratorFor={transition => fetchIterator('/systemctl/unit', Unit, session, transition)}
  objectInstance={Unit}
  component={UnitsPage}
  {guards}>
  <slot />
  <Route
    path="/:unit"
    propertyMapping={{ unit: 'unit' }}
    linkComponent={UnitLink}
    objectFor={transition => fetchObject(`/systemctl/unit/${transition.params.unit}`, Unit, session)}
    factory={ChildStoreRoute}
    component={UnitPage}>
    <Route path="/file" objectInstance={File} iteratorFor="files">
      <Route path="/:file" propertyMapping={{ file: 'file' }} />
    </Route>
  </Route>
</Route>
