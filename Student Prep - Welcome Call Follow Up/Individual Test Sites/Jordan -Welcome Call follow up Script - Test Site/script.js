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

  // ReEntry Students toggle: show/hide content box
  const reentryToggle = document.getElementById("reentryToggle");
  const reentryContentBox = document.getElementById("reentryContentBox");
  if (reentryToggle && reentryContentBox) {
    reentryToggle.addEventListener("change", function () {
      const checked = reentryToggle.checked;
      reentryContentBox.hidden = !checked;
      reentryToggle.setAttribute("aria-checked", checked ? "true" : "false");
    });
    reentryContentBox.hidden = true;
  }

  // Fast Track button: toggle content box (same behavior as transcript buttons)
  const fastTrackBtn = document.getElementById("fastTrackBtn");
  const fastTrackContentBox = document.getElementById("fastTrackContentBox");
  if (fastTrackBtn && fastTrackContentBox) {
    fastTrackBtn.addEventListener("click", function () {
      const isOpen = !fastTrackContentBox.hidden;
      fastTrackContentBox.hidden = isOpen;
      fastTrackBtn.setAttribute("aria-expanded", isOpen ? "false" : "true");
    });
  }

  // Doctoral Students toggle: show/hide content box
  const doctoralToggle = document.getElementById("doctoralToggle");
  const doctoralContentBox = document.getElementById("doctoralContentBox");
  if (doctoralToggle && doctoralContentBox) {
    doctoralToggle.addEventListener("change", function () {
      const checked = doctoralToggle.checked;
      doctoralContentBox.hidden = !checked;
      doctoralToggle.setAttribute("aria-checked", checked ? "true" : "false");
    });
    doctoralContentBox.hidden = true;
  }

  // Transcript buttons: only one can be open at a time; click again to turn off
  const pogBtn = document.getElementById("pogBtn");
  const pogContentBox = document.getElementById("pogContentBox");
  const priorCollegeBtn = document.getElementById("priorCollegeBtn");
  const priorCollegeContentBox = document.getElementById("priorCollegeContentBox");

  function closePog() {
    if (pogContentBox) pogContentBox.hidden = true;
    if (pogBtn) pogBtn.setAttribute("aria-expanded", "false");
  }
  function closePriorCollege() {
    if (priorCollegeContentBox) priorCollegeContentBox.hidden = true;
    if (priorCollegeBtn) priorCollegeBtn.setAttribute("aria-expanded", "false");
  }

  if (pogBtn && pogContentBox) {
    pogBtn.addEventListener("click", function () {
      if (!pogContentBox.hidden) {
        closePog();
      } else {
        closePriorCollege();
        pogContentBox.hidden = false;
        pogBtn.setAttribute("aria-expanded", "true");
      }
    });
  }
  if (priorCollegeBtn && priorCollegeContentBox) {
    priorCollegeBtn.addEventListener("click", function () {
      if (!priorCollegeContentBox.hidden) {
        closePriorCollege();
      } else {
        closePog();
        priorCollegeContentBox.hidden = false;
        priorCollegeBtn.setAttribute("aria-expanded", "true");
      }
    });
  }

  // POG content: "If no" and "If yes" toggles are mutually exclusive; each shows its own text when selected
  const pogToggleNo = document.getElementById("pogToggleNo");
  const pogToggleYes = document.getElementById("pogToggleYes");
  const pogIfNoBox = document.getElementById("pogIfNoBox");
  const pogIfYesBox = document.getElementById("pogIfYesBox");
  if (pogToggleNo && pogToggleYes) {
    pogToggleNo.addEventListener("change", function () {
      if (pogToggleNo.checked) {
        pogToggleYes.checked = false;
        pogToggleYes.setAttribute("aria-checked", "false");
        if (pogIfNoBox) pogIfNoBox.hidden = false;
        if (pogIfYesBox) pogIfYesBox.hidden = true;
      } else {
        if (pogIfNoBox) pogIfNoBox.hidden = true;
      }
      pogToggleNo.setAttribute("aria-checked", pogToggleNo.checked ? "true" : "false");
    });
    pogToggleYes.addEventListener("change", function () {
      if (pogToggleYes.checked) {
        pogToggleNo.checked = false;
        pogToggleNo.setAttribute("aria-checked", "false");
        if (pogIfYesBox) pogIfYesBox.hidden = false;
        if (pogIfNoBox) pogIfNoBox.hidden = true;
      } else {
        if (pogIfYesBox) pogIfYesBox.hidden = true;
      }
      pogToggleYes.setAttribute("aria-checked", pogToggleYes.checked ? "true" : "false");
    });
  }

  // Prior College content: "If yes" and "If no" toggles are mutually exclusive; each shows its own text when selected
  const priorCollegeToggleYes = document.getElementById("priorCollegeToggleYes");
  const priorCollegeToggleNo = document.getElementById("priorCollegeToggleNo");
  const priorCollegeIfYesBox = document.getElementById("priorCollegeIfYesBox");
  const priorCollegeIfNoBox = document.getElementById("priorCollegeIfNoBox");
  if (priorCollegeToggleYes && priorCollegeToggleNo) {
    priorCollegeToggleYes.addEventListener("change", function () {
      if (priorCollegeToggleYes.checked) {
        priorCollegeToggleNo.checked = false;
        priorCollegeToggleNo.setAttribute("aria-checked", "false");
        if (priorCollegeIfYesBox) priorCollegeIfYesBox.hidden = false;
        if (priorCollegeIfNoBox) priorCollegeIfNoBox.hidden = true;
      } else {
        if (priorCollegeIfYesBox) priorCollegeIfYesBox.hidden = true;
      }
      priorCollegeToggleYes.setAttribute("aria-checked", priorCollegeToggleYes.checked ? "true" : "false");
    });
    priorCollegeToggleNo.addEventListener("change", function () {
      if (priorCollegeToggleNo.checked) {
        priorCollegeToggleYes.checked = false;
        priorCollegeToggleYes.setAttribute("aria-checked", "false");
        if (priorCollegeIfNoBox) priorCollegeIfNoBox.hidden = false;
        if (priorCollegeIfYesBox) priorCollegeIfYesBox.hidden = true;
      } else {
        if (priorCollegeIfNoBox) priorCollegeIfNoBox.hidden = true;
      }
      priorCollegeToggleNo.setAttribute("aria-checked", priorCollegeToggleNo.checked ? "true" : "false");
    });
  }
})();
