<script>
  import {
    DateTime,
    Duration,
    formatBytes,
    About,
    SessionDetails
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
  let memory = websocketStore(
    api_ws + "/state/memory",
    { heapTotal: -1, heapUsed: -1, external: -1, rss: -1 },
    protocols
  );
</script>

<About {name} {version} {description}>
  <tr>
    <td>Uptime</td>
    <td>
      {#if $uptime < 0}
        down
      {:else}
        <Duration seconds={$uptime} />
      {/if}
    </td>
  </tr>
  <tr>
    <td>Server Heap Total</td>
    <td>{formatBytes($memory.heapTotal)}</td>
  </tr>
  <tr>
    <td>Server Heap Used</td>
    <td>{formatBytes($memory.heapUsed)}</td>
  </tr>
  <tr>
    <td>Peers</td>
    <td>
      {#each $peers as peer}
        <Peer {peer} />
      {/each}
    </td>
  </tr>
  <SessionDetails session={$session} />
</About>
