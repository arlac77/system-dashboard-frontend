<script>
  import { ObjectLink } from "svelte-guard-history-router";

  export let router;

  const route = router.route;
</script>

<table class="bordered striped hoverable">
  <thead>
    <tr>
      <th aria-sort="none">Name</th>
    </tr>
  </thead>
  <tbody>
    {#each $route as ni}
      <tr>
        <td>
          <ObjectLink object={ni} />
        </td>
      </tr>
    {/each}
  </tbody>
</table>
