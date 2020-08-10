<script>
  import { formatBytes } from "svelte-common";

  export let entry;

  let ts = "";
  if (entry.__REALTIME_TIMESTAMP !== undefined) {
    const timestamp = new Date(parseInt(entry.__REALTIME_TIMESTAMP) / 1000);
    ts += timestamp.toLocaleString();
  }

  const pid =
    (entry.SYSLOG_IDENTIFIER || entry._COMM) +
    (entry._PID !== undefined ? "[" + entry._PID + "]" : "");

  const priority =
    "priority" + (entry.PRIORITY != undefined ? parseInt(entry.PRIORITY) : 6);

  let message = entry.MESSAGE;

  if (message === null) message = "[blob data]";
  else if (message instanceof Array)
    message = "[" + formatBytes(message.length) + " blob data]";
</script>

<style>
  .entry {
    white-space: nowrap;
    font-family: monospace;
    font-size: 10pt;
    padding: 0;
  }

  .priority0 {
    font-weight: bold;
    color: red;
  }

  .priority1 {
    color: red;
  }

  .priority2 {
    color: purple;
  }

  .priority3 {
    font-weight: bold;
    color: red;
  }

  .priority4 {
    color: green;
  }

  .priority5 {
    color: blue;
  }

  .priority6 {
    color: gray;
  }

  .timestamp {
    display: inline-block;
    width: 19ch;
  }

  .pid {
    display: inline-block;
    min-width: 17ch;
  }

  .message {
    display: inline-block;
  }
</style>

<div class="entry">
  <span class="timestamp">{ts}</span>
  <span class="pid">{pid}</span>
  <span class="message {priority}">{message}</span>
</div>
