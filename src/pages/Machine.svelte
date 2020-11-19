<script>  
    export let router;
  
    const route = router.route;
    const machine = $route.value;
  </script>
  
  {#if machine}
    <h3>Machine {machine.name}</h3>
    State: {machine.state}
    Jobs: {machine.jobs}
    Failed: {machine.failed}
  {:else}No such machine{/if}
  