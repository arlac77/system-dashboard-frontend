<script>
  import { session } from "../session.mjs";
  import { journalEndpoint } from "../constants.mjs";

  import { DateTime } from "svelte-common";
  import { CommandButton } from "svelte-command";
  import { ObjectLink } from "svelte-guard-history-router";

  import JournalView from "../components/JournalView.svelte";
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
  const unit = $route.value;

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
    return c || BaseUnit;
  }

  let query = {};

  $: {
    query = unit ? { _SYSTEMD_UNIT: unit.unit } : {};
  }
</script>

{#if unit}
  <ObjectLink object={route.previous()}>Previous</ObjectLink>
  <ObjectLink object={route.next()}>Next</ObjectLink>

  <h3>Unit {unit.name} ({unit.type})</h3>

  {#if unit.description}
    <p>{unit.description}</p>
  {/if}

  <svelte:component this={componentFor(unit)} {unit} />

  <div>Load: {unit.load}</div>
  <div>Active: {unit.active}</div>
  {#if unit.sub}
    <div>Sub: {unit.sub}</div>
  {/if}

  {#if unit.since}
    <div>
      Since:
      <DateTime date={unit.since} />
    </div>
  {/if}

  {#if unit.docs}
    {#each unit.docs as doc}
      <p>
        {#if doc.match(/^(\w+):\/\//)}
          <a href={doc} target="_blank">{doc}</a>
        {:else}{doc}{/if}
      </p>
    {/each}
  {/if}

  {#if unit.triggeredBy}
    <div>
      triggered By:
      <ObjectLink object={unit.triggeredBy} />
    </div>
  {/if}

  {#each unit.actions as command}
    <CommandButton {command}/>
  {/each}

  <JournalView visibleRows={16} headers={session.authorizationHeader} api={journalEndpoint} {query}/>
{:else}No such unit{/if}
