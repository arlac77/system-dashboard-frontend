<script>
  import { ActionButton, formatBytes } from "svelte-common";
  import { ObjectLink } from "svelte-guard-history-router";
  import Journal from "./Journal.svelte";

  export let router;

  const route = router.route;
</script>

{#if $route}
  <h3>Unit {$route.unit}</h3>
  <p>{$route.description}</p>
  <div>Load: {$route.load}</div>
  <div>Active: {$route.active}</div>
  <div>Sub: {$route.sub}</div>
  <div>Since: {$route.since} {$route.passed}</div>

  {#if $route.mainPid}
    <div>Main PID: {$route.mainPid}</div>
  {/if}
  {#if $route.triggeredBy}
    <div>
      triggered By:
      <ObjectLink object={$route.triggeredBy} />
    </div>
  {/if}
  {#if $route.memory}
    <div>Memory: {formatBytes($route.memory)}</div>
  {/if}
  <ActionButton action={() => $route.stop()}>Stop</ActionButton>
  <ActionButton action={() => $route.start()}>Start</ActionButton>
  <ActionButton action={() => $route.restart()}>Restart</ActionButton>
  <ActionButton action={() => $route.reload()}>Reload</ActionButton>

  <Journal query={{ _SYSTEMD_UNIT: $route.unit }} />
{:else}No such unit{/if}
