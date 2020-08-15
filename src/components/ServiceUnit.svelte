<script>
    import { formatBytes } from "svelte-common";

  export let unit;
</script>

{#if unit.mainPid}
  <div>Main PID: {unit.mainPid}</div>
{/if}


{#if unit.memory}
<div>Memory: {formatBytes(unit.memory)}</div>
{/if}
