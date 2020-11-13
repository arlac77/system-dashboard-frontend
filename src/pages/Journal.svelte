<script>
  import JournalView from "../components/JournalView.svelte";
  import { session } from "../session.mjs";
  import journalApi from "consts:journalApi";
</script>

<JournalView headers={session.authorizationHeader} api={journalApi}/>
