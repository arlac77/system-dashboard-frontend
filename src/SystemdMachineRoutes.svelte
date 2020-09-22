<script>
  import {
    Route,
    ChildStoreRoute,
    IteratorStoreRoute
  } from "svelte-guard-history-router";
  import api from "consts:api";
  import MachinesPage from "./pages/Machines.svelte";
  import MachinePage from "./pages/Machine.svelte";
  import MachineLink from "./components/MachineLink.svelte";
  import { Machine } from "./machine.mjs";

  export let session;
  export let guards;

  async function machines(transition, properties) {
    const res = await fetch(api + "/systemctl/machines", {
      headers: {
        ...session.authorizationHeader
      }
    });
    return (await res.json()).map(m => new Machine(m));
  }

  async function machine(transition, properties) {
    const res = await fetch(api + `/systemctl/machines/${properties.machine}`, {
      headers: {
        ...session.authorizationHeader
      }
    });
    return new Machine(await res.json());
  }

</script>

<Route
  path="/machine"
  factory={IteratorStoreRoute}
  iteratorFor={machines}
  component={MachinesPage}
  {guards}>
  <slot />
  <Route
  path="/:machine"
  propertyMapping={{ machine: 'name' }}
  objectInstance={Machine}
  objectFor={machine}
  linkComponent={MachineLink}
  factory={ChildStoreRoute}
  component={MachinePage} />
</Route>
