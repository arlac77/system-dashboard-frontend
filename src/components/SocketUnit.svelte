<script>
  import { ObjectLink } from "svelte-guard-history-router";
  import TriggerUnit from "./TriggerUnit.svelte";
  import CGroup from "./CGroup.svelte";
  export let unit;
</script>

<div>Listen: {unit.listen}</div>

<TriggerUnit {unit} />
{#if unit.CGroup}
  <CGroup cgroup={unit.CGroup} />
{/if}
