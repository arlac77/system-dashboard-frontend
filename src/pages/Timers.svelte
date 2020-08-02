<script>
  import { ObjectLink } from "svelte-guard-history-router";

  export let router;

  const route = router.route;
</script>

<table class="bordered striped hoverable">
  <thead>
    <tr>
      <th aria-sort="none">Unit</th>
      <th aria-sort="none">Next</th>
      <th aria-sort="none">Left</th>
      <th aria-sort="none">Last</th>
      <th aria-sort="none">Passed</th>
      <th aria-sort="none">Activates</th>
    </tr>
  </thead>
  <tbody>
    {#each $route as timer}
      <tr>
        <td>
          <ObjectLink object={timer} />
        </td>
        <td>{timer.next}</td>
        <td>{timer.left}</td>
        <td>{timer.last}</td>
        <td>{timer.passed}</td>
        <td>
          <ObjectLink object={timer.activates} />
        </td>
      </tr>
    {/each}
  </tbody>
</table>
