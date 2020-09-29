<script>
  import { ObjectLink } from "svelte-guard-history-router";

  export let router;

  const route = router.route;
</script>

<table class="bordered striped hoverable">
  <thead>
    <tr>
      <th aria-sort="none">Name</th>
      <th aria-sort="none">State</th>
      <th aria-sort="none">Failed</th>
      <th aria-sort="none">Jobs</th>
    </tr>
  </thead>
  <tbody>
    {#each $route as machine}
      <tr>
        <td>
          <ObjectLink object={machine}/>
        </td>
        <td>{machine.state}</td>
        <td>{machine.failed}</td>
        <td>{machine.jobs}</td>
      </tr>
    {/each}
  </tbody>
</table>
