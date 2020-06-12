<script>
  import { LogView, lineIterator, throttle } from "svelte-log-view";
  import { session } from "../main.mjs";
  import journalApi from "consts:journalApi";

  // https://www.freedesktop.org/software/systemd/man/systemd.journal-fields.html#
  const fields = [
    "MESSAGE",
    "MESSAGE_ID",
    "PRIORITY",
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
    let numberOfEntries = 200;
    let skipEntries = -200;
    let cursor = "";

    const qp = {
      boot:undefined,
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
        Range: `entries=${cursor}:${skipEntries}:${numberOfEntries}`
      }
    });
    yield* throttle(lineIterator(response.body.getReader()));
  }
</script>

<LogView source={logEntries()} />
