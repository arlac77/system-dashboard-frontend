<script>
  import JournalView from "../components/JournalView.svelte";
  import { session } from "../session.mjs";
  import { journalEndpoint } from "../constants.mjs";

  let innerHeight = $state(window.innerHeight);

  let visibleRows = $derived(Math.floor(innerHeight / 13) - 30);
</script>

<svelte:window bind:innerHeight />

<JournalView
  headers={session.authorizationHeader}
  api={journalEndpoint}
  bind:visibleRows
/>
