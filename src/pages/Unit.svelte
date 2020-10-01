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

  function componentFor(unit) {
    const typo2Component = {
      automount: AutomountUnit,
      device: DeviceUnit,
      mount: MountUnit,
      path: PathUnit,
      scope: ScopeUnit,
      service: ServiceUnit,
      slice: SliceUnit,
      socket: SocketUnit,
      timer: TimerUnit
    };

    const c = typo2Component[unit.type];
    return c ? c : BaseUnit;
  }

  let query = {};

  $: {
    query = $route ? { _SYSTEMD_UNIT: $route.unit } : {};
  }

  function nextUnit() {
    const i = route.parent.value.findIndex(u => u.unit === $route.unit);
    return route.parent.value[i+1];
  }
  function previousUnit() {
    const i = route.parent.value.findIndex(u => u.unit === $route.unit);
    return route.parent.value[i-1];
  }

  const actions = {
    stop: "Stop",
    start: "Start",
    restart: "Restart",
    reload: "Reload",
    freeze: "Freeze",
    thaw: "Thaw"
  };
</script>

{#if $route}
<ObjectLink object={previousUnit()}>Previous</ObjectLink>
<ObjectLink object={nextUnit()}>Next</ObjectLink>

  <h3>Unit {$route.name} ({$route.type})</h3>
  <p>{$route.description}</p>

  <svelte:component this={componentFor($route)} unit={$route} />

  <div>Load: {$route.load}</div>
  <div>Active: {$route.active}</div>
  {#if $route.sub}
    <div>Sub: {$route.sub}</div>
  {/if}

  {#if $route.since}
    <div>
      Since:
      <DateTime date={$route.since} />
    </div>
  {/if}

  {#if $route.docs}
    {#each $route.docs as doc}
      <p>
        {#if doc.match(/^(\w+):\/\//)}
          <a href={doc} target="_blank">{doc}</a>
        {:else}{doc}{/if}
      </p>
    {/each}
  {/if}

  {#if $route.triggeredBy}
    <div>
      triggered By:
      <ObjectLink object={$route.triggeredBy} />
    </div>
  {/if}

  {#each Object.entries(actions) as [action, title]}
    <ActionButton error={e => alert(e)} action={() => $route[action]()}>
      {title}
    </ActionButton>
  {/each}

  <Journal {query} />
{:else}No such unit{/if}
