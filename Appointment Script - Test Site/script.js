(function () {
  "use strict";

  const chatToggleBtn = document.getElementById("chatToggle");
  const chatToggleImg = document.getElementById("chatToggleImg");

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
    // isChatOn = true: chatOnOff.png icon, white label, red placeholders (hints visible)
    // isChatOn = false: chatOff.png icon, rgb(178, 41, 46) label, black placeholders (hints hidden)
    document.body.classList.toggle("chat-on", isChatOn);
    document.body.classList.toggle("chat-off", !isChatOn);

    if (chatToggleBtn) {
      chatToggleBtn.setAttribute("aria-pressed", isChatOn ? "true" : "false");
    }

    if (chatToggleImg) {
      const onSrc = chatToggleImg.getAttribute("data-on-src") || "images/chatOnOff.png";
      const offSrc = chatToggleImg.getAttribute("data-off-src") || "images/chatOff.png";
      // When chat is ON: show chatOnOff.png, when OFF: show chatOff.png
      chatToggleImg.src = isChatOn ? onSrc : offSrc;
      chatToggleImg.alt = isChatOn ? "Chat On" : "Chat Off";
    }
  }

  if (chatToggleBtn) {
    chatToggleBtn.addEventListener("click", function () {
      const isChatOn = !document.body.classList.contains("chat-on");
      setChatState(isChatOn);
    });
    // Start with chat ON: chatOnOff.png icon, white label, red placeholders
    setChatState(true);
  }
})();
