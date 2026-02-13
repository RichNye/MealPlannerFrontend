const REGISTER_URL = `${baseURL}/register`;

const form = document.getElementById("register-form");
const errorDiv = document.getElementById("form-error");

function showError(message) {
    errorDiv.textContent = message;
}

function clearError() {
    errorDiv.textContent = "";
}

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

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearError();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!email || !password || !confirmPassword) {
    showError("All fields are required.");
    return;
    }

    if (password !== confirmPassword) {
    showError("Passwords do not match.");
    return;
    }

    try {
    const resp = await fetch(REGISTER_URL, {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
        email,
        password
        })
    });

    if (!resp.ok) {
        const errorData = await resp.json().catch(() => null);
        showError(errorData?.message || "Registration failed.");
        return;
    }

    // If registration signs the user in automatically:
    window.location.href = "/index.html";

    } catch (err) {
    showError("Unexpected error. Please try again.");
    }
});

