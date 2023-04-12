<script>
  import {
    Route,
    DetailRoute,
    MasterRoute,
    NamedObjectLink
  } from "svelte-guard-history-router";
  import MachinesPage from "./pages/Machines.svelte";
  import MachinePage from "./pages/Machine.svelte";
  import { Machine } from "./machine.mjs";
  import { fetchIterator } from "./util.mjs";

  export let session;
  export let guards;
</script>

<Route
  path="/machine"
  factory={MasterRoute}
  iteratorFor={transition =>
    fetchIterator("/systemctl/machine", Machine, session)}
  objectInstance={Machine}
  component={MachinesPage}
  {guards}
>
  <slot />
  <Route
    path="/:machine"
    propertyMapping={{ machine: "name" }}
    linkComponent={NamedObjectLink}
    factory={DetailRoute}
    component={MachinePage}
  />
</Route>
