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

  async function* logEntries(minEntries) {
    const headers = {
      ...session.authorizationHeader,
      Accept: "application/json",
      "Accept-Encoding": "gzip,identity"
    };

    let Range = `entries=:${-minEntries}:${minEntries}`;

    let response = await fetch(journalApi + "/entries", {
      headers: {
        ...headers,
        Range
      }
    });

    let cursor;

    for await (const data of decodeJson(
      lineIterator(response.body.getReader())
    )) {
      yield data;
      cursor = data.__CURSOR;
    }

    Range = `entries=${cursor}`;

    /*
    const qp = {
      follow: undefined
    };
    const search = '?' + Object.entries(qp)
      .map(([k, v]) => `${k}${v === undefined ? "" : "=" + escape(v)}`)
      .join("&");
    */

    const search = "?follow";

    response = await fetch(journalApi + "/entries" + search, {
      headers: {
        ...headers,
        Range
      }
    });
    yield* decodeJson(lineIterator(response.body.getReader()));
  }
</script>

<LogView source={logEntries(20)} let:line>
  <JournalEntry entry={line} />
</LogView>
