<script>
  import {
    Route,
    ChildStoreRoute,
    IteratorStoreRoute
  } from "svelte-guard-history-router";
  import MachinesPage from "./pages/Machines.svelte";
  import MachinePage from "./pages/Machine.svelte";
  import MachineLink from "./components/MachineLink.svelte";
  import { Machine } from "./machine.mjs";
  import { fetchIterator } from "./util.mjs";

  export let session;
  export let guards;
</script>

<Route
  path="/machine"
  factory={IteratorStoreRoute}
  iteratorFor={fetchIterator('/systemctl/machines', Machine, session)}
  objectInstance={Machine}
  component={MachinesPage}
  {guards}>
  <slot />
  <Route
    path="/:machine"
    propertyMapping={{ machine: 'name' }}
    linkComponent={MachineLink}
    factory={ChildStoreRoute}
    component={MachinePage} />
</Route>
