<script>
  import { onMount } from "svelte";
  import { config } from "../../package.json";

  let status = "";

  onMount(async () => {
    const res = await fetch(config.api + "/systemctl/status");
    status = await res.text();
  });
</script>

<h3>Systemctl</h3>

{status}
