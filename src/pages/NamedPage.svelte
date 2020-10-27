<script>
    export let router;
  
    const route = router.route;
  </script>
  
  {#if $route}
    <h3>Named</h3>
  
    <ul>
      {#each Object.entries($route) as e}
        <li>{e[0]} {e[1]}</li>
      {/each}
    </ul>
  {:else}No such named{/if}
  