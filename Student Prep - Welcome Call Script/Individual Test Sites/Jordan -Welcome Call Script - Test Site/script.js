(function () {
  "use strict";

  const chatToggleBtn = document.getElementById("chatToggle");
  const chatToggleImg = document.getElementById("chatToggleImg");
  const militaryToggleBtn = document.getElementById("militaryToggle");
  const militaryToggleImg = document.getElementById("militaryToggleImg");

  // Normal view: no scroll. When zoomed in: allow scroll so .sheet content is not cut off.
  function setZoomScroll() {
    var isZoomed = false;
    if (window.visualViewport && typeof window.visualViewport.scale === "number") {
      isZoomed = window.visualViewport.scale > 1;
    }
    if (!isZoomed && window.outerWidth > 0 && window.innerWidth > 0) {
      var ratio = window.outerWidth / window.innerWidth;
      if (ratio < 0.99 || ratio > 1.01) isZoomed = true;
    }
    if (!isZoomed && document.documentElement.scrollHeight > window.innerHeight + 10) {
      isZoomed = true;
    }
    document.documentElement.classList.toggle("zoom-allows-scroll", isZoomed);
  }
  setZoomScroll();
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", setZoomScroll);
    window.visualViewport.addEventListener("scroll", setZoomScroll);
  }
  window.addEventListener("resize", setZoomScroll);
  window.addEventListener("load", setZoomScroll);

  function setChatState(isChatOn) {
    // isChatOn = true: Chat_icon_on.svg, black placeholders (hints hidden)
    // isChatOn = false: Chat_icon_off.svg, red placeholders (hints visible) - DEFAULT
    document.body.classList.toggle("chat-on", isChatOn);
    document.body.classList.toggle("chat-off", !isChatOn);

    if (chatToggleBtn) {
      chatToggleBtn.setAttribute("aria-pressed", isChatOn ? "true" : "false");
    }

    if (chatToggleImg) {
      const onSrc = chatToggleImg.getAttribute("data-on-src") || "images/Chat_icon_on.svg";
      const offSrc = chatToggleImg.getAttribute("data-off-src") || "images/Chat_icon_off.svg";
      // When chat is ON: show Chat_icon_on.svg, when OFF: show Chat_icon_off.svg
      chatToggleImg.src = isChatOn ? onSrc : offSrc;
      chatToggleImg.alt = isChatOn ? "Chat On" : "Chat Off";
    }

    const chatLabelEl = document.getElementById("chatToggleLabel");
    if (chatLabelEl) {
      chatLabelEl.textContent = isChatOn ? "Chat On" : "Chat Off";
    }
  }

  function setMilitaryState(isMilitaryOn) {
    document.body.classList.toggle("military-on", isMilitaryOn);
    document.body.classList.toggle("military-off", !isMilitaryOn);

    if (militaryToggleBtn) {
      militaryToggleBtn.setAttribute("aria-pressed", isMilitaryOn ? "true" : "false");
    }

    if (militaryToggleImg) {
      const onSrc = militaryToggleImg.getAttribute("data-on-src") || "images/Military_icon_on.svg";
      const offSrc = militaryToggleImg.getAttribute("data-off-src") || "images/Military_icon_off.svg";
      militaryToggleImg.src = isMilitaryOn ? onSrc : offSrc;
      militaryToggleImg.alt = isMilitaryOn ? "Military On" : "Military Off";
    }
  }

  if (chatToggleBtn) {
    chatToggleBtn.addEventListener("click", function () {
      const isChatOn = !document.body.classList.contains("chat-on");
      setChatState(isChatOn);
    });
    // Start with chat OFF: Chat_icon_off.svg, red placeholders (hints visible)
    setChatState(false);
  }

  if (militaryToggleBtn) {
    militaryToggleBtn.addEventListener("click", function () {
      const isMilitaryOn = !document.body.classList.contains("military-on");
      setMilitaryState(isMilitaryOn);
    });
    // Start with military OFF: Military_icon_off.svg
    setMilitaryState(false);
  }

  // COS Students toggle: show/hide content box
  const cosToggle = document.getElementById("cosToggle");
  const cosContentBox = document.getElementById("cosContentBox");
  if (cosToggle && cosContentBox) {
    cosToggle.addEventListener("change", function () {
      const checked = cosToggle.checked;
      cosContentBox.hidden = !checked;
      cosToggle.setAttribute("aria-checked", checked ? "true" : "false");
    });
    cosContentBox.hidden = true;
  }
})();
