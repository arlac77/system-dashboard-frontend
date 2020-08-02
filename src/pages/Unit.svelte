<script>
  import { ActionButton, formatBytes } from "svelte-common";

  export let router;

  const route = router.route;
</script>

{#if $route}
  <h3>Unit {$route.unit}</h3>
  {$route.description} {$route.load} {$route.active} {$route.sub} {$route.since}
  {$route.passed} {$route.mainPid} {$route.triggeredBy}
  {formatBytes($route.memory)}
  <ActionButton action={() => $route.stop()}>Stop</ActionButton>
  <ActionButton action={() => $route.start()}>Start</ActionButton>
  <ActionButton action={() => $route.restart()}>Restart</ActionButton>
  <ActionButton action={() => $route.reload()}>Reload</ActionButton>
{:else}No such unit{/if}
