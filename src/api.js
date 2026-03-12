const API_BASE = "";

export const api = {
  fetch: (path, opts = {}) =>
    fetch(`${API_BASE}${path}`, {
      credentials: "include",
      headers: { "Content-Type": "application/json", ...opts.headers },
      ...opts,
    }),
};
