const AUTH_STATUS_URL = "/api/auth/me"; // should return 200 if logged in, 401 if not
const LOGIN_URL = "/login";
const LOGOUT_URL = "/logout";

function updateNav() {
    const link = document.getElementById("auth-link");

    if (isAuthenticated) {
        link.textContent = "Logout";
        link.onclick = async (e) => {
            e.preventDefault();
            await fetch(LOGOUT_URL, {
                method: "POST"
            });
            isAuthenticated = false;
            updateNav();
            load(); // reload meals if your API behaviour changes by auth
        };
    } else {
        link.textContent = "Login";
        link.onclick = (e) => {
            e.preventDefault();
            window.location.href = LOGIN_URL;
        };
    }
}

async function checkAuth() {
    try {
        const resp = await fetch(AUTH_STATUS_URL, {
            credentials: "include"
        });
        isAuthenticated = resp.ok;
    } catch {
        isAuthenticated = false;
    }
    updateNav();
}

checkAuth();