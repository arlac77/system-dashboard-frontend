<script>
  import JournalView from "../components/JournalView.svelte";
  import { session } from "../main.mjs";
  import journalApi from "consts:journalApi";
</script>

<JournalView headers={session.authorizationHeader} api={journalApi}/>
