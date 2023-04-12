<script>
  import {
    Route,
    DetailRoute,
    MasterRoute,
    NamedObjectLink
  } from "svelte-guard-history-router";
  import NetworkInterfacesPage from "./pages/NetworkInterfacesPage.svelte";
  import NetworkInterfacePage from "./pages/NetworkInterfacePage.svelte";
  import { NetworkInterface } from "./network.mjs";
  import { fetchIterator } from "./util.mjs";

  export let session;
  export let guards;
</script>

<Route
  path="/network"
  factory={MasterRoute}
  iteratorFor={transition =>
    fetchIterator("/networkctl/interfaces", NetworkInterface, session)}
  objectInstance={NetworkInterface}
  component={NetworkInterfacesPage}
  {guards}
>
  <slot />
  <Route
    path="/:interface"
    propertyMapping={{ interface: "name" }}
    linkComponent={NamedObjectLink}
    factory={DetailRoute}
    component={NetworkInterfacePage}
  />
</Route>
