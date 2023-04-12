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
      <th id="name" use:sortable={sortBy}>Name</th>
      <th id="state" use:sortable={sortBy}>State</th>
      <th id="failed" use:sortable={sortBy}>Failed</th>
      <th id="jobs" use:sortable={sortBy}>Jobs</th>
    </tr>
  </thead>
  <tbody>
    {#each route.value
      .filter(filter($filterBy))
      .sort(sorter($sortBy)) as machine, i}
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
