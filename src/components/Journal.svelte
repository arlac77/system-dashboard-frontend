<script>
	import { onMount } from 'svelte';

  const journalUrlPrefix - '/services/journal/';

  async function entriesLoad(range) {
    if (!range) {
      if (localStorage["cursor"] != null && localStorage["cursor"] != "")
        range = localStorage["cursor"] + ":0";
      else range = "";
    }

    let url = journalUrlPrefix + "entries";

    if (localStorage["filter"] != "" && localStorage["filter"] != null) {
      url += "?_SYSTEMD_UNIT=" + escape(localStorage["filter"]);

      if (localStorage["boot"] == "1") url += "&boot";
    } else {
      if (localStorage["boot"] == "1") url += "?boot";
    }

    const r = await fetch(url, { headers: { Accept: "application/json" } });
    return r.json();
    //request.setRequestHeader("Range", "entries=" + range + ":" + getNEntries().toString());
  }

              //    entriesLoad(null);

	onMount(async () => {
        entries = await entriesLoad();
        console.log(entries);
	});


    async function loadNext() {
        console.log('loadNext');
    }

    async function loadPrevious() {
        console.log('loadPrevious');
    }

</script>

<style>
  div#divlogs,
  div#diventry {
    font-family: monospace;
    font-size: 7pt;
    background-color: #ffffff;
    padding: 1em;
    margin: 2em 0em;
    border-radius: 10px 10px 10px 10px;
    border: 1px solid threedshadow;
    white-space: nowrap;
    overflow-x: scroll;
  }
  div#diventry {
    display: none;
  }
  div#divlogs {
    display: block;
  }
  body {
    background-color: #ededed;
    color: #313739;
    font: message-box;
    margin: 3em;
  }
  td.timestamp {
    text-align: right;
    border-right: 1px dotted lightgrey;
    padding-right: 5px;
  }
  td.process {
    border-right: 1px dotted lightgrey;
    padding-left: 5px;
    padding-right: 5px;
  }
  td.message {
    padding-left: 5px;
  }
  td.message > a:link,
  td.message > a:visited {
    text-decoration: none;
    color: #313739;
  }
  td.message-error {
    padding-left: 5px;
    color: red;
    font-weight: bold;
  }
  td.message-error > a:link,
  td.message-error > a:visited {
    text-decoration: none;
    color: red;
  }
  td.message-highlight {
    padding-left: 5px;
    font-weight: bold;
  }
  td.message-highlight > a:link,
  td.message-highlight > a:visited {
    text-decoration: none;
    color: #313739;
  }
  td > a:hover,
  td > a:active {
    text-decoration: underline;
    color: #c13739;
  }
  table#tablelogs,
  table#tableentry {
    border-collapse: collapse;
  }
  td.field {
    text-align: right;
    border-right: 1px dotted lightgrey;
    padding-right: 5px;
  }
  td.data {
    padding-left: 5px;
  }
  div#keynav {
    text-align: center;
    font-size: 7pt;
    color: #818789;
    padding-top: 2em;
  }
  span.key {
    font-weight: bold;
    color: #313739;
  }
  div#buttonnav {
    text-align: center;
  }
  button {
    font-size: 18pt;
    font-weight: bold;
    width: 2em;
    height: 2em;
  }
  div#filternav {
    text-align: center;
  }
  select {
    width: 50em;
  }
</style>

<h1 id="title">Journal</h1>

<div id="os" />
<div id="virtualization" />
<div id="cutoff" />
<div id="machine" />
<div id="usage" />
<div id="showing" />

<div id="filternav">
  <select
    id="filter"
    onchange="onFilterChange(this);"
    onfocus="onFilterFocus(this);">
    <option>No filter</option>
  </select>

  <input id="boot" type="checkbox" onchange="onBootChange(this);" />
</div>

<div id="divlogs">
  <table id="tablelogs" />
</div>
<a name="entry" />
<div id="diventry">
  <table id="tableentry" />
</div>

<div id="buttonnav">
  <button id="head" onclick="entriesLoadHead();" title="First Page">⇤</button>
  <button
    id="previous"
    type="button"
    on:click={loadPrevious}
    title="Previous Page">
    ←
  </button>
  <button
    id="next"
    type="button"
    on:click={loadNext}
    title="Next Page">
    →
  </button>
  <button
    id="tail"
    type="button"
    onclick="entriesLoadTail();"
    title="Last Page">
    ⇥
  </button>

  <button id="more" type="button" onclick="entriesMore();" title="More Entries">
    +
  </button>
  <button
    id="less"
    type="button"
    onclick="entriesLess();"
    title="Fewer Entries">
    -
  </button>
</div>

<div id="keynav">
  <span class="key">g</span>
  : First Page     
  <span class="key">←, k, BACKSPACE</span>
  : Previous Page     
  <span class="key">→, j, SPACE</span>
  : Next Page     
  <span class="key">G</span>
  : Last Page     
  <span class="key">+</span>
  : More entries     
  <span class="key">-</span>
  : Fewer entries
</div>
