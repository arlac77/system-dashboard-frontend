<script>
    import { Link } from "svelte-guard-history-router";
  
    export let router;
  
    const route = router.route;
  </script>
  
  <table class="bordered striped hoverable">
    <thead>
      <tr>
        <th aria-sort="none">Listen</th>
        <th aria-sort="none">Unit</th>
        <th aria-sort="none">Activates</th>
      </tr>
    </thead>
    <tbody>
      {#each $route as socket}
        <tr>
          <td>{socket.listen}</td>
          <td>
            <Link href="/unit/{socket.unit}">{socket.unit}</Link>
          </td>
          <td>{socket.activates}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  