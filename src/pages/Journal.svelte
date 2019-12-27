<script>
  import { LogView, lineIterator } from "svelte-log-view";
  import { session } from "../main.mjs";
  import journalUrlPrefix from "consts:journalUrlPrefix";

  //  import Journal from "./components/Journal.svelte";

  const source = lineIterator(
    fetch(journalUrlPrefix + "/entries", {
      headers: {
        ...session.authorizationHeader
      }
    })
  );
</script>

<LogView {source} />
