import api from "consts:api";
import { session } from "./session.mjs";
import { FetchAction } from "svelte-common";

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

  get url()
  {
    return `${api}/systemctl/unit/${this.unit}`;
  }

  async *files() {
    const response = await fetch(`${api}/systemctl/unit/${unit.unit}/files`, {
      headers: session.authorizationHeader
    });
    return Object.entries(await response.json()).map(
      ([name, lines]) => new File(name, lines)
    );
  }

  execAction(action) {
    return FetchAction(`${api}/systemctl/unit/${this.unit}/${action}`, {
      method: "POST",
      headers: session.authorizationHeader
    });
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
