<script>
  import { ActionButton, DateTime } from "svelte-common";
  import { ObjectLink } from "svelte-guard-history-router";
  import Journal from "./Journal.svelte";

  import AutomountUnit from "../components/AutomountUnit.svelte";
  import BaseUnit from "../components/BaseUnit.svelte";
  import DeviceUnit from "../components/DeviceUnit.svelte";
  import MountUnit from "../components/MountUnit.svelte";
  import PathUnit from "../components/PathUnit.svelte";
  import ScopeUnit from "../components/ScopeUnit.svelte";
  import ServiceUnit from "../components/ServiceUnit.svelte";
  import SliceUnit from "../components/SliceUnit.svelte";
  import SocketUnit from "../components/SocketUnit.svelte";
  import TimerUnit from "../components/TimerUnit.svelte";

  export let router;

  const route = router.route;

  function compnentFor(unit) {
    switch (unit.type) {
      case "automount":
        return AutomountUnit;
      case "device":
        return DeviceUnit;
      case "mount":
        return MountUnit;
      case "path":
        return PathUnit;
      case "scope":
        return ScopeUnit;
      case "service":
        return ServiceUnit;
      case "slice":
        return SliceUnit;
      case "socket":
        return SocketUnit;
      case "timer":
        return TimerUnit;
      default:
        BaseUnit;
    }
  }

  let query = {};

  $: {
    console.log("ROUTE", $route);
    query = $route ? { _SYSTEMD_UNIT: $route.unit } : {};
  }
</script>

{#if $route}
  <h3>Unit {$route.name} ({$route.type})</h3>
  <p>{$route.description}</p>

  <svelte:component this={compnentFor($route)} unit={$route} />

  <div>Load: {$route.load}</div>
  <div>Active: {$route.active}</div>
  {#if $route.sub}
    <div>Sub: {$route.sub}</div>
  {/if}

  {#if $route.since}
    <div>Since: <DateTime date={$route.since}/></div>
  {/if}

  {#if $route.docs}
    {#each $route.docs as doc}
      <p>{doc}</p>
    {/each}
  {/if}

  {#if $route.triggeredBy}
    <div>
      triggered By:
      <ObjectLink object={$route.triggeredBy} />
    </div>
  {/if}

  <ActionButton error={e=>alert(e)} action={() => $route.stop()}>Stop</ActionButton>
  <ActionButton error={e=>alert(e)} action={() => $route.start()}>Start</ActionButton>
  <ActionButton error={e=>alert(e)} action={() => $route.restart()}>Restart</ActionButton>
  <ActionButton error={e=>alert(e)} action={() => $route.reload()}>Reload</ActionButton>
  <ActionButton error={e=>alert(e)} action={() => $route.freeze()}>Freeze</ActionButton>
  <ActionButton error={e=>alert(e)} action={() => $route.thaw()}>Thaw</ActionButton>

  <Journal {query} />
{:else}No such unit{/if}
