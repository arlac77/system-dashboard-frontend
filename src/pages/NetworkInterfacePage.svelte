<script>
  export let router;

  const route = router.route;
  const iface = $route.value;
</script>

{#if iface}
  <h3>Interface {iface.name}</h3>

  <table class="bordered">
  <thead>
    <tr>
      <th aria-sort="none">Attribute</th>
      <th aria-sort="none">Value</th>
    </tr>
  </thead>
  <tbody class="striped hoverable">
    {#each Object.entries(iface) as e}
      <tr>
        <td>
          {e[0]}
        </td>
        <td>
          {e[1]}
        </td>
      </tr>
    {/each}

    {#each nis as ni}
    {/each}
  </tbody>
{:else}No such interface{/if}
