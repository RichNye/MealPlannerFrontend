const AUTH_STATUS_URL = `${baseURL}/me`;

function updateNav() {
    const container = document.getElementById("auth-links");
    container.innerHTML = ""; // Clear existing content

    if (isAuthenticated) {
        const logoutBtn = document.createElement("a");
        logoutBtn.href = "#";
        logoutBtn.textContent = "Logout";
        logoutBtn.onclick = async (e) => {
            e.preventDefault();
            await logout();
            isAuthenticated = false;
            updateNav();
            load?.(); // Only call if it exists
        };

        container.appendChild(logoutBtn);
    } else {
        const registerLink = document.createElement("a");
        registerLink.href = "register.html";
        registerLink.textContent = "Register";

        const loginLink = document.createElement("a");
        loginLink.href = "login.html";
        loginLink.textContent = "Login";



        container.appendChild(loginLink);
        container.appendChild(registerLink);
    }
}

async function checkAuth() {
    try {
        const response = await fetch(AUTH_STATUS_URL, {
            credentials: "include"
        });

        if (!response.ok) {
            isAuthenticated = false;
            updateNav();
            return;
        }

        const result = await response.json();
        isAuthenticated = result.isAuthenticated;
        username = result.name || null;

    } catch {
        isAuthenticated = false;
    }

    updateNav();
    return isAuthenticated;
}

checkAuth();