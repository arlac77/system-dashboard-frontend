<script>
  import { ObjectLink } from "svelte-guard-history-router";
  import {
    sortable,
    sorter,
    filter,
    keyPrefixStore,
    Pagination,
    pageNavigation
  } from "svelte-common";

  export let router;

  const sortBy = keyPrefixStore(router.searchParamStore, "sort.");
  const filterBy = keyPrefixStore(router.searchParamStore, "filter.");

  const pg = new Pagination(router.value);

  $: pg.filter = filter($filterBy);
  $: pg.sorter = sorter($sortBy);
</script>

<table class="bordered">
  <thead>
    <tr>
      <th id="unit" use:sortable={sortBy}
        >Unit<input bind:value={$filterBy.unit} placeholder="filter unit" /></th
      >
      <th id="load" use:sortable={sortBy}>Load</th>
      <th id="active" use:sortable={sortBy}
        >Active<label
          ><input
            bind:value={$filterBy.active}
            placeholder="filter active"
          /></label
        ></th
      >
      <th id="sub" use:sortable={sortBy}>Sub</th>
      <th id="description" use:sortable={sortBy}>Description</th>
    </tr>
  </thead>
  <tbody class="striped hoverable">
    {#each [...pg] as unit, i (unit.name)}
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
  <tfoot>
    <tr>
      <td colspan="5" use:pageNavigation={pg}></td>
    </tr>
  </tfoot>
</table>
