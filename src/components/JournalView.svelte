<script>
  import { LogView } from "svelte-log-view";
  import { lineIterator } from "reader-line-iterator";
  import JournalEntry from "./JournalEntry.svelte";

  export let api;
  export let headers;
  export let query = {};
  export let visibleRows = 30;

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
   * https://www.man7.org/linux/man-pages/man8/systemd-journal-gatewayd.service.8.html
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
          const range = [offset, number]
            .map(n => (n !== undefined ? `:${n}` : ""))
            .join("");

          const response = await fetch(
            api + "/entries?" + new URLSearchParams(Object.entries(params)),
            {
              signal: controller.signal,
              headers: {
                ...headers,
                Accept: "application/json",
                Range: cursor
                  ? `entries=${cursor}${range}`
                  : `realtime=${Math.floor(Date.now() / 1000)}${range}`
              }
            }
          );
          if (response.ok) {
            yield* decodeJson(lineIterator(await response.body.getReader()));
          }
        } catch (e) {
          if (!(e instanceof AbortSignal)) {
            throw e;
          }
        }
      }

      yield* fetchEntries(query, cursorEntry?.__CURSOR, offset, number);

      if (offset >= 0 && entries.length > 0) {
        try {
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
  let:position
>
  <JournalEntry {entry} highlight={selected === position} {follow} />
</LogView>
