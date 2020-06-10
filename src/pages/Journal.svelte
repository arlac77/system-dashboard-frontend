<script>
  import { LogView, lineIterator } from "svelte-log-view";
  import { session } from "../main.mjs";
  import journalUrlPrefix from "consts:journalUrlPrefix";

  async function* logEntries() {
    const response = await fetch(journalUrlPrefix + "/entries", {
      headers: {
        ...session.authorizationHeader
      }
    });
    yield* lineIterator(response.body.getReader());
  }
</script>

<LogView source={logEntries()} />
