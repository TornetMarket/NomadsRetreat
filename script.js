document.addEventListener("DOMContentLoaded", () => {
  // --- Login Functionality (for index.html) ---
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      // Check for valid credentials
      if (
        (email === "nomad@gmail.com" && password === "Guest!") ||
        (email === "admin@nomad.com" && password === "Admin@!")
      ) {
        window.location.href = "welcome.html";
      } else {
        alert("Invalid credentials. Please try again.");
      }
    });
  }

  // --- Filter Button Functionality (for welcome.html) ---
  const filterBtn = document.getElementById("filter-btn");
  if (filterBtn) {
    filterBtn.addEventListener("click", () => {
      const startLocation = document.getElementById("start-location").value;
      const distance = document.getElementById("distance").value;
      const temperature = document.getElementById("temperature").value;
      const resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML =
        "<p>Searching destinations from: <strong>" +
        startLocation +
        "</strong></p>" +
        "<p><strong>Distance:</strong> " +
        distance +
        "</p>" +
        "<p><strong>Temperature Range:</strong> " +
        temperature +
        " °F</p>" +
        "<p>(Destination results would be displayed here...)</p>";
    });
  }

  // --- Welcome Panel Fade-in (for welcome.html) ---
  const welcomePanel = document.querySelector(".welcome-panel");
  if (welcomePanel) {
    setTimeout(() => {
      welcomePanel.style.display = "block";
      setTimeout(() => {
        welcomePanel.style.opacity = "1";
      }, 50);
    }, 4000); // 4-second delay
  }

  // --- Content Panels Fade-in (for welcome.html) ---
  const contentPanels = document.querySelectorAll(".content-panel");
  contentPanels.forEach((panel, index) => {
    setTimeout(() => {
      panel.style.display = "block";
      setTimeout(() => {
        panel.style.opacity = "1";
      }, 50);
    }, 2400 + index * 350);
  });

  // --- External Links Functionality ---
  const rentalsLink = document.getElementById("rentalsLink");
  if (rentalsLink) {
    rentalsLink.addEventListener("click", (e) => {
      e.preventDefault();
      const queries = ["Transportation Rentals", "Bike Rentals"];
      const randomQuery =
        queries[Math.floor(Math.random() * queries.length)];
      const mapsUrl =
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(randomQuery);
      window.open(mapsUrl, "_blank");
    });
  }

  const lodgingLink = document.getElementById("lodgingLink");
  if (lodgingLink) {
    lodgingLink.addEventListener("click", (e) => {
      e.preventDefault();
      const queries = ["Hotels", "Motels", "Hostels", "Lodging"];
      const randomQuery =
        queries[Math.floor(Math.random() * queries.length)];
      const mapsUrl =
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(randomQuery);
      window.open(mapsUrl, "_blank");
    });
  }

  const poiLink = document.getElementById("poiLink");
  if (poiLink) {
    poiLink.addEventListener("click", (e) => {
      e.preventDefault();
      const queries = [
        "Tourist Attractions",
        "Scenic Views",
        "Landmarks",
        "Must-See Places",
      ];
      const randomQuery =
        queries[Math.floor(Math.random() * queries.length)];
      const mapsUrl =
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(randomQuery);
      window.open(mapsUrl, "_blank");
    });
  }

  // --- Contact Modal Functionality ---
  const contactLink = document.getElementById("contactLink");
  const contactModal = document.getElementById("contactModal");
  const closeModal = document.querySelector(".close");
  const contactForm = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  if (contactLink && contactModal && closeModal && contactForm) {
    // Open modal when "Contact" link is clicked
    contactLink.addEventListener("click", (event) => {
      event.preventDefault();
      contactModal.style.display = "flex";
    });

    // Close modal when the close (X) button is clicked
    closeModal.addEventListener("click", () => {
      contactModal.style.display = "none";
    });

    // Close modal when clicking outside the modal content
    window.addEventListener("click", (event) => {
      if (event.target === contactModal) {
        contactModal.style.display = "none";
      }
    });

    // Handle form submission
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const fullName = document.getElementById("fullname").value;
      const emailAddress = document.getElementById("emailAddress").value;
      const message = document.getElementById("message").value;

      if (!fullName || !emailAddress || !message) {
        alert("Please fill out all fields.");
        return;
      }

      // Create embed payload for Discord webhook
      const webhookURL =
        "https://discord.com/api/webhooks/1333328901052829738/sjJIFh_aBMGNb44emkOSk5UMe6dapiymGJM0C3z7XonojF36uJ4NZLdcUuvGOHzLtbDC";
      const currentDate = new Date();
      const timestamp = currentDate.toLocaleString("en-US", { hour12: true });

      const payload = {
        username: "Nomads Retreat Contact",
        embeds: [
          {
            title: "New Contact Form Submission",
            description:
              "A new message was received via the Nomads Retreat contact form.",
            color: 16757248, // Orange color
            fields: [
              { name: "Full Name", value: fullName, inline: false },
              { name: "Email Address", value: emailAddress, inline: false },
              { name: "Message", value: message, inline: false },
              { name: "Date & Time", value: timestamp, inline: false },
            ],
          },
        ],
      };

      // Send data to Discord webhook
      fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (response.ok) {
            contactForm.reset();
            successMessage.textContent =
              "Your message has been sent successfully! We'll get back to you shortly.";
            successMessage.style.display = "block";
            setTimeout(() => {
              contactModal.style.display = "none";
              successMessage.style.display = "none";
            }, 3000);
          } else {
            alert("Failed to send message. Please try again later.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred. Please try again.");
        });
    });
  }
});
