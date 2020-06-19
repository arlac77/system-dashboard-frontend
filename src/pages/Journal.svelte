<script>
  import { LogView, lineIterator, decodeJson, throttle } from "svelte-log-view";
  import JournalEntry from "./JournalEntry.svelte";
  import { session } from "../main.mjs";
  import journalApi from "consts:journalApi";

  // https://www.freedesktop.org/software/systemd/man/systemd.journal-fields.html#
  const fields = [
    "MESSAGE_ID",
    "_HOSTNAME",
    "_PID",
    "_UID",
    "_GID",
    "__REALTIME_TIMESTAMP",
    "_SYSTEMD_UNIT"
  ];

  /*
curl -H 'Range: entries=:1000' -H 'Accept: application/json' http://localhost:5000/services/journal/entries?follow
*/
  async function* logEntries() {
    let numberOfEntries = 500;
    let skipEntries = -500;
    let cursor = "";

    const qp = {
     // boot: undefined
      //follow: undefined
      //  _SYSTEMD_UNIT: 'sshd.service'
    };

    const query = Object.entries(qp)
      .map(([k, v]) => `${k}${v === undefined ? "" : "=" + escape(v)}`)
      .join("&");

    const response = await fetch(journalApi + "/entries?" + query, {
      headers: {
        ...session.authorizationHeader,
        Accept: "application/json",
        "Content-Encoding": "gzip, identity",
        Range: `entries=${cursor}:${skipEntries}:${numberOfEntries}`
      }
    });
    yield* /*throttle(*/ decodeJson(lineIterator(response.body.getReader())); //,10);
  }
</script>

<LogView source={logEntries()} let:line>
  <JournalEntry entry={line}/>
</LogView>
