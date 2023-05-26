<script>
  import { ObjectLink } from "svelte-guard-history-router";

  export let router;

  const route = router.route;
  const nis = $route.value;
</script>

<table class="bordered striped hoverable">
  <thead>
    <tr>
      <th aria-sort="none">Name</th>
      <th aria-sort="none">Type</th>
    </tr>
  </thead>
  <tbody>
    {#each nis as ni}
      <tr>
        <td>
          <ObjectLink object={ni} />
        </td>
        <td>
          {ni.Type}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
