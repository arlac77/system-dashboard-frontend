<script>
  export let router;

  const route = router.route;
  const machine = $route.value;
</script>

{#if machine}
  <h3>Machine {machine.name}</h3>
  <form>
    <label>
      <span>State</span>
      <input value={machine.state} />
    </label>
    <label>
      <span>Jobs</span>
      <input value={machine.jobs} />
    </label>
    <label>
      <span>Failed</span>
      <input value={machine.failed} />
    </label>
  </form>
{:else}No such machine{/if}
