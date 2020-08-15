<script>
  import { formatBytes } from "svelte-common";

  export let unit;
</script>

<div>Where: {unit.where}</div>

{#if unit.memory}
  <div>Memory: {formatBytes(unit.memory)}</div>
{/if}
