<script>
  import { ObjectLink } from "svelte-guard-history-router";

  export let unit;
</script>

<div>Device: {unit.device}</div>
<div>Follow: <ObjectLink object={unit.follow} /></div>
