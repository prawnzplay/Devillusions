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

  // ✅ WebM fallback for small screens or unsupported browsers
  const video = document.getElementById("spinningLogo");
  const fallback = document.getElementById("spinningLogoFallback");

  if (video && fallback) {
    const canPlayWebM = video.canPlayType('video/webm; codecs="vp8, vorbis"');

    if (window.innerWidth < 1025 || !canPlayWebM) {
      console.log("📱 Using fallback PNG on small screens or no WebM support.");
      video.style.display = "none";
      fallback.style.display = "block";
    }
  } else {
    console.warn("⚠️ Could not find spinning logo or fallback element.");
  }
});
