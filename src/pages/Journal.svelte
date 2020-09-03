<script>
  import { onDestroy } from "svelte";
  import { LogView, lineIterator, decodeJson } from "svelte-log-view";
  import JournalEntry from "../components/JournalEntry.svelte";
  import { session } from "../main.mjs";
  import journalApi from "consts:journalApi";

  /* https://www.freedesktop.org/software/systemd/man/systemd.journal-fields.html
   */

  export let query = {};
  export let minEntries = 20;

  let entries = [];

  const controller = new AbortController();
  const signal = controller.signal;

  onDestroy(() => controller.abort());

  async function* fetchEntries(cursorEntry, direction) {
    async function* _fetchEntries(Range, params = {}) {
      try {
        const search = Object.entries(params)
          .map(([k, v]) => `${k}${v === undefined ? "" : "=" + escape(v)}`)
          .join("&");

        const response = await fetch(journalApi + "/entries?" + search, {
          signal,
       //   mode: "same-origin",
          headers: {
            ...session.authorizationHeader,
            Accept: "application/json",
         //   "Accept-Encoding": "gzip,identity",
            Range
          }
        });
        if (response.ok) {
          yield* decodeJson(lineIterator(await response.body.getReader()));
        }
      } catch (e) {
        if (!e instanceof AbortSignal) {
          throw e;
        }
      }
    }

    if(cursorEntry) {
      yield* _fetchEntries(`entries=${cursorEntry.__CURSOR}:${-minEntries}:${minEntries}`, query);
      return;
    }

    yield* _fetchEntries(`entries=:${-minEntries}:${minEntries}`, query);

    for (let i = 0; i < 60; i++) {
      try {
        if (entries.length === 0) {
          break;
        }

        const cursor = entries[entries.length - 1].__CURSOR;

        yield* _fetchEntries(`entries=${cursor}`, {
          ...query,
          follow: undefined
        });
      } catch {}
    }
  }
</script>

<LogView source={fetchEntries} bind:entries let:entry>
  <JournalEntry {entry} />
</LogView>
