<script>
  export let entry;

  let buf = "";
  if (entry.__REALTIME_TIMESTAMP != undefined) {
    const timestamp = new Date(parseInt(entry.__REALTIME_TIMESTAMP) / 1000);
    buf += timestamp.toLocaleString();
  }

  const pid = entry._PID != undefined ? "[" + entry._PID + "]" : "";

  const priority =
    "priority" + (entry.PRIORITY != undefined ? parseInt(entry.PRIORITY) : 6);
</script>

<style>
  .timestamp {
  }

  .priority1 {
    font-weight: bold;
    color: red;
  }

  .priority2 {
    font-weight: bold;
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

<div class={priority}>{buf} {pid} {entry.MESSAGE}</div>
