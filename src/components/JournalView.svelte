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
    abort: () => controller.abort(),

    fetch: async function* (cursorEntry, offset = 0, number = 10) {
      if (controller) {
        controller.abort();
      }

      controller = new AbortController();

      const cursor = cursorEntry?.__CURSOR;

      try {
        const range = [offset, number]
          .map(n => (n !== undefined ? `:${n}` : ""))
          .join("");

        const response = await fetch(
          api + "/entries?" + new URLSearchParams(Object.entries(query)),
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
        if (e.name !== 'AbortError') {
          throw e;
        }
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
