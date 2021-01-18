import api from "consts:api";
import { session } from "./session.mjs";
import { FetchCommand } from "svelte-command";

const name2title = {
  stop: "Stop",
  start: "Start",
  restart: "Restart",
  reload: "Reload",
  freeze: "Freeze",
  thaw: "Thaw"
};

export class Unit {
  constructor(json) {
    Object.assign(this, json);

    for (const prop of ["triggeredBy", "triggers", "activates", "follow"]) {
      if (json[prop]) {
        this[prop] = new Unit({ unit: json[prop] });
      }
    }

    if (json.units) {
      this.units = json.units.map(u => new Unit({ unit: u }));
    }

    for (const name of ["next", "last", "since", "trigger"]) {
      if (json[name]) {
        this[name] = new Date(json[name]);
      }
    }
  }

  get type() {
    const parts = this.unit.split(".");
    return parts[parts.length - 1];
  }

  get name() {
    const parts = this.unit.split(".");
    return parts[0];
  }

  get url() {
    return `${api}/systemctl/unit/${this.unit}`;
  }

  async *files() {
    const response = await fetch(`${this.url}/files`, {
      headers: session.authorizationHeader
    });
    return Object.entries(await response.json()).map(
      ([name, lines]) => new File(name, lines)
    );
  }

  command(name) {
    return new FetchCommand(
      `${this.url}/${name}`,
      {
        method: "POST",
        headers: session.authorizationHeader
      },
      {
        title: name2title[name]
      }
    );
  }

  get actions() {
    return Object.keys(name2title).map(name => this.command(name));
  }
}

export class Timer extends Unit {}

export class Socket extends Unit {}

export class File {
  constructor(name, lines) {
    this.name = name;
    this.lines = lines;
  }
}
