<script>
    import { ActionButton, formatBytes } from "svelte-common";
    import { ObjectLink } from "svelte-guard-history-router";
  
    export let router;
  
    const route = router.route;
  </script>
  
  {#if $route}
    <h3>Machine {$route.name}</h3>
  {:else}No such machine{/if}
  