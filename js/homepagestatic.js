document.addEventListener("DOMContentLoaded", function () {
  console.log("homepageStatic.js loaded");

  const tvStatic = document.getElementById("tv-static");
  if (!tvStatic) {
    console.error("No element with id 'tv-static' found!");
    return;
  }

  // Show static effect on load
  console.log("Showing static effect on load");
  tvStatic.classList.add("static-active");

  setTimeout(() => {
    console.log("Hiding static effect after load");
    tvStatic.classList.remove("static-active");
  }, 2000);

  // Click-to-exit animation
  document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");
      console.log("Link clicked. Navigating to:", href);

      tvStatic.classList.add("static-active");

      setTimeout(() => {
        console.log("Navigating now");
        window.location.href = href;
      }, 400);
    });
  });

  // iOS fallback logic:
  // More robust detection for iOS (including iPads reporting as MacIntel)
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.platform) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  console.log("isIOS:", isIOS, navigator.platform, navigator.maxTouchPoints);

  const video = document.getElementById("spinningLogo");
  const fallback = document.getElementById("spinningLogoFallback");

  if (video && fallback) {
    if (isIOS) {
      console.log("🍎 iOS device detected — forcing fallback PNG.");
      video.style.display = "none";
      fallback.style.display = "block";
    } else {
      console.log("✅ Non-iOS — using WebM video.");
      video.style.display = "block";
      fallback.style.display = "none";
    }
  } else {
    console.warn("🚫 Missing spinningLogo or fallback element.");
  }
});

