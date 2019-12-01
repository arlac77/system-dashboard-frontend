<script>
  import { LogView, lineIterator } from "svelte-log-view";
  import journalUrlPrefix from 'consts:journalUrlPrefix';

  //  import Journal from "./components/Journal.svelte";

  const source = lineIterator(fetch(journalUrlPrefix + "/entries"));
</script>

<LogView {source} />
