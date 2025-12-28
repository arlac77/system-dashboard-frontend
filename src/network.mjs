export class NetworkInterface {
  constructor(json) {
    Object.assign(this, json);
  }

  get name()
  {
    return this.Name;
  }
}

export class Named {
  constructor(json) {
    Object.assign(this, json);
  }
}

export class Fail2Ban {
  constructor(json) {
    Object.assign(this, json);
  }
}
