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

    const qp = {
      follow: undefined
    };
    const search = '?' + Object.entries(qp)
      .map(([k, v]) => `${k}${v === undefined ? "" : "=" + escape(v)}`)
      .join("&");
*/

  async function* fetchEntries(minEntries) {
    async function* _fetchEntries(Range, search = "") {
    
      try {
      const response = await fetch(journalApi + "/entries" + search, {
        headers: {
          ...session.authorizationHeader,
          Accept: "application/json",
          "Accept-Encoding": "gzip,identity",
          Range
        }
      });

      yield* decodeJson(lineIterator(await response.body.getReader()));
      }
      catch(e) {
        console.log(Range,search,e);
      }
    }

    let cursor;

    for await (const data of _fetchEntries(
      `entries=:${-minEntries}:${minEntries}`
    )) {
      yield data;
      cursor = data.__CURSOR;
    }

    yield* _fetchEntries(`entries=${cursor}`, "?follow");
  }
</script>

<LogView source={fetchEntries(20)} let:entry>
  <JournalEntry {entry} />
</LogView>
