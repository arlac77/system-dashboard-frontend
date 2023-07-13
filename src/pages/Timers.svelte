<script>
  import { ObjectLink } from "svelte-guard-history-router";
  import {
    DateTime,
    sortable,
    sorter,
    filter,
    keyPrefixStore
  } from "svelte-common";

  export let router;

  const sortBy = keyPrefixStore(router.searchParamStore, "sort.");
  const filterBy = keyPrefixStore(router.searchParamStore, "filter.");
</script>

<table class="bordered">
  <thead>
    <tr>
      <th id="unit" use:sortable={sortBy}>Unit</th>
      <th id="next" use:sortable={sortBy}
        >Next<label
          ><input
            bind:value={$filterBy.next}
            placeholder="filter next"
          /></label
        ></th
      >
      <th id="last" use:sortable={sortBy}
        >Last<label
          ><input
            bind:value={$filterBy.last}
            placeholder="filter last"
          /></label
        ></th
      >
      <th id="activates" use:sortable={sortBy}>Activates</th>
    </tr>
  </thead>
  <tbody class="striped hoverable">
    {#each router.value
      .filter(filter($filterBy))
      .sort(sorter($sortBy)) as timer, i (timer.listen)}
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
