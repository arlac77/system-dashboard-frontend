<script>
  import { ObjectLink } from "svelte-guard-history-router";
  import { DateTime } from "svelte-common";

  export let unit;
</script>

<div>
  {#if unit.trigger}
    <DateTime date={unit.trigger} />
  {/if}
  <ObjectLink object={unit.triggers} />
</div>
