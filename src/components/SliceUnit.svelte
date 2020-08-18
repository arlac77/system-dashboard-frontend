<script>
  import { formatBytes } from "svelte-common";
  import CGroup from "./CGroup.svelte";

  export let unit;
</script>

{#if unit.memory}
  <div>Memory: {formatBytes(unit.memory)}</div>
{/if}
{#if unit.CGroup}
  <CGroup cgroup={unit.CGroup} />
{/if}
