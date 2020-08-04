<script>
  import { LogView, lineIterator, decodeJson } from "svelte-log-view";
  import JournalEntry from "./JournalEntry.svelte";
  import { session } from "../main.mjs";
  import journalApi from "consts:journalApi";

  /* https://www.freedesktop.org/software/systemd/man/systemd.journal-fields.html#
  curl -H 'Range: entries=:1000' -H 'Accept: application/json' http://localhost:5000/services/journal/entries?follow

  const fields = [
    "MESSAGE_ID",
    "_HOSTNAME",
    "_PID",
    "_UID",
    "_GID",
    "__REALTIME_TIMESTAMP",
    "_SYSTEMD_UNIT"
  ];
*/

  export let query = {};
  export let minEntries = 20;

  async function* fetchEntries() {
    async function* _fetchEntries(Range, params = {}) {
      try {
        let url = journalApi + "/entries";

        const search = Object.entries(params)
          .map(([k, v]) => `${k}${v === undefined ? "" : "=" + escape(v)}`)
          .join("&");

        if (search) {
          url += "?" + search;
        }

        const response = await fetch(url, {
          headers: {
            ...session.authorizationHeader,
            Accept: "application/json",
            "Accept-Encoding": "gzip,identity",
            Range
          }
        });

        yield* decodeJson(lineIterator(await response.body.getReader()));
      } catch (e) {
        console.log(Range, params, e);
      }
    }

    let cursor;

    for await (const data of _fetchEntries(
      `entries=:${-minEntries}:${minEntries}`,
      query
    )) {
      yield data;
      cursor = data.__CURSOR;
    }

    yield* _fetchEntries(`entries=${cursor}`, {
      ...query,
      follow: undefined
    });
  }
</script>

<LogView source={fetchEntries()} let:entry>
  <JournalEntry {entry} />
</LogView>
