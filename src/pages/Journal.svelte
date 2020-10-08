<script>
  import { onDestroy } from "svelte";
  import { LogView } from "svelte-log-view";
  import { lineIterator } from "reader-line-iterator";
  import JournalEntry from "../components/JournalEntry.svelte";
  import { session } from "../main.mjs";
  import journalApi from "consts:journalApi";

  /**
   * Decodes json lines
   * @param {AsyncIterator<string>} source
   * @return {AsyncIterator<Object>} decoded json
   */
  export async function* decodeJson(source) {
    for await (const line of source) {
      yield JSON.parse(line);
    }
  }

  /* https://www.freedesktop.org/software/systemd/man/systemd.journal-fields.html
   */

  export let query = {};
  export let minEntries = 20;
  
  let follow;
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

    const n = direction == undefined ? minEntries : 1;

    yield* _fetchEntries(
      `entries=${
        cursorEntry ? cursorEntry.__CURSOR : ""
      }:${-n}:${n}`,
      query
    );

    if(direction !== undefined) {
      return;
    }

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

<LogView source={fetchEntries} bind:entries let:entry bind:follow let:selected let:position>
  <JournalEntry {entry} highlight={selected === position} {follow}/>
</LogView>
