<script>
  export let entry;

  function formatBytes(u) {
    if (u >= 1024 * 1024 * 1024 * 1024)
      return (u / 1024 / 1024 / 1024 / 1024).toFixed(1) + " TiB";
    else if (u >= 1024 * 1024 * 1024)
      return (u / 1024 / 1024 / 1024).toFixed(1) + " GiB";
    else if (u >= 1024 * 1024) return (u / 1024 / 1024).toFixed(1) + " MiB";
    else if (u >= 1024) return (u / 1024).toFixed(1) + " KiB";
    else return u.toString() + " B";
  }

  let ts = "";
  if (entry.__REALTIME_TIMESTAMP != undefined) {
    const timestamp = new Date(parseInt(entry.__REALTIME_TIMESTAMP) / 1000);
    ts += timestamp.toLocaleString();
  }

  const pid =
    (entry.SYSLOG_IDENTIFIER ||
    entry._COMM) +
    (entry._PID != undefined ? "[" + entry._PID + "]" : "");

  const priority =
    "priority" + (entry.PRIORITY != undefined ? parseInt(entry.PRIORITY) : 6);

  let message = entry.MESSAGE;

  if (message == null) message = "[blob data]";
  else if (message instanceof Array)
    message = "[" + formatBytes(message.length) + " blob data]";
</script>

<style>
  .message {
    white-space: nowrap;
    font-family: monospace;
    font-size: 10pt;
    padding: 0px;
    margin: 1px 0;
  }

  .priority1 {
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
    width: 300px;
  }

  .pid {
  }
</style>

<div class="message">
  <span class="timestamp">{ts}</span>
  <span class="pid">{pid}</span>
  <span class={priority}>{message}</span>
</div>
