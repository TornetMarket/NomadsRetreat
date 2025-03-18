document.addEventListener("DOMContentLoaded", function () {
    // --- Login Functionality (for index.html) ---
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        
        // Check for valid credentials
        if ((email === "nomad@gmail.com" && password === "Guest!") || 
            (email === "admin@nomad.com" && password === "Admin@!")) {
          window.location.href = "welcome.html";
        } else {
          alert("Invalid credentials. Please try again.");
        }
      });
    }

    // --- Filter Button Functionality (for welcome.html) ---
    const filterBtn = document.getElementById("filter-btn");
    if (filterBtn) {
      filterBtn.addEventListener("click", function () {
        const startLocation = document.getElementById("start-location").value;
        const distance = document.getElementById("distance").value;
        const temperature = document.getElementById("temperature").value;
        const resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML =
          "<p>Searching destinations from: <strong>" + startLocation + "</strong></p>" +
          "<p><strong>Distance:</strong> " + distance + "</p>" +
          "<p><strong>Temperature Range:</strong> " + temperature + " °F</p>" +
          "<p>(Destination results would be displayed here...)</p>";
      });
    }
});

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    const welcomePanel = document.querySelector(".welcome-panel");
    if (welcomePanel) {
      welcomePanel.style.display = "block"; // Show the panel
      setTimeout(() => {
        welcomePanel.style.opacity = "2"; // Fade in smoothly
      }, 50); // Slight delay to ensure display is applied
    }
  }, 4000); // 4-second delay before showing the panel
});

document.addEventListener("DOMContentLoaded", function () {
  const contentPanels = document.querySelectorAll(".content-panel");
  contentPanels.forEach((panel, index) => {
    setTimeout(() => {
      panel.style.display = "block"; // Show the panel
      setTimeout(() => {
        panel.style.opacity = "1"; // Fade in smoothly
      }, 50);
    }, 2400 + index * 350); // Each panel appears 350ms after the previous one, starting at 2400ms
  });
});

document.getElementById("rentalsLink").addEventListener("click", function(e) {
  e.preventDefault();
  var queries = ["Transportation Rentals", "Bike Rentals"];
  var randomQuery = queries[Math.floor(Math.random() * queries.length)];
  var mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(randomQuery);
  window.open(mapsUrl, "_blank");
});

document.getElementById("lodgingLink").addEventListener("click", function(e) {
  e.preventDefault();
  var queries = ["Hotels", "Motels", "Hostels", "Lodging"];
  var randomQuery = queries[Math.floor(Math.random() * queries.length)];
  var mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(randomQuery);
  window.open(mapsUrl, "_blank");
});

document.getElementById("poiLink").addEventListener("click", function(e) {
  e.preventDefault();
  var queries = ["Tourist Attractions", "Scenic Views", "Landmarks", "Must-See Places"];
  var randomQuery = queries[Math.floor(Math.random() * queries.length)];
  var mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(randomQuery);
  window.open(mapsUrl, "_blank");
});
