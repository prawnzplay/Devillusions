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

 // Detect iOS devices (iPhone, iPad, iPod)
 const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
 (navigator.userAgent.includes("Macintosh") && "ontouchend" in document);

const video = document.getElementById("spinningLogo");
const fallback = document.getElementById("spinningLogoFallback");

if (video && fallback) {
  const canPlayWebM = video.canPlayType('video/webm; codecs="vp8, vorbis"');

  if (isIOS || window.innerWidth < 1025 || !canPlayWebM) {
    console.log("📱 iOS or small screen or no WebM support — using fallback PNG.");
    video.style.display = "none";
    fallback.style.display = "block";
  } else {
    console.log("✅ WebM with transparency is supported — using video.");
  }
}

});
