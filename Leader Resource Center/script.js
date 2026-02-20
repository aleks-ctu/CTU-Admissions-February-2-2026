// Mark links whose text starts with "CD" or "CDOA" for hover styling
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("a").forEach((a) => {
    const text = (a.textContent || "").trim();
    if (text === "CDOA Fundamentals Knowledge Check") return;
    if (text.startsWith("CD") || text.startsWith("CDOA")) {
      a.classList.add("link-cd");
    }
  });

  initResourceSearch();
});

// Search: index all page links with their box names, filter on input
function initResourceSearch() {
  const NAV_LABELS = {
    "container-PSReq1": "Admissions Staffing List",
    "container-PSReq2": "CTU TOER Report",
    "container-PSReq3": "CTU Marketing Summary",
    "container-PSReq4": "CTU Daily Flash Actives Only",
    "container-PSReq6": "CTU Operational Summary",
    "container-PSReq7": "Report Archives",
    "container-PSReq8": "Admin and NICE Announcements",
    "container-PSReq9": "Admissions Training and Resources",
    "container-PSReq10": "Compliance Updates and Reminders",
    "container-PSReq11": "Outages and Tech Issues"
  };

  const BOX_HEADERS = {
    "box10": "Admissions Reports / CTU Leaders Teams",
    "box70": "Mail Merges",
    "box80": "Start Management",
    "box20": "Call Observations & RORs",
    "box30": "Administrative Forms",
    "box40": "Advisor Performance Management",
    "box50": "Administrative Requests",
    "box60": "Advisor Onboarding",
    "box15": "Director Onboarding",
    "box25": "Separating"
  };

  function getBoxName(link) {
    let el = link.parentElement;
    while (el) {
      if (el.classList && el.classList.contains("box10")) {
        const container = link.closest("[class^='container-PSReq']");
        if (container) {
          const cls = container.className.split(" ")[0];
          const n = parseInt((cls.match(/PSReq(\d+)/) || [])[1], 10);
          return n >= 8 ? "CTU Leaders Teams Channels" : "Admissions Reports";
        }
        return "Admissions Reports";
      }
      if (el.tagName === "SECTION" && el.classList) {
        const boxClass = ["box70","box80","box20","box30","box40","box50","box60","box15","box25"]
          .find(c => el.classList.contains(c));
        return boxClass ? BOX_HEADERS[boxClass] : null;
      }
      el = el.parentElement;
    }
    return null;
  }

  function getLinkText(link) {
    const text = (link.textContent || "").trim();
    if (text) return text;
    const container = link.closest("[class^='container-PSReq']");
    if (container) return NAV_LABELS[container.className.split(" ")[0]] || "";
    try {
      const u = new URL(link.href);
      const seg = u.pathname.split("/").filter(Boolean).pop() || "";
      return decodeURIComponent(seg).replace(/\.[^.]+$/, "").replace(/%20/g, " ") || "Link";
    } catch (_) { return "Link"; }
  }

  const linkIndex = [];
  document.querySelectorAll("a[href]").forEach((a) => {
    if (a.closest("head") || a.closest(".box10")) return;
    const href = (a.getAttribute("href") || "").trim();
    if (!href || href === "#" || href.startsWith("javascript:")) return;
    const text = getLinkText(a);
    const box = getBoxName(a);
    if (text) linkIndex.push({ el: a, text, box: box || "Page", href: a.href });
  });

  const input = document.getElementById("resource-search");
  const resultsEl = document.getElementById("search-results");
  const overlay = document.getElementById("search-overlay");
  const searchBtn = document.getElementById("search-btn");
  if (!input || !resultsEl || !overlay || !searchBtn) return;

  function showSearchModal() {
    const q = (input.value || "").trim().toLowerCase();
    const matches = q.length >= 1
      ? linkIndex.filter(
          (item) => item.text.toLowerCase().includes(q) || (item.box && item.box.toLowerCase().includes(q))
        )
      : linkIndex;

    const countEl = document.getElementById("search-results-count");
    if (countEl) countEl.textContent = matches.length === 0 ? "" : matches.length + (matches.length === 1 ? " result" : " results");

    resultsEl.innerHTML = "";
    if (matches.length === 0) {
      resultsEl.innerHTML = '<div class="search-no-results">No links found</div>';
    } else {
      matches.forEach((item) => {
        const a = document.createElement("a");
        a.href = item.href;
        a.target = "_blank";
        a.rel = "noopener";
        a.className = "search-result-item";
        a.innerHTML = `<span class="search-result-label">${escapeHtml(item.text)}</span><div class="search-result-box">in ${escapeHtml(item.box)}</div>`;
        a.addEventListener("click", () => {
          closeSearchModal();
        });
        resultsEl.appendChild(a);
      });
    }
    overlay.classList.add("visible");
    overlay.setAttribute("aria-hidden", "false");
  }

  function closeSearchModal() {
    overlay.classList.remove("visible");
    overlay.setAttribute("aria-hidden", "true");
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      showSearchModal();
    }
  });

  searchBtn.addEventListener("click", showSearchModal);

  overlay.querySelector(".search-modal-close").addEventListener("click", closeSearchModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeSearchModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("visible")) closeSearchModal();
  });

  function escapeHtml(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }
}

// Toggle Mail Merge content sections – each button toggles on/off independently
function toggleContent(buttonNumber, buttonElement) {
  const targetContent = document.getElementById("content" + buttonNumber);
  if (!targetContent) return;

  const isActive = buttonElement.classList.contains("active");

  if (isActive) {
    buttonElement.classList.remove("active");
    targetContent.classList.remove("visible");
  } else {
    buttonElement.classList.add("active");
    targetContent.classList.add("visible");
  }
}
