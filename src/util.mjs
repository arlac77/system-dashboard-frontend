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
