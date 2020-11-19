<script>
  import { ObjectLink } from "svelte-guard-history-router";
  import { DateTime } from "svelte-common";

  export let router;

  const route = router.route;
  const timers = $route.value;
</script>

<table class="bordered striped hoverable">
  <thead>
    <tr>
      <th aria-sort="none">Unit</th>
      <th aria-sort="none">Next</th>
      <th aria-sort="none">Last</th>
      <th aria-sort="none">Activates</th>
    </tr>
  </thead>
  <tbody>
    {#each timers as timer}
      <tr>
        <td>
          <ObjectLink object={timer} />
        </td>
        <td>
          <DateTime date={timer.next} />
        </td>
        <td>
          <DateTime date={timer.last} />
        </td>
        <td>
          <ObjectLink object={timer.activates} />
        </td>
      </tr>
    {/each}
  </tbody>
</table>
