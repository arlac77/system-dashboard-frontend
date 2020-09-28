import api from "consts:api";
import { session } from "./main.mjs";

async function execAction(unit, action) {
  const response = await fetch(`${api}/systemctl/unit/${unit.unit}/${action}`, {
    method: "POST",
    headers: session.authorizationHeader
  });
  if (!response.ok) {
    throw new Error(response);
  }
  return response;
}

export class Unit {
  constructor(json) {
    Object.assign(this, json);

    if(!this.unit) {
      console.log("NO UNIT", json);
    }

    for (const prop of ["triggeredBy", "triggers", "activates", "follow"]) {
      if (json[prop]) {
        this[prop] = new Unit({ unit: json[prop] });
      }
    }

    if (json.units) {
      this.units = json.units.map(u => new Unit({ unit: u }));
    }
    
    if(json.since) {
      this.since = new Date(json.since);
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

  async *files() {
    const response = await fetch(`${api}/systemctl/unit/${unit.unit}/files`, {
      headers: session.authorizationHeader
    });
    return Object.entries(await response.json()).map(
      ([name, lines]) => new File(name, lines)
    );
  }

  async stop() {
    return execAction(this, "stop");
  }

  async start() {
    return execAction(this, "start");
  }

  async restart() {
    return execAction(this, "restart");
  }

  async reload() {
    return execAction(this, "reload");
  }

  async freeze() {
    return execAction(this, "freeze");
  }

  async thaw() {
    return execAction(this, "thaw");
  }
}

export class Timer extends Unit {
  constructor(json) {
    super(json);
    this.next = new Date(this.next);
    this.last = new Date(this.last);
  }
}

export class Socket extends Unit {}

export class File {
  constructor(name, lines) {
    this.name = name;
    this.lines = lines;
  }
}
