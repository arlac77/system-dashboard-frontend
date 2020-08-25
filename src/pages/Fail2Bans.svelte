<script>
  import { ObjectLink } from "svelte-guard-history-router";

  export let router;

  const route = router.route;
</script>

<table class="bordered striped hoverable">
  <thead>
    <tr>
      <th aria-sort="none">Ip</th>
    </tr>
  </thead>
  <tbody>
    {#each $route as record}
      <tr>
        <td>{record.ip}</td>
      </tr>
    {/each}
  </tbody>
</table>
