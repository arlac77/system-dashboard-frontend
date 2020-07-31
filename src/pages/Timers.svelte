<script>
  import { Link } from "svelte-guard-history-router";

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
          <Link href="/timer/{timer.unit}">{timer.unit}</Link>
        </td>
        <td>{timer.next}</td>
        <td>{timer.left}</td>
        <td>{timer.last}</td>
        <td>{timer.passed}</td>
        <td>
          <Link href="/unit/{timer.activates}">{timer.activates}</Link>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
