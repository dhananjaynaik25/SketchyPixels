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

// Observe elements with class 'section__text' or any other target class for scroll animations
const animatedElements = document.querySelectorAll('.intro-line-1, .intro-line-2, .team-card, .pricing-card, .subscription-box');
animatedElements.forEach((el) => observer.observe(el));


// Popup Form Functionality
const popupFormContainer = document.getElementById('popup-form-container');
const strategyCallForm = document.getElementById('strategy-call-form');

function openPopupForm() {
  if (popupFormContainer) {
    popupFormContainer.style.display = 'flex';
  }
}

function closePopupForm() {
  if (popupFormContainer) {
    popupFormContainer.style.display = 'none';
  }
}

if (strategyCallForm) {
  strategyCallForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Construct mailto link
    const subject = `New Strategy Call Request from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nScheduled via website form.`;
    const mailtoLink = `mailto:katariyajahanvi2@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open mail client
    window.location.href = mailtoLink;

    // Optionally, display a success message or clear the form
    alert('Thank you! Your request has been prepared. Please send the email through your mail client.');
    strategyCallForm.reset();
    closePopupForm();
  });
}

// Close popup if clicked outside the form
if (popupFormContainer) {
  popupFormContainer.addEventListener('click', function(event) {
    if (event.target === popupFormContainer) {
      closePopupForm();
    }
  });
}


// Industries Section Logic
function showIndustry(industryName) {
  // Hide all industry content
  document.querySelectorAll('.industry-content').forEach(content => {
    content.classList.remove('active');
  });

  // Deactivate all tab buttons
  document.querySelectorAll('.industry-tab-button').forEach(button => {
    button.classList.remove('active');
  });

  // Show the selected industry content
  const selectedContent = document.getElementById(industryName);
  if (selectedContent) {
    selectedContent.classList.add('active');
  }

  // Activate the selected tab button
  const selectedButton = document.querySelector(`.industry-tab-button[onclick="showIndustry('${industryName}')"]`);
  if (selectedButton) {
    selectedButton.classList.add('active');
  }
}

// Initialize the first tab
document.addEventListener('DOMContentLoaded', () => {
    showIndustry('fitness');
});
// Image Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('image-modal');
    if (!modal) return;

    const modalImage = document.getElementById('modal-image');
    const modalVideo = document.getElementById('modal-video');
    const closeModal = document.querySelector('.close-modal');
    const mediaCards = document.querySelectorAll('.media-card');

    mediaCards.forEach(card => {
        card.addEventListener('click', () => {
            const mediaItem = card.querySelector('.media-item');
            if (mediaItem) {
                if (mediaItem.tagName === 'IMG') {
                    modalImage.src = mediaItem.src;
                    modalImage.style.display = 'block';
                    modalVideo.style.display = 'none';
                } else if (mediaItem.tagName === 'VIDEO') {
                    modalVideo.src = mediaItem.src;
                    modalVideo.style.display = 'block';
                    modalImage.style.display = 'none';
                    modalVideo.play();
                }
                modal.classList.add('show');
            }
        });
    });

    const closeTheModal = () => {
        modal.classList.remove('show');
        modalVideo.pause();
        modalImage.src = "";
        modalVideo.src = "";
    };

    if (closeModal) {
        closeModal.addEventListener('click', closeTheModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeTheModal();
        }
    });
});