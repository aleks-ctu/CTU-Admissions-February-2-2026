const toggleComplete = document.getElementById("toggleComplete");
const toggleCorrection = document.getElementById("toggleCorrection");

const statusBox = document.getElementById("statusBox");
const statusText = document.getElementById("statusText");

const chatToggleBtn = document.getElementById("chatToggle");
const chatToggleImg = document.getElementById("chatToggleImg");

const COMPLETE_MSG =
  "Great job completing your application! It looks like everything is in order. Let's talk about your next steps and then I will submit your application.";

const CORRECTION_MSG =
  "Great job completing your application! While I was reviewing it, I noticed your application requires a correction. Let me guide you through that now, then I will submit your application. Go ahead and log into the application site.";

function renderStatus() {
  // Mutually exclusive behavior (matches screenshots: only one “on” at a time)
  if (toggleComplete.checked && toggleCorrection.checked) {
    // if user turns one on while the other is already on, prefer the most recently changed
    // (handled in the change listeners), but this is a safe fallback:
    toggleCorrection.checked = false;
  }

  if (toggleComplete.checked) {
    statusBox.hidden = false;
    statusText.textContent = COMPLETE_MSG;
    return;
  }

  if (toggleCorrection.checked) {
    statusBox.hidden = false;
    statusText.textContent = CORRECTION_MSG;
    return;
  }

  // Neither selected (matches your “both gray/off” screenshot)
  statusBox.hidden = true;
  statusText.textContent = "";
}

// Prefer last-changed toggle
toggleComplete.addEventListener("change", () => {
  if (toggleComplete.checked) toggleCorrection.checked = false;
  renderStatus();
});

toggleCorrection.addEventListener("change", () => {
  if (toggleCorrection.checked) toggleComplete.checked = false;
  renderStatus();
});

// Start with both off (gray)
toggleComplete.checked = false;
toggleCorrection.checked = false;
renderStatus();

// Chat On/Off formatting toggle:
// - Default (chat ON): placeholders are red + italic + bold (existing .hint styling)
// - Chat OFF: placeholders become bold only (handled by body.chat-off .hint)
function setChatOff(isOff) {
  document.body.classList.toggle("chat-off", isOff);

  if (chatToggleBtn) chatToggleBtn.setAttribute("aria-pressed", String(isOff));

  if (chatToggleImg) {
    const onSrc = chatToggleImg.getAttribute("data-on-src") || "images/chatOnOff.png";
    const offSrc = chatToggleImg.getAttribute("data-off-src") || "images/chatOff.png";
    chatToggleImg.src = isOff ? offSrc : onSrc;
    chatToggleImg.alt = isOff ? "Chat Off" : "Chat On/Off";
  }
}

if (chatToggleBtn) {
  chatToggleBtn.addEventListener("click", () => {
    const isOff = !document.body.classList.contains("chat-off");
    setChatOff(isOff);
  });
}
