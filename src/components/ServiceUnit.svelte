<script>
  import { Bytes } from "svelte-common";
  import CGroup from "./CGroup.svelte";

  export let unit;
</script>

{#if unit.mainPid}
  <div>Main PID: {unit.mainPid}</div>
{/if}
{#if unit.process}
  <div>unit.process</div>
{/if}
{#if unit.memory}
  <div>Memory: <Bytes value={unit.memory}/></div>
{/if}
{#if unit.CGroup}
  <CGroup cgroup={unit.CGroup} />
{/if}
