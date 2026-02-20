// Helper: copy text to clipboard for "Admin Website"
document.addEventListener("click", function (e) {
    const target = e.target.closest(".copy-link");
    if (!target) return;

    e.preventDefault();
    const text = target.getAttribute("data-copy");
    if (!text) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
            .then(() => alert("Link copied to clipboard!"))
            .catch(() => alert("Unable to copy link."));
    } else {
        // Fallback
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand("copy");
            alert("Link copied to clipboard!");
        } catch (err) {
            alert("Unable to copy link.");
        }
        document.body.removeChild(textarea);
    }
});

// Accordion (resources demo logins, FAFSA block)
document.querySelectorAll(".accordion-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-target");
        if (!targetId) return;
        const panel = document.querySelector(targetId);
        if (!panel) return;

        const isOpen = panel.style.display === "block";
        panel.style.display = isOpen ? "none" : "block";
        btn.classList.toggle("accordion-open", !isOpen);
    });
});

// Theme toggle
(function initThemeToggle() {
    const toggle = document.getElementById("theme-toggle");
    if (!toggle) return;

    // load stored preference
    const stored = localStorage.getItem("kc-theme");
    if (stored === "dark") {
        document.body.classList.add("dark-mode");
        toggle.checked = true;
    }

    toggle.addEventListener("change", () => {
        if (toggle.checked) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("kc-theme", "dark");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("kc-theme", "light");
        }
    });
})();

// Ops button
document.getElementById("ops-button")?.addEventListener("click", () => {
    window.open(
        "https://apps.powerapps.com/play/e/default-144ec532-2c21-4430-bf7f-49f02b8a67d7/a/cb1509c5-a4ef-4f0f-a5a3-31f6c9e4d4af?tenantId=144ec532-2c21-4430-bf7f-49f02b8a67d7",
        "_blank"
    );
});

// Search logic: match link text across all 4 pages (case-insensitive, partial/word match)
function linkMatchesQuery(linkText, query) {
    if (!query) return false;
    const text = linkText.toLowerCase();
    const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return words.every(word => text.includes(word));
}

function performSearch() {
    const input = document.getElementById("search-criteria");
    const resultsPanel = document.getElementById("search-results");
    const resultsContent = document.getElementById("results-content");
    if (!input || !resultsPanel || !resultsContent || typeof SEARCH_PAGES === "undefined") return;

    const query = input.value.trim();
    const showAll = !query; // Empty box = show ALL links from search-data (no matching)

    const htmlParts = [];

    SEARCH_PAGES.forEach(page => {
        const matchingLinks = showAll
            ? page.links
            : page.links.filter(link => linkMatchesQuery(link.text, query));

        if (matchingLinks.length === 0) return;

        htmlParts.push(
            `<div class="page-section" id="${page.id}-section">`,
            `<div class="Page_Name"><b><u>${escapeHtml(page.title)}</u></b><br /></div>`,
            `<div class="catalog-results">`
        );

        matchingLinks.forEach(link => {
            const href = link.href || "#";
            const openTag = link.dataCopy
                ? `<a href="#" class="copy-link" data-copy="${escapeHtml(link.dataCopy)}" target="_blank">`
                : `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">`;
            htmlParts.push(
                `<div class="contact-name">`,
                openTag,
                escapeHtml(link.text),
                `</a><br />`,
                `</div>`
            );
        });

        htmlParts.push(`</div></div><br />`);
    });

    if (htmlParts.length === 0) {
        resultsContent.innerHTML = `<div class="no-results-any">No results found for "${escapeHtml(query)}".</div>`;
    } else {
        resultsContent.innerHTML = htmlParts.join("");
    }

    resultsPanel.style.display = "flex";
    const overlay = document.getElementById("search-overlay");
    if (overlay) {
        overlay.style.display = "block";
        overlay.setAttribute("aria-hidden", "false");
    }
}

function escapeHtml(str) {
    if (!str) return "";
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

document.getElementById("search-btn")?.addEventListener("click", performSearch);
document.getElementById("search-criteria")?.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        e.preventDefault();
        performSearch();
    }
});

function closeSearchResults() {
    const resultsPanel = document.getElementById("search-results");
    const input = document.getElementById("search-criteria");
    const resultsContent = document.getElementById("results-content");
    const overlay = document.getElementById("search-overlay");
    if (!resultsPanel || !input) return;
    input.value = "";
    resultsPanel.style.display = "none";
    if (resultsContent) resultsContent.innerHTML = "";
    if (overlay) {
        overlay.style.display = "none";
        overlay.setAttribute("aria-hidden", "true");
    }
}

document.getElementById("search_close")?.addEventListener("click", closeSearchResults);
document.getElementById("search-overlay")?.addEventListener("click", closeSearchResults);
