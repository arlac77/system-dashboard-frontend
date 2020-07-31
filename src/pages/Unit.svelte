<script>  
    export let router;
  
    const route = router.route;
  </script>
  
  {#if $route}
  <h3>Unit {$route.unit}</h3>
  {$route.description}
  {$route.load}
  {$route.active}
  {$route.sub}
  {$route.mainPid}
  {$route.triggeredBy}
{:else}No such unit{/if}
  