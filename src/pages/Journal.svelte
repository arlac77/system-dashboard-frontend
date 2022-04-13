<script>
  import JournalView from "../components/JournalView.svelte";
  import { session } from "../session.mjs";
  import journalEndpoint from "consts:journal.endpoint";
</script>

<JournalView headers={session.authorizationHeader} api={journalEndpoint}/>
