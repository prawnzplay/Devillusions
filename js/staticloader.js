document.addEventListener("DOMContentLoaded", function () {
    const dissolveOverlay = document.getElementById("dissolve-overlay");
  
    function dissolveLoaderHandler(e) {
      e.preventDefault();
      const href = this.getAttribute("href");
  
      // Trigger the dissolve effect by adding the class
      dissolveOverlay.classList.add("dissolve-active");
  
      // Wait for the animation to finish before navigating
      setTimeout(() => {
        window.location.href = href;
      }, 800); // Match the duration of the CSS animation
    }
  
    // Apply this handler to all internal links
    document.querySelectorAll("a").forEach(link => {
      if (link.hostname === window.location.hostname) {
        link.addEventListener("click", dissolveLoaderHandler);
      }
    });
  });
  
