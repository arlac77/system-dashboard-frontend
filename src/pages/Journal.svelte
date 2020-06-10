<script>
  import { LogView, lineIterator } from "svelte-log-view";
  import { session } from "../main.mjs";
  import journalUrlPrefix from "consts:journalUrlPrefix";

/*
curl -H 'Range: entries=:1000' -H 'Accept: application/json' http://localhost:5000/services/journal/entries
*/
  async function* logEntries(range) {
    if (!range) {
      /*  if (localStorage.cursor != null && localStorage.cursor != "")
        range = localStorage.cursor + ":0";
      else range = "";
      */
      range = "";
    }

    const qp = {
    //  _SYSTEMD_UNIT: 'sshd.service'
     };

    const query = Object.entries(qp).map(([k,v]) => `${k}=${escape(v)}`).join('&')

    const response = await fetch(journalUrlPrefix + "/entries?" + query, {
      headers: {
        ...session.authorizationHeader,
        //        Accept: "application/json",
        Range: "entries=" + range + ":1000"
      }
    });
    yield* lineIterator(response.body.getReader());
  }
</script>

<LogView source={logEntries()} />
