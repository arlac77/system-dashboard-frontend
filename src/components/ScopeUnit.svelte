<script>
  import { Bytes } from "svelte-common";
  export let unit;
</script>

<div>{unit.transient ? 'transient' : ''}</div>
{#if unit.memory}
  <div>Memory: <Bytes value={unit.memory}/></div>
{/if}
