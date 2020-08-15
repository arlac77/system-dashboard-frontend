<script>
  import { ObjectLink } from "svelte-guard-history-router";
  import TriggerUnit from "./TriggerUnit.svelte";
  export let unit;
</script>

<div>Listen: {unit.listen}</div>

<TriggerUnit {unit} />
