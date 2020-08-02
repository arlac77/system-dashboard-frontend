<script>
  import { ObjectLink } from "svelte-guard-history-router";

  export let router;

  const route = router.route;
</script>

<table class="bordered striped hoverable">
  <thead>
    <tr>
      <th aria-sort="none">Listen</th>
      <th aria-sort="none">Units</th>
      <th aria-sort="none">Activates</th>
    </tr>
  </thead>
  <tbody>
    {#each $route as socket}
      <tr>
        <td>{socket.listen}</td>
        <td>
          {#each socket.units as unit}
            <ObjectLink object={unit} />
          {/each}
        </td>
        <td>
          <ObjectLink object={socket.activates} />
        </td>
      </tr>
    {/each}
  </tbody>
</table>
