<script>
  import { onMount } from "svelte";
  import journalUrlPrefix from 'consts:journalUrlPrefix';

async function* entryIterator(url) {
  const utf8Decoder = new TextDecoder("utf-8");
  let response = await fetch(url);
  let reader = response.body.getReader();
  let {value: chunk, done: readerDone} = await reader.read();
  chunk = chunk ? utf8Decoder.decode(chunk) : "";

  let re = /\n|\r|\r\n/gm;
  let startIndex = 0;
  let result;

  for (;;) {
    let result = re.exec(chunk);
    if (!result) {
      if (readerDone) {
        break;
      }
      let remainder = chunk.substr(startIndex);
      ({value: chunk, done: readerDone} = await reader.read());
      chunk = remainder + (chunk ? utf8Decoder.decode(chunk) : "");
      startIndex = re.lastIndex = 0;
      continue;
    }
    yield JSON.parse(chunk.substring(startIndex, result.index));
    startIndex = re.lastIndex;
  }
  if (startIndex < chunk.length) {
    yield JSON.parse(chunk.substr(startIndex));
  }
}

  let entries = [];

  async function entriesLoad(range) {
    if (!range) {
      if (localStorage.cursor != null && localStorage.cursor != "")
        range = localStorage.cursor + ":0";
      else range = "";
    }

    let url = journalUrlPrefix + "/entries";

    if (localStorage.filter != "" && localStorage.filter != null) {
      url += "?_SYSTEMD_UNIT=" + escape(localStorage.filter);

      if (localStorage.boot === "1") url += "&boot";
    } else {
      if (localStorage.boot === "1") url += "?boot";
    }

    const r = await fetch(url, {
      headers: {
        Accept: "application/json",
        Range: "entries=" + range + ":1000"
      }
    });
    
    return (await r.text()).split(/\n/).map(e => JSON.parse(e));
  }

  onMount(async () => {
    for await(const entry of entryIterator(journalUrlPrefix + "/entries")) {
      entries.push(entry);
    }
    //entries = await entriesLoad();
  });

/*
   {
    _CAP_EFFECTIVE: "0",
    _SYSTEMD_INVOCATION_ID: "a34fe74269474943bc77aa5d0546cb47",
    _UID: "971",
    __MONOTONIC_TIMESTAMP: "872897098112",
    __CURSOR:
      "s=79719b73bfa946019dc11359aa13ad99;i=251ab8;b=430ad7386e48465d99c53832cc79d53b;m=cb3cb8b180;t=58d1a221a112c;x=86456f691891dc5",
    PRIORITY: "6",
    _MACHINE_ID: "675ad345a1574ba9abf025e8b17ab955",
    MESSAGE: "  '-segment_format',",
    _EXE: "/usr/bin/node",
    _TRANSPORT: "stdout",
    SYSLOG_IDENTIFIER: "rtsp-archive",
    _CMDLINE:
      "node --experimental-modules /services/rtsp-archive/bin/rtsp-archive",
    SYSLOG_FACILITY: "3",
    _SYSTEMD_UNIT: "rtsp-archive.service",
    _COMM: "node",
    _GID: "971",
    _SYSTEMD_SLICE: "system.slice",
    _SYSTEMD_CGROUP: "/system.slice/rtsp-archive.service",
    _PID: "25304",
    __REALTIME_TIMESTAMP: "1562518264353068",
    _HOSTNAME: "odroid1",
    _BOOT_ID: "430ad7386e48465d99c53832cc79d53b",
    _STREAM_ID: "23da642af28b4785976b7ce81eea154c"
  };
  */
</script>

<style>
  div#diventry {
    font-family: monospace;
    font-size: 7pt;
    background-color: #ffffff;
    padding: 1em;
    margin: 2em 0em;
    white-space: nowrap;
    overflow-x: scroll;
  }
</style>

<div id="diventry">
  {#each entries as entry}
    {entry.MESSAGE}
    <br />
  {/each}
</div>
