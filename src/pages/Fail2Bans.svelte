<script>
  export let router;

  const route = router.route;
  const records = $route.value;
</script>

<table class="bordered striped hoverable">
  <thead>
    <tr>
      <th aria-sort="none">Ip</th>
    </tr>
  </thead>
  <tbody>
    {#each records as record}
      <tr>
        <td>{record.ip}</td>
      </tr>
    {/each}
  </tbody>
</table>
