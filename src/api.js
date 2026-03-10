const API_BASE = "http://192.168.178.29:8080";

export const api = {
  fetch: (path, opts = {}) =>
    fetch(`${API_BASE}${path}`, {
      credentials: "include",
      headers: { "Content-Type": "application/json", ...opts.headers },
      ...opts,
    }),
};
