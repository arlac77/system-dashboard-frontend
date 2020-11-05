import api from "consts:api";

export async function* fetchIterator(path, factory, session, transition) {
  const res = await fetch(api + path, {
    headers: {
      ...session.authorizationHeader
    }
  });

  const filterAttributeName = "unit";

  const v = transition
    ? transition.searchParams.get(filterAttributeName)
    : undefined;
  const q = v ? new RegExp(v, "i") : /.*/;

  for (const u of await res.json()) {
    if (
      u[filterAttributeName] === undefined ||
      u[filterAttributeName].match(q)
    ) {
      yield new factory(u);
    }
  }
}

export async function fetchObject(path, factory, session) {
  const res = await fetch(api + path, {
    headers: {
      ...session.authorizationHeader
    }
  });
  return new factory(await res.json());
}
