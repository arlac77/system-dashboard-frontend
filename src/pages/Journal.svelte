<script>
  import { LogView, lineIterator } from "svelte-log-view";
  import { config } from "../../package.json";

  //  import Journal from "./components/Journal.svelte";

  const source = lineIterator(fetch(config.journalUrlPrefix + "/entries"));
</script>

<LogView {source} />
