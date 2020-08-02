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

    if (json.triggeredBy) {
      this.triggeredBy = new Unit({ unit: json.triggeredBy });
    }
    if (json.activates) {
      this.activates = new Unit({ unit: json.activates });
    }
    if (json.units) {
      this.units = json.units.map(u => new Unit({ unit: u }));
    }
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
}

export class Timer extends Unit {}

export class Socket extends Unit {}
