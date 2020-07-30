<script>
  import { Link } from "svelte-guard-history-router";

  export let router;

  const route = router.route;
</script>

<table class="bordered striped hoverable">
  <thead>
    <tr>
      <th aria-sort="none">Unit</th>
      <th aria-sort="none">Load</th>
      <th aria-sort="none">Active</th>
      <th aria-sort="none">Sub</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    {#each $route as unit}
      <tr>
        <td>
          <Link href="/unit/{unit.unit}">{unit.unit}</Link>
        </td>
        <td>{unit.load}</td>
        <td>{unit.active}</td>
        <td>{unit.sub}</td>
        <td>{unit.description}</td>
      </tr>
    {/each}
  </tbody>
</table>
