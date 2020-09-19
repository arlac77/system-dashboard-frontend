<script>
  import {
    About,
    ApplicationDetails,
    SessionDetails,
    ServerDetails,
    PeerDetails,
    ServiceWorkerDetails
  } from "svelte-common";
  import { websocketStore } from "svelte-websocket-store";
  import { session, serviceWorker } from "../main.mjs";
  import name from "consts:name";
  import version from "consts:version";
  import description from "consts:description";
  import api_ws from "consts:api_ws";

  const protocols = ["access_token", session.access_token];

  let peers = websocketStore(api_ws + "/services/peers", [], protocols);
  let uptime = websocketStore(api_ws + "/state/uptime", -1, protocols);
  let memory = websocketStore(api_ws + "/state/memory", {}, protocols);

  let server = {};

  $: {
    server.uptime = $uptime;
    server.memory = $memory;
  }
</script>

<About>
  <ApplicationDetails {name} {version} {description} />
  <ServerDetails {server} />
  <PeerDetails peers={$peers} />
  <SessionDetails session={$session} />
  <ServiceWorkerDetails serviceWorker={$serviceWorker} />
</About>
