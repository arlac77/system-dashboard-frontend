<script>
  import {
    About,
    SessionDetails,
    ServerDetails
  } from "svelte-common";
  import { websocketStore } from "svelte-websocket-store";
  import Peer from "../components/Peer.svelte";
  import { session } from "../main.mjs";
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

<About {name} {version} {description}>
  <ServerDetails {server} />
  <tr>
    <td>Peers</td>
    <td colspan="2">
      {#each $peers as peer}
        <Peer {peer} />
      {/each}
    </td>
  </tr>
  <SessionDetails session={$session} />
</About>
