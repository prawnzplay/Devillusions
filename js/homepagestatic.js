document.addEventListener("DOMContentLoaded", function() {
  console.log("homepageStatic.js loaded");
  const tvStatic = document.getElementById("tv-static");
  if (!tvStatic) {
    console.error("No element with id 'tv-static' found!");
    return;
  }

  // When the homepage loads, show the static effect
  console.log("Showing static effect on load");
  tvStatic.classList.add("static-active");

  // After a delay, remove the effect to reveal the page content
  setTimeout(() => {
    console.log("Hiding static effect after load");
    tvStatic.classList.remove("static-active");
  }, 2000); // Adjust duration (in ms) to taste

  // Add click listeners to all internal links for exit effect
  document.querySelectorAll("a").forEach(link => {
    // Remove the hostname check if you're testing on file:// or localhost inconsistently:
    // if (link.hostname !== window.location.hostname) return;
    link.addEventListener("click", function(e) {
      e.preventDefault(); // Prevent immediate navigation
      const href = this.getAttribute("href");
      console.log("Link clicked. Navigating to:", href);

      // Show the static effect before leaving the page
      tvStatic.classList.add("static-active");

      // After a short delay, navigate to the new page
      setTimeout(() => {
        console.log("Navigating now");
        window.location.href = href;
      }, 400); // Adjust to match your CSS animation duration
    });
  });
});
