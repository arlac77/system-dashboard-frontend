<script>
  import {
    Route,
    ChildStoreRoute,
    IteratorStoreRoute
  } from "svelte-guard-history-router";
  import NetworkInterfacesPage from "./pages/NetworkInterfacesPage.svelte";
  import NetworkInterfacePage from "./pages/NetworkInterfacePage.svelte";
  import NetworkInterfaceLink from "./components/NetworkInterfaceLink.svelte";
  import { NetworkInterface } from "./network.mjs";
  import { fetchIterator } from "./util.mjs";

  export let session;
  export let guards;
</script>

<Route
  path="/network"
  factory={IteratorStoreRoute}
  iteratorFor={fetchIterator('/networkctl/interfaces', NetworkInterface, session)}
  objectInstance={NetworkInterface}
  component={NetworkInterfacesPage}
  {guards}>
  <slot />
  <Route
    path="/:interface"
    propertyMapping={{ name: 'interface' }}
    linkComponent={NetworkInterfaceLink}
    factory={ChildStoreRoute}
    component={NetworkInterfacePage} />
</Route>
