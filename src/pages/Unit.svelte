<script>
  import { ActionButton, formatBytes } from "svelte-common";
  import { ObjectLink } from "svelte-guard-history-router";
  import Journal from "./Journal.svelte";
  import ServiceUnit from "../components/ServiceUnit.svelte";
  import MountUnit from "../components/MountUnit.svelte";
  import TimerUnit from "../components/TimerUnit.svelte";
  import DeviceUnit from "../components/DeviceUnit.svelte";
  import BaseUnit from "../components/BaseUnit.svelte";

  export let router;

  const route = router.route;

  function compnentFor(unit) {
    switch(unit.type) {
      case 'service' : return ServiceUnit;
      case 'mount' : return MountUnit;
      case 'timer' : return TimerUnit;
      case 'device' : return DeviceUnit;
      default: BaseUnit;
    }
  }
</script>

{#if $route}
  <h3>Unit {$route.name} ({$route.type})</h3>
  <p>{$route.description}</p>

  <svelte:component this={compnentFor($route)} unit={$route}/>

  <div>Load: {$route.load}</div>
  <div>Active: {$route.active}</div>
  <div>Sub: {$route.sub}</div>
  {#if $route.since}
    <div>Since: {$route.since} {$route.passed}</div>
  {/if}
  {#if $route.memory}
    <div>Memory: {formatBytes($route.memory)}</div>
  {/if}

  {#if $route.docs}
    {#each $route.docs as doc}
      <p>{doc}</p>
    {/each}
  {/if}

  {#if $route.device}
    <div>Device: {$route.device}</div>
  {/if}
  {#if $route.follow}
    <div>{$route.follow}</div>
  {/if}
  {#if $route.CGroup}
    <div>{$route.CGroup}</div>
  {/if}
  {#if $route.Listen}
    <div>{$route.Listen}</div>
  {/if}

  {#if $route.triggers}
    <div>
      triggers:
      <ObjectLink object={$route.triggers} />
    </div>
  {/if}
  {#if $route.triggeredBy}
    <div>
      triggered By:
      <ObjectLink object={$route.triggeredBy} />
    </div>
  {/if}

  <ActionButton action={() => $route.stop()}>Stop</ActionButton>
  <ActionButton action={() => $route.start()}>Start</ActionButton>
  <ActionButton action={() => $route.restart()}>Restart</ActionButton>
  <ActionButton action={() => $route.reload()}>Reload</ActionButton>

  <Journal query={{ _SYSTEMD_UNIT: $route.unit }} />
{:else}No such unit{/if}
