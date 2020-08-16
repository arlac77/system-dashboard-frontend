<script>
  import TriggerUnit from "./TriggerUnit.svelte";

  export let unit;
</script>

{unit.trigger}

<TriggerUnit {unit} />
