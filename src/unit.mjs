import api from "consts:api";
import { session } from "./main.mjs";

async function execAction(unit, action) {
  const response = await fetch(`${api}/systemctl/unit/${unit.unit}/${action}`, {
    method: "POST",
    headers: session.authorizationHeader
  });
  return response;
}

export class Unit {
  constructor(json) {
    Object.assign(this, json);
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
