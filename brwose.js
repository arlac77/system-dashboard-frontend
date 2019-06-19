                var first_cursor = null;
                var last_cursor = null;

                function getNEntries() {
                        var n;
                        n = localStorage["n_entries"];
                        if (n == null)
                                return 50;
                        n = parseInt(n);
                        if (n < 10)
                                return 10;
                        if (n > 1000)
                                return 1000;
                        return n;
                }

                function showNEntries(n) {
                        var showing = document.getElementById("showing");
                        showing.innerHTML = "Showing <b>" + n.toString() + "</b> entries.";
                }

                function setNEntries(n) {
                        if (n < 10)
                                return 10;
                        if (n > 1000)
                                return 1000;
                        localStorage["n_entries"] = n.toString();
                        showNEntries(n);
                }

                function machineLoad() {
                        var request = new XMLHttpRequest();
                        request.open("GET", "/machine");
                        request.onreadystatechange = machineOnResult;
                        request.setRequestHeader("Accept", "application/json");
                        request.send(null);
                }

                function formatBytes(u) {
                        if (u >= 1024*1024*1024*1024)
                                return (u/1024/1024/1024/1024).toFixed(1) + " TiB";
                        else if (u >= 1024*1024*1024)
                                return (u/1024/1024/1024).toFixed(1) + " GiB";
                        else if (u >= 1024*1024)
                                return (u/1024/1024).toFixed(1) + " MiB";
                        else if (u >= 1024)
                                return (u/1024).toFixed(1) + " KiB";
                        else
                                return u.toString() + " B";
                }

                function escapeHTML(s) {
                        return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                }

                function machineOnResult(event) {
                        if ((event.currentTarget.readyState != 4) ||
                                (event.currentTarget.status != 200 && event.currentTarget.status != 0))
                                return;

                        var d = JSON.parse(event.currentTarget.responseText);

                        var title = document.getElementById("title");
                        title.innerHTML = 'Journal of ' + escapeHTML(d.hostname);
                        document.title = 'Journal of ' + escapeHTML(d.hostname);

                        var machine = document.getElementById("machine");
                        machine.innerHTML = 'Machine ID is <b>' + d.machine_id + '</b>, current boot ID is <b>' + d.boot_id + '</b>.';

                        var cutoff = document.getElementById("cutoff");
                        var from = new Date(parseInt(d.cutoff_from_realtime) / 1000);
                        var to = new Date(parseInt(d.cutoff_to_realtime) / 1000);
                        cutoff.innerHTML = 'Journal begins at <b>' + from.toLocaleString() + '</b> and ends at <b>' + to.toLocaleString() + '</b>.';

                        var usage = document.getElementById("usage");
                        usage.innerHTML = 'Disk usage is <b>' + formatBytes(parseInt(d.usage)) + '</b>.';

                        var os = document.getElementById("os");
                        os.innerHTML = 'Operating system is <b>' + escapeHTML(d.os_pretty_name) + '</b>.';

                        var virtualization = document.getElementById("virtualization");
                        virtualization.innerHTML = d.virtualization == "bare" ? "Running on <b>bare metal</b>." : "Running on virtualization <b>" + escapeHTML(d.virtualization) + "</b>.";
                }

                function entriesLoad(range) {

                        if (range == null) {
                                if (localStorage["cursor"] != null && localStorage["cursor"] != "")
                                        range = localStorage["cursor"] + ":0";
                                else
                                        range = "";
                        }

                        var url = "/entries";

                        if (localStorage["filter"] != "" && localStorage["filter"] != null) {
                                url += "?_SYSTEMD_UNIT=" + escape(localStorage["filter"]);

                                if (localStorage["boot"] == "1")
                                        url += "&boot";
                        } else {
                                if (localStorage["boot"] == "1")
                                        url += "?boot";
                        }

                        var request = new XMLHttpRequest();
                        request.open("GET", url);
                        request.onreadystatechange = entriesOnResult;
                        request.setRequestHeader("Accept", "application/json");
                        request.setRequestHeader("Range", "entries=" + range + ":" + getNEntries().toString());
                        request.send(null);
                }

                function entriesLoadNext() {
                        if (last_cursor == null)
                                entriesLoad("");
                        else
                                entriesLoad(last_cursor + ":1");
                }

                function entriesLoadPrevious() {
                        if (first_cursor == null)
                                entriesLoad("");
                        else
                                entriesLoad(first_cursor + ":-" + getNEntries().toString());
                }

                function entriesLoadHead() {
                        entriesLoad("");
                }

                function entriesLoadTail() {
                        entriesLoad(":-" + getNEntries().toString());
                }

                function entriesOnResult(event) {

                        if ((event.currentTarget.readyState != 4) ||
                                (event.currentTarget.status != 200 && event.currentTarget.status != 0))
                                return;

                        var logs = document.getElementById("tablelogs");

                        var lc = null;
                        var fc = null;

                        var i, l = event.currentTarget.responseText.split('\n');

                        if (l.length <= 1) {
                                logs.innerHTML = '<tbody><tr><td colspan="3"><i>No further entries...</i></td></tr></tbody>';
                                return;
                        }

                        var buf = '';

                        for (i in l) {
                                if (l[i] == '')
                                        continue;

                                var d = JSON.parse(l[i]);
                                if (d.MESSAGE == undefined || d.__CURSOR == undefined)
                                        continue;

                                if (fc == null)
                                        fc = d.__CURSOR;
                                lc = d.__CURSOR;

                                var priority;
                                if (d.PRIORITY != undefined)
                                        priority = parseInt(d.PRIORITY);
                                else
                                        priority = 6;

                                var clazz;
                                if (priority <= 3)
                                        clazz = "message-error";
                                else if (priority <= 5)
                                        clazz = "message-highlight";
                                else
                                        clazz = "message";

                                buf += '<tr><td class="timestamp">';

                                if (d.__REALTIME_TIMESTAMP != undefined) {
                                        var timestamp = new Date(parseInt(d.__REALTIME_TIMESTAMP) / 1000);
                                        buf += timestamp.toLocaleString();
                                }

                                buf += '</td><td class="process">';

                                if (d.SYSLOG_IDENTIFIER != undefined)
                                        buf += escapeHTML(d.SYSLOG_IDENTIFIER);
                                else if (d._COMM != undefined)
                                        buf += escapeHTML(d._COMM);

                                if (d._PID != undefined)
                                        buf += "[" + escapeHTML(d._PID) + "]";
                                else if (d.SYSLOG_PID != undefined)
                                        buf += "[" + escapeHTML(d.SYSLOG_PID) + "]";

                                buf += '</td><td class="' + clazz + '"><a href="#entry" onclick="onMessageClick(\'' + d.__CURSOR + '\');">';

                                if (d.MESSAGE == null)
                                        buf += "[blob data]";
                                else if (d.MESSAGE instanceof Array)
                                        buf += "[" + formatBytes(d.MESSAGE.length) + " blob data]";
                                else
                                        buf += escapeHTML(d.MESSAGE);

                                buf += '</a></td></tr>';
                        }

                        logs.innerHTML = '<tbody>' + buf + '</tbody>';

                        if (fc != null) {
                                first_cursor = fc;
                                localStorage["cursor"] = fc;
                        }
                        if (lc != null)
                                last_cursor = lc;
                }

                function entriesMore() {
                        setNEntries(getNEntries() + 10);
                        entriesLoad(first_cursor);
                }

                function entriesLess() {
                        setNEntries(getNEntries() - 10);
                        entriesLoad(first_cursor);
                }

                function onResultMessageClick(event) {
                        if ((event.currentTarget.readyState != 4) ||
                                (event.currentTarget.status != 200 && event.currentTarget.status != 0))
                                return;

                        var d = JSON.parse(event.currentTarget.responseText);

                        document.getElementById("diventry").style.display = "block";
                        var entry = document.getElementById("tableentry");

                        var buf = "";
                        for (var key in d) {
                                var data = d[key];

                                if (data == null)
                                        data = "[blob data]";
                                else if (data instanceof Array)
                                        data = "[" + formatBytes(data.length) + " blob data]";
                                else
                                        data = escapeHTML(data);

                                buf += '<tr><td class="field">' + key + '</td><td class="data">' + data + '</td></tr>';
                        }
                        entry.innerHTML = '<tbody>' + buf + '</tbody>';
                }

                function onMessageClick(t) {
                        var request = new XMLHttpRequest();
                        request.open("GET", "/entries?discrete");
                        request.onreadystatechange = onResultMessageClick;
                        request.setRequestHeader("Accept", "application/json");
                        request.setRequestHeader("Range", "entries=" + t + ":0:1");
                        request.send(null);
                }

                function onKeyUp(event) {
                        switch (event.keyCode) {
                                case 8:
                                case 37:
                                case 75:
                                        entriesLoadPrevious();
                                        break;
                                case 32:
                                case 39:
                                case 74:
                                        entriesLoadNext();
                                        break;

                                case 71:
                                        if (event.shiftKey)
                                                entriesLoadTail();
                                        else
                                                entriesLoadHead();
                                        break;
                                case 171:
                                        entriesMore();
                                        break;
                                case 173:
                                        entriesLess();
                                        break;
                        }
                }

                function onMouseWheel(event) {
                        if (event.detail < 0 || event.wheelDelta > 0)
                                entriesLoadPrevious();
                        else
                                entriesLoadNext();
                }

                function onResultFilterFocus(event) {
                        if ((event.currentTarget.readyState != 4) ||
                                (event.currentTarget.status != 200 && event.currentTarget.status != 0))
                                return;

                        var f = document.getElementById("filter");

                        var l = event.currentTarget.responseText.split('\n');
                        var buf = '<option>No filter</option>';
                        var j = -1;

                        for (i in l) {

                                if (l[i] == '')
                                      continue;

                                var d = JSON.parse(l[i]);
                                if (d._SYSTEMD_UNIT == undefined)
                                      continue;

                                buf += '<option value="' + escape(d._SYSTEMD_UNIT) + '">' + escapeHTML(d._SYSTEMD_UNIT) + '</option>';

                                if (d._SYSTEMD_UNIT == localStorage["filter"])
                                        j = i;
                        }

                        if (j < 0) {
                                if (localStorage["filter"] != null && localStorage["filter"] != "") {
                                          buf += '<option value="' + escape(localStorage["filter"]) + '">' + escapeHTML(localStorage["filter"]) + '</option>';
                                          j = i + 1;
                                } else
                                          j = 0;
                        }

                        f.innerHTML = buf;
                        f.selectedIndex = j;
                }

                function onFilterFocus(w) {
                        var request = new XMLHttpRequest();
                        request.open("GET", "/fields/_SYSTEMD_UNIT");
                        request.onreadystatechange = onResultFilterFocus;
                        request.setRequestHeader("Accept", "application/json");
                        request.send(null);
                }

                function onFilterChange(w) {
                        if (w.selectedIndex <= 0)
                                localStorage["filter"] = "";
                        else
                                localStorage["filter"] = unescape(w.options[w.selectedIndex].value);

                        entriesLoadHead();
                }

                function onBootChange(w) {
                        localStorage["boot"] = w.checked ? "1" : "0";
                        entriesLoadHead();
                }

                function initFilter() {
                        var f = document.getElementById("filter");

                        var buf = '<option>No filter</option>';

                        var filter = localStorage["filter"];
                        var j;
                        if (filter != null && filter != "") {
                                buf += '<option value="' + escape(filter) + '">' + escapeHTML(filter) + '</option>';
                                j = 1;
                        } else
                                j = 0;

                        f.innerHTML = buf;
                        f.selectedIndex = j;
                }

                function installHandlers() {
                        document.onkeyup = onKeyUp;

                        var logs = document.getElementById("divlogs");
                        logs.addEventListener("mousewheel", onMouseWheel, false);
                        logs.addEventListener("DOMMouseScroll", onMouseWheel, false);
                }

                machineLoad();
                entriesLoad(null);
                showNEntries(getNEntries());
                initFilter();
                installHandlers();
