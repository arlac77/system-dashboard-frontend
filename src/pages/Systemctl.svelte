<script>
  import { onMount } from "svelte";
  import { config } from "../../package.json";
  import { session } from "../main.mjs";

  let status = "";

  onMount(async () => {
    const res = await fetch(config.api + "/systemctl/status", {
      headers: {
        ...session.authorizationHeader
      }
    });
    status = await res.text();
  });
</script>

<h3>Systemctl</h3>
{status}
