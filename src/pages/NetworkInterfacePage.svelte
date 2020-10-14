<script>
  export let router;

  const route = router.route;
</script>

{#if $route}
  <h3>Interface {$route.name}</h3>
  Type:
  {$route.Type}
  MTU:
  {$route.MTU}
{:else}No such interface{/if}
