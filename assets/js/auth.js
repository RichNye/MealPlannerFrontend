const LOGIN_URL = `${baseURL}/login?useCookies=true`;
const LOGOUT_URL = `${baseURL}/me/logout`;

async function login(email, password) {
    try {
        const response = await fetch(`${baseURL}/login?useCookies=true`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Login failed:", errorText);
            alert("Login failed");
            return false;
        }

        console.log("Login successful");
        return true;

    } catch (err) {
        console.error("Login error:", err);
        return false;
    }
}

async function logout() {
    try {
        const response = await fetch(LOGOUT_URL, {
            method: "POST",
            credentials: "include"
        });
    }
    catch (err) {
        console.error("Logout error:", err);
    }
}

