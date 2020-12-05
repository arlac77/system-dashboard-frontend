<script>
  import {
    Services,
    ServiceCanvas
  } from "@kronos-integration/svelte-components";
  import { websocketStore } from "svelte-websocket-store";
  import { session } from "../session.mjs";
  import api_ws from "consts:api_ws";

  const protocols = ["access_token", session.access_token];

  let data = websocketStore(api_ws + "/admin/services", {}, protocols);

  let services = {};

  $: services = Services.initialize($data);
</script>

{#await services}
  <p>...waiting</p>
{:then services}
  <ServiceCanvas {services} />
{/await}
