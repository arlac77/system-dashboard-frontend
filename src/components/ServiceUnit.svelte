<script>
  export let unit;
</script>

<h3>Unit {unit.name} ({unit.type})</h3>

{#if unit.mainPid}
  <div>Main PID: {unit.mainPid}</div>
{/if}
