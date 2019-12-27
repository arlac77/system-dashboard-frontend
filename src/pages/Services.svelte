<script>
  import { session } from "../main.mjs";
  import api from "consts:api";
  //import { Services, normalizeServices } from "@kronos-integration/svelte-components";

/*
  async function fetchServices() {
    return fetch(`${api}/services`, {
      headers: session.authorizationHeader
    })
      .then(response => response.json())
      .then(json => normalizeServices(json));
  }
  */
</script>

<div>
Hello</div>

<!--
{#await fetchServices()}
  <p>...fetching</p>
{:then services}
  <Services services/>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
-->