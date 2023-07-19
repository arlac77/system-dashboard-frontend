<script>
  import { LogView } from "svelte-log-view";
  import { lineIterator } from "reader-line-iterator";
  import JournalEntry from "./JournalEntry.svelte";

  export let api;
  export let headers;
  export let query = {};
  export let visibleRows = 20;

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

  let follow;
  let entries = [];
  let controller;

  const source = {
    abort: async () => controller.abort(),

    fetch: async function* (cursorEntry, offset = 0, number = 10) {
      if (controller) {
        controller.abort();
      }

      controller = new AbortController();

      async function* fetchEntries(params, cursor, offset, number) {
        try {
          const response = await fetch(
            api + "/entries?" + new URLSearchParams(Object.entries(params)),
            {
              signal: controller.signal,
              headers: {
                ...headers,
                Accept: "application/json",
                Range: `entries=${[cursor, offset, number]
                  .map(v => (v === undefined ? "" : v))
                  .join(":")}`
              }
            }
          );
          if (response.ok) {
            yield* decodeJson(lineIterator(await response.body.getReader()));
          }
        } catch (e) {
          if (!e instanceof AbortSignal) {
            throw e;
          }
        }
      }

      yield* fetchEntries(
        query,
        cursorEntry?.__CURSOR,
        offset,
        number
      );

      if (offset < 0) {
        return;
      }

      for (let i = 0; i < 60; i++) {
        try {
          if (entries.length === 0) {
            break;
          }

          yield* fetchEntries(
            {
              ...query,
              follow
            },
            entries[entries.length - 1].__CURSOR,
            1
          );
        } catch {}
      }
    }
  };
</script>

<LogView
  {visibleRows}
  {source}
  bind:entries
  let:entry
  bind:follow
  let:selected
  let:position>
  <JournalEntry {entry} highlight={selected === position} {follow} />
</LogView>
