// Base URL for API calls, determined by environment
const baseURL =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "";

let isAuthenticated = false;
let username = null;