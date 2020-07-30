<script>  
    export let router;
  
    const route = router.route;
  </script>
  
  {#if $route}
  <h3>Unit {$route.unit}</h3>
  {$route.load}
  {$route.active}
  {$route.sub}
  {$route.description}
{:else}No such unit{/if}
  