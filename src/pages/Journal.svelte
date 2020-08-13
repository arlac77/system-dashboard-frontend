<script>
  import { onDestroy } from "svelte";
  import { LogView, lineIterator, decodeJson } from "svelte-log-view";
  import JournalEntry from "./JournalEntry.svelte";
  import { session } from "../main.mjs";
  import journalApi from "consts:journalApi";

  /* https://www.freedesktop.org/software/systemd/man/systemd.journal-fields.html
   */

  export let query = {};
  export let minEntries = 20;

  let start = 0;
  let follow = true;
  let entries = [];

  const controller = new AbortController();
  const signal = controller.signal;

  onDestroy(() => controller.abort());

  async function* fetchEntries() {
    async function* _fetchEntries(Range, params = {}) {
      try {
        const search = Object.entries(params)
          .map(([k, v]) => `${k}${v === undefined ? "" : "=" + escape(v)}`)
          .join("&");

        const response = await fetch(journalApi + "/entries?" + search, {
          signal,
          headers: {
            ...session.authorizationHeader,
            Accept: "application/json",
            "Accept-Encoding": "gzip,identity",
            Range
          }
        });
        if (response.ok) {
          yield* decodeJson(lineIterator(await response.body.getReader()));
        } else {
          console.log(response);
        }
      } catch (e) {
        if (e instanceof AbortSignal) {
          console.log("AbortSignal", e);
        } else {
          throw e;
        }
      }
    }

    yield* _fetchEntries(`entries=:${-minEntries}:${minEntries}`, query);

    for (let i = 0; i < 10; i++) {
      try {
        if(entries.length === 0) {
          break;
        }
        
        const cursor = entries[entries.length - 1].__CURSOR;

        yield* _fetchEntries(`entries=${cursor}`, {
          ...query,
          follow: undefined
        });
      } catch (e) {
        console.log(i, e);
      }
    }
  }
</script>

<p>{start} {follow ? 'F' : '-'}</p>
<LogView source={fetchEntries()} bind:follow bind:start bind:entries let:entry>
  <JournalEntry {entry} />
</LogView>
