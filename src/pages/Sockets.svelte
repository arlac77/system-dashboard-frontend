<script>
  import { ObjectLink } from "svelte-guard-history-router";
  import {
    sortable,
    sorter,
    filter,
    keyPrefixStore
  } from "svelte-common";

  export let router;

  const route = router.route;
  const sortBy = keyPrefixStore(router.searchParamStore, "sort.");
  const filterBy = keyPrefixStore(router.searchParamStore, "filter.");
</script>

<table class="bordered striped hoverable">
  <thead>
    <tr>
      <th id="listen" use:sortable={sortBy}>Listen</th>
      <th id="units" use:sortable={sortBy}>Units</th>
      <th id="activates" use:sortable={sortBy}>Activates</th>
    </tr>
  </thead>
  <tbody>
    {#each route.value
      .filter(filter($filterBy))
      .sort(sorter($sortBy)) as socket, i (socket.listen)}
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
