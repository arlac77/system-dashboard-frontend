<script>
  import { Bytes } from "svelte-common";

  export let unit;
</script>

<div>Where: {unit.where}</div>

{#if unit.memory}
  <div>Memory: <Bytes value={unit.memory}/></div>
{/if}
