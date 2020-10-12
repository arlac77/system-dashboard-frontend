<script>
    import {
      Route,
      ChildStoreRoute,
      IteratorStoreRoute
    } from "svelte-guard-history-router";
    import api from "consts:api";
    import NetworkInterfacesPage from "./pages/NetworkInterfacesPage.svelte";
    import NetworkInterfacePage from "./pages/NetworkInterfacePage.svelte";
    import NetworkInterfaceLink from "./components/NetworkInterfaceLink.svelte";
    import { NetworkInterface } from "./network.mjs";
  
    export let session;
    export let guards;
  
    async function interfaces(transition, properties) {
      const res = await fetch(api + "/networkctl/interfaces", {
        headers: {
          ...session.authorizationHeader
        }
      });
      return (await res.json()).map(u => new NetworkInterface(u));
    }  
  </script>
  
  <Route
    path="/network"
    factory={IteratorStoreRoute}
    iteratorFor={interfaces}
    component={NetworkInterfacesPage}
    {guards}>
    <slot />
    <Route
      path="/:interface"
      propertyMapping={{ name: 'interface' }}
      objectInstance={NetworkInterface}
      linkComponent={NetworkInterfaceLink}
      factory={ChildStoreRoute}
      component={NetworkInterfacePage}>
    </Route>
  </Route>
  