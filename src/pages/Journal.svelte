<script>
  import { LogView, lineIterator } from "svelte-log-view";
  import { session } from "../main.mjs";
  import journalUrlPrefix from "consts:journalUrlPrefix";

  // https://www.freedesktop.org/software/systemd/man/systemd.journal-fields.html#
  const fields = [
    "MESSAGE",
    "MESSAGE_ID",
    "PRIORITY",
    "_HOSTNAME",
    "_PID",
    "_UID",
    "_GID",
    "__REALTIME_TIMESTAMP"
  ];

  /*
curl -H 'Range: entries=:1000' -H 'Accept: application/json' http://localhost:5000/services/journal/entries?follow
*/
  async function* logEntries() {
    let numberOfEntries = 1000;
    let skipEntries = 0;
    let cursor = "s=9d01acbf99b94aa7847c629f5f36bbaf;i=c74e2d;b=c39b51befc314bb6b108e94253943e81;m=270556d2a1;t=5a790df4a965b;x=e86637883bed921f";

    /*  if (localStorage.cursor != null && localStorage.cursor != "")
        range = localStorage.cursor + ":0";
      */

    const qp = {
      //boot:undefined,
      follow: undefined
      //  _SYSTEMD_UNIT: 'sshd.service'
    };

    const query = Object.entries(qp)
      .map(([k, v]) => `${k}${v === undefined ? "" : "=" + escape(v)}`)
      .join("&");

    const response = await fetch(journalUrlPrefix + "/entries?" + query, {
      headers: {
        ...session.authorizationHeader,
              Accept: "application/json",
        Range: `entries=${cursor}`// :${skipEntries}:${numberOfEntries}`
      }
    });
    yield* lineIterator(response.body.getReader());
  }
</script>

<LogView source={logEntries()} />
