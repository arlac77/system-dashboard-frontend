<script>
  import {
    Services,
    ServiceCanvas
  } from "@kronos-integration/svelte-components";
  import { session } from "../main.mjs";
  import api from "consts:api";

  async function fetchServices() {
    const response = await fetch(`${api}/services`, {
      headers: session.authorizationHeader
    });
    return Services.initialize(await response.json());
  }
</script>

{#await fetchServices()}
  <p>...fetching</p>
{:then services}
  <ServiceCanvas {services} />
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
