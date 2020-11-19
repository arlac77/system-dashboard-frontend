<script>
  export let router;

  const route = router.route;
  const iface = $route.value;
</script>

{#if iface}
  <h3>Interface {iface.name}</h3>

  <ul>
    {#each Object.entries(iface) as e}
      <li>{e[0]} {e[1]}</li>
    {/each}
  </ul>
{:else}No such interface{/if}
