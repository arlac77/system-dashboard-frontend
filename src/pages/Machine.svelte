<script>  
    export let router;
  
    const route = router.route;
  </script>
  
  {#if $route}
    <h3>Machine {$route.name}</h3>
    State: {$route.state}
    Jobs: {$route.jobs}
    Failed: {$route.failed}
  {:else}No such machine{/if}
  