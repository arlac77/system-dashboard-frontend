<script>
  import { onMount } from "svelte";
  import { ObjectLink } from "svelte-guard-history-router";

  export let router;

  const route = router.route;

  let unit;

  onMount(() => {
    unit = router.searchParams.get("unit");
  });

  $: {
    if (unit && unit.length > 0) {
      router.push(router.path.replace(/\?.*/, "") + "?unit=" + unit);
    }
  }
</script>

<input id="unit.filter" placeholder="Unit" bind:value={unit} />

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
