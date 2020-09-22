<script>  
    export let router;
  
    const route = router.route;
  </script>
  
  {#if $route}
    <h3>Machine {$route.name}</h3>
  {:else}No such machine{/if}
  