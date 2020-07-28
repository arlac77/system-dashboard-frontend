<script>
  import { LogView, lineIterator, decodeJson } from "svelte-log-view";
  import JournalEntry from "./JournalEntry.svelte";
  import { session } from "../main.mjs";
  import journalApi from "consts:journalApi";

  // https://www.freedesktop.org/software/systemd/man/systemd.journal-fields.html#
/*
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
  /*
curl -H 'Range: entries=:1000' -H 'Accept: application/json' http://localhost:5000/services/journal/entries?follow
*/

  async function* logEntries() {
    let Range = "";

    const search = window.location.search;

    if (!search) {
      let numberOfEntries = 500;
      let skipEntries = -500;
      let cursor = "";

      Range = `entries=${cursor}:${skipEntries}:${numberOfEntries}`;
    }

    /*
    const qp = {
      boot: undefined,
      follow: undefined
      //  _SYSTEMD_UNIT: 'sshd.service'
    };

    const search = '?' + Object.entries(qp)
      .map(([k, v]) => `${k}${v === undefined ? "" : "=" + escape(v)}`)
      .join("&");
    */

    const response = await fetch(journalApi + "/entries" + search, {
      headers: {
        ...session.authorizationHeader,
        Accept: "application/json",
        "Accept-Encoding": "gzip,identity",
        Range
      }
    });
    yield* decodeJson(lineIterator(response.body.getReader()));
  }
</script>

<LogView source={logEntries()} let:line>
  <JournalEntry entry={line} />
</LogView>
