<script>
  import TriggerUnit from "./TriggerUnit.svelte";

  export let unit;
</script>

<div>Where: {unit.where}</div>
<TriggerUnit {unit} />
