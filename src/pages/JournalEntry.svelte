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

  let buf = "";
  if (entry.__REALTIME_TIMESTAMP != undefined) {
    const timestamp = new Date(parseInt(entry.__REALTIME_TIMESTAMP) / 1000);
    buf += timestamp.toLocaleString();
  }

  const pid = entry._PID != undefined ? "[" + entry._PID + "]" : "";

  const priority =
    "priority" + (entry.PRIORITY != undefined ? parseInt(entry.PRIORITY) : 6);

  let message = entry.MESSAGE;

  if (message == null) message = "[blob data]";
  else if (message instanceof Array)
    message = "[" + formatBytes(message.length) + " blob data]";
</script>

<style>
  .timestamp {
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
    color: rgb(119, 129, 62);
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
</style>

<div class={priority}>{buf} {pid} {message}</div>
