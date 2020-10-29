import api from "consts:api";

export function fetchIterator(path, factory, session) {
  return async function* it() {
    const res = await fetch(api + path, {
      headers: {
        ...session.authorizationHeader
      }
    });
    for (const u of await res.json()) {
      yield new factory(u);
    }
  };
}

export async function fetchObject(path, factory, session) {
  const res = await fetch(api + path, {
    headers: {
      ...session.authorizationHeader
    }
  });
  return new factory(await res.json());
}
