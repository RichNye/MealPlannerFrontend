document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const errorDiv = document.getElementById("form-error");

    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // STOP PAGE REFRESH

        errorDiv.textContent = "";

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (!email || !password) {
            errorDiv.textContent = "Email and password are required.";
            return;
        }

        const success = await login(email, password);

        if (success) {
            window.location.href = "index.html";
        } else {
            errorDiv.textContent = "Invalid login details.";
        }
    });
});
