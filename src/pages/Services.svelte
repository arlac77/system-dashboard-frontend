<script>
  import {
    ServiceProvider,
    ServiceCanvas
  } from "@kronos-integration/svelte-components";
  import { websocketStore } from "svelte-websocket-store";

  import { session } from "../session.mjs";
  import api_ws from "consts:api_ws";

  const protocols = ["access_token", session.access_token];

  let data = websocketStore(api_ws + "/admin/services", {}, protocols);
  let requests = websocketStore(api_ws + "/admin/requests", {}, protocols);

  let services = {};

  $: {
    services = ServiceProvider.initialize($data, requests);
  }
</script>

{#await services}
  <p>...waiting</p>
{:then services}
  <ServiceCanvas {services} />
{/await}
