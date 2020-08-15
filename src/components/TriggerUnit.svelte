<script>
  import { ObjectLink } from "svelte-guard-history-router";
  export let unit;
</script>

<div>
  Triggers:
  <ObjectLink object={unit.triggers} />
</div>
