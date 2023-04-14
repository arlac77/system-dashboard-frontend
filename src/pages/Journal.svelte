<script>
  import JournalView from "../components/JournalView.svelte";
  import { session } from "../session.mjs";
  import { journalEndpoint } from "../constants.mjs";
</script>

<JournalView headers={session.authorizationHeader} api={journalEndpoint} />
