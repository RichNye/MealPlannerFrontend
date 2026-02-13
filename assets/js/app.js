const API_URL = "/api/recipes";

let isAuthenticated = false;

function escapeHtml(str) {
    return str.replace(/[&<>"']/g, c => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    } [c]));
}

function render(meals) {
    const rows = document.getElementById('rows');
    rows.innerHTML = '';

    for (const meal of meals) {
        const name = meal.name?.trim() || "Untitled meal";
        const descRaw = meal.description?.trim() || "";
        const desc = descRaw && descRaw.toUpperCase() !== "N/A" ?
            descRaw :
            "No description provided.";

        const card = document.createElement('article');
        card.className = 'meal';
        card.innerHTML = `
            <h2>${escapeHtml(name)}</h2>
            <p>${escapeHtml(desc)}</p>
        `;

        rows.appendChild(card);
    }
}

async function load() {
    const status = document.getElementById('status');
    status.textContent = 'Loading…';

    try {
        const resp = await fetch(API_URL, {
            headers: {
                'Accept': 'application/json'
            },
            credentials: "include"
        });

        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

        const data = await resp.json();
        const list = Array.isArray(data) ? data : [data];

        if (!list.length) {
            status.textContent = 'No meals returned.';
            document.getElementById('rows').innerHTML = '';
            return;
        }

        status.textContent =
            `Showing ${list.length} meal${list.length === 1 ? '' : 's'}.`;

        render(list);
    } catch (err) {
        status.textContent = `Error: ${err.message}`;
        document.getElementById('rows').innerHTML = '';
    }
}

document.getElementById('reload').addEventListener('click', load);

load();