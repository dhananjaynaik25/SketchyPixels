// Function to enter the site from the splash screen
function enterSite() {
  const splash = document.getElementById("splash-screen");
  const mainContent = document.getElementById("main-content");

  if (splash) {
    splash.style.opacity = '0';
    setTimeout(() => {
      splash.style.display = 'none';
      if (mainContent) {
        mainContent.style.display = 'flex'; // Changed to flex
        mainContent.style.flexDirection = 'column'; // Added for flex layout
        mainContent.style.visibility = 'visible'; // Explicitly set visibility
        mainContent.style.opacity = '1'; // Explicitly set opacity
      }
      document.body.style.overflow = 'auto'; // Restore scrolling
    }, 600); // Match this duration with CSS transition
  }
}

// Automatically hide splash screen after a delay
setTimeout(() => {
  // Check if the splash screen is still visible (i.e., user hasn't clicked to enter)
  const splash = document.getElementById("splash-screen");
  if (splash && splash.style.display !== 'none') {
    enterSite(); // Use the same logic as clicking
  }
}, 3000); // Adjust time as needed, e.g., 3000ms for 3 seconds

// Hamburger navbar toggle
function togglemenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  if (menu && icon) {
    menu.classList.toggle("open");
    icon.classList.toggle("open");

    // If the menu is open, add a click event listener to the document
    if (menu.classList.contains("open")) {
      document.addEventListener("click", closeMenuOnClickOutside);
    } else {
      document.removeEventListener("click", closeMenuOnClickOutside);
    }
  }
}

// Function to close hamburger menu when clicking outside
function closeMenuOnClickOutside(event) {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  // Check if the click is outside the menu and the hamburger icon
  if (menu && icon && !menu.contains(event.target) && !icon.contains(event.target)) {
    menu.classList.remove("open");
    icon.classList.remove("open");
    
    // Remove the event listener after closing the menu
    document.removeEventListener("click", closeMenuOnClickOutside);
  }
}

// Scroll to top upon reload
window.onload = function() {
  window.scrollTo(0, 0);
  // Ensure main content is hidden and splash is visible on load, CSS should primarily handle this.
  // However, a JS check can be a fallback.
  const splash = document.getElementById("splash-screen");
  const mainContent = document.getElementById("main-content");
  if(splash) splash.style.display = 'flex'; // or 'block' depending on its CSS
  if(mainContent) mainContent.style.display = 'none';
};

// Intersection Observer for fade-in/blur animations on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } 
    // Optional: remove class if not intersecting to re-trigger animation
    // else {
    //   entry.target.classList.remove('show');
    // }
  });
});

// Observe elements with class 'section__text' or any other target class
const hiddenElements = document.querySelectorAll('.section__text'); // Or any other elements you want to animate
hiddenElements.forEach((el) => observer.observe(el));

// Note: The original JS had some 'logoSpan' and 'intro' related code.
// This seemed to be for a different type of intro animation not present in the HTML.
// If that was intended, the HTML structure needs to support it.
// For now, it's removed to avoid errors and keep the script clean.