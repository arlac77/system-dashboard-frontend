<script>
    export let router;
  
    const route = router.route;
    const object = $route.value;
  </script>
  
  {#if object}
    <h3>Named</h3>
  
    <ul>
      {#each Object.entries(object) as e}
        <li>{e[0]} {e[1]}</li>
      {/each}
    </ul>
  {:else}No such named{/if}
  