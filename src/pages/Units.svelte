<script>
  import { onMount } from "svelte";
  import { ObjectLink } from "svelte-guard-history-router";

  export let router;

  const route = router.route;

  let filter;

  onMount(() => {
    filter = router.searchParams.get("q");
  });

  $: {
    if (filter && filter.length > 0) {
      router.push(router.path.replace(/\?.*/, "") + "?q=" + filter);
    }
  }
</script>

<input id="filter" placeholder="Filter" bind:value={filter} />

<table class="bordered striped hoverable">
  <thead>
    <tr>
      <th aria-sort="none">Unit</th>
      <th aria-sort="none">Load</th>
      <th aria-sort="none">Active</th>
      <th aria-sort="none">Sub</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    {#each $route as unit}
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
