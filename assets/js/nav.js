const AUTH_STATUS_URL = `${baseURL}/me`; // should return 200 if logged in, 401 if not

function updateNav() {
    const link = document.getElementById("auth-link");

    if (isAuthenticated) {
        link.textContent = "Logout";
        link.onclick = async (e) => {
            e.preventDefault();
            await logout();
            isAuthenticated = false;
            updateNav();
            load(); // reload meals if your API behaviour changes by auth
        };
    } else {
        link.textContent = "Login";
        link.onclick = async (e) => {
            e.preventDefault();

            const email = prompt("Email:");
            const password = prompt("Password:");

            const success = await login(email, password);

            if (success) {
                isAuthenticated = true;
                updateNav();
                load();
            }
        };
    }
}

async function checkAuth() {
    console.log("Checking authentication status...");
    try {
        const response = await fetch(AUTH_STATUS_URL, {
            credentials: "include"
        });
        const result = await response.json();

        isAuthenticated = result.isAuthenticated;
        username = result.name || "User";

        console.log("Authentication check result:", result);
    } catch (err) {
        isAuthenticated = false;
    }
    console.log("Authenticated:", isAuthenticated);
    updateNav();
}

checkAuth();
