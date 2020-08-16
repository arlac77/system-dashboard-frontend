<script>
  import { formatBytes } from "svelte-common";
  export let unit;
</script>

<div>{unit.transient ? 'transient' : ''}</div>
{#if unit.memory}
  <div>Memory: {formatBytes(unit.memory)}</div>
{/if}
