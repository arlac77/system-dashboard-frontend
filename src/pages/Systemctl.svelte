<script>
  import { onMount } from "svelte";
  import { session } from "../main.mjs";
  import api from 'consts:api';

  let status = "";

  onMount(async () => {
    const res = await fetch(api + "/systemctl/units", {
      headers: {
        ...session.authorizationHeader
      }
    });
    status = await res.text();
  });
</script>

<h3>Systemctl</h3>
<div class="log">{status}</div>

