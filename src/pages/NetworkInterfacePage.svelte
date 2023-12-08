<script>
  export let router;

  const route = router.route;
  const iface = $route.value;
</script>

{#if iface}
  <h3>Interface {iface.name}</h3>

  <form>
    {#each Object.entries(iface) as e}
      <label>{e[0]} <input value={e[1]} /></label>
    {/each}
  </form>
{:else}No such interface{/if}
