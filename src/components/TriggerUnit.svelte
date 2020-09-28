<script>
  import { ObjectLink } from "svelte-guard-history-router";
  import { DateTime } from "svelte-common";

  export let unit;
</script>

<div>
  Triggers: <DateTime date={unit.trigger} />
  <ObjectLink object={unit.triggers} />
</div>
