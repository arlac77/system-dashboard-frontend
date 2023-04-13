<script>
  import { ObjectLink } from "svelte-guard-history-router";
  import { sortable, sorter, filter, keyPrefixStore } from "svelte-common";

  export let router;

  const sortBy = keyPrefixStore(router.searchParamStore, "sort.");
  const filterBy = keyPrefixStore(router.searchParamStore, "filter.");
</script>

<table class="bordered striped hoverable">
  <thead>
    <tr>
      <th id="unit" use:sortable={sortBy}
        >Unit<input bind:value={$filterBy.unit} placeholder="filter unit" /></th
      >
      <th id="load" use:sortable={sortBy}>Load</th>
      <th id="active" use:sortable={sortBy}>Active</th>
      <th id="sub" use:sortable={sortBy}>Sub</th>
      <th id="description" use:sortable={sortBy}>Description</th>
    </tr>
  </thead>
  <tbody>
    {#each router.value
      .filter(filter($filterBy))
      .sort(sorter($sortBy)) as unit, i (unit.name)}
      <tr>
        <td>
          <ObjectLink object={unit} />
        </td>
        <td>{unit.load}</td>
        <td>{unit.active}</td>
        <td>{unit.sub}</td>
        <td>{unit.description}</td>
      </tr>
    {/each}
  </tbody>
</table>
