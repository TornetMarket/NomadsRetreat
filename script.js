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
    const startLocation = document.getElementById("start-location").value.trim();
    const distanceInput = document.getElementById("distance").value.trim();
    const temperatureInput = document.getElementById("temperature").value.trim();
    const resultsDiv = document.getElementById("results");

    // --- Validate Inputs ---
    if (!startLocation || !distanceInput) {
      resultsDiv.innerHTML = "<p>Please enter a valid start location and distance.</p>";
      return;
    }

// Expanded sample destination data
const destinations = [
  // California & Nearby (short distance)
  { name: "San Francisco, CA", distanceMiles: 50, averageTemp: 65 },
  { name: "Sacramento, CA", distanceMiles: 100, averageTemp: 68 },
  { name: "Los Angeles, CA", distanceMiles: 340, averageTemp: 75 },
  { name: "San Diego, CA", distanceMiles: 400, averageTemp: 70 },
  { name: "Lake Tahoe, CA/NV", distanceMiles: 215, averageTemp: 45 },
  { name: "Reno, NV", distanceMiles: 290, averageTemp: 50 },
  { name: "Yosemite National Park, CA", distanceMiles: 220, averageTemp: 50 },
  { name: "Santa Barbara, CA", distanceMiles: 330, averageTemp: 65 },

  // Popular Hiking Destinations
  { name: "Zion National Park, UT", distanceMiles: 620, averageTemp: 60 },
  { name: "Grand Canyon, AZ", distanceMiles: 650, averageTemp: 50 },
  { name: "Banff National Park, Canada", distanceMiles: 1300, averageTemp: 45 },
  { name: "Torres del Paine, Chile", distanceMiles: 6700, averageTemp: 40 },
  { name: "Patagonia, Argentina", distanceMiles: 7000, averageTemp: 50 },
  { name: "Mount Kilimanjaro, Tanzania", distanceMiles: 8800, averageTemp: 45 },

  // Beach & Ocean Activities
  { name: "Maui, HI", distanceMiles: 2400, averageTemp: 80 },
  { name: "Phuket, Thailand", distanceMiles: 8500, averageTemp: 85 },
  { name: "Bora Bora, French Polynesia", distanceMiles: 4800, averageTemp: 80 },
  { name: "Maldives, South Asia", distanceMiles: 9300, averageTemp: 85 },
  { name: "Gold Coast, Australia", distanceMiles: 8500, averageTemp: 75 },
  { name: "Seychelles, Africa", distanceMiles: 9200, averageTemp: 85 },

  // Resort Destinations
  { name: "Malibu, CA", distanceMiles: 350, averageTemp: 70 },
  { name: "Palm Springs, CA", distanceMiles: 430, averageTemp: 80 },
  { name: "Whistler, Canada", distanceMiles: 900, averageTemp: 25 },
  { name: "Cabo San Lucas, Mexico", distanceMiles: 1000, averageTemp: 80 },
  { name: "Montego Bay, Jamaica", distanceMiles: 3200, averageTemp: 85 },
  { name: "Gstaad, Switzerland", distanceMiles: 6000, averageTemp: 45 },

  // Scenic Destinations
  { name: "Santorini, Greece", distanceMiles: 6500, averageTemp: 75 },
  { name: "Amalfi Coast, Italy", distanceMiles: 5600, averageTemp: 70 },
  { name: "Cinque Terre, Italy", distanceMiles: 5600, averageTemp: 70 },
  { name: "Big Sur, CA", distanceMiles: 350, averageTemp: 60 },
  { name: "Iceland's Golden Circle", distanceMiles: 5000, averageTemp: 35 },
  { name: "Plitvice Lakes, Croatia", distanceMiles: 6000, averageTemp: 60 },
  { name: "Geirangerfjord, Norway", distanceMiles: 5400, averageTemp: 40 },
  { name: "Milford Sound, New Zealand", distanceMiles: 7800, averageTemp: 55 },
  
  // Popular Tourist & Major Cities
  { name: "Las Vegas, NV", distanceMiles: 300, averageTemp: 85 },
  { name: "Phoenix, AZ", distanceMiles: 750, averageTemp: 90 },
  { name: "Denver, CO", distanceMiles: 850, averageTemp: 55 },
  { name: "Salt Lake City, UT", distanceMiles: 700, averageTemp: 50 },
  { name: "Seattle, WA", distanceMiles: 750, averageTemp: 55 },
  { name: "Portland, OR", distanceMiles: 635, averageTemp: 60 },
  { name: "Chicago, IL", distanceMiles: 2000, averageTemp: 50 },
  { name: "Boston, MA", distanceMiles: 2600, averageTemp: 45 },
  { name: "New York City, NY", distanceMiles: 2600, averageTemp: 55 },
  { name: "Washington, DC", distanceMiles: 2500, averageTemp: 60 },
  { name: "Nashville, TN", distanceMiles: 1700, averageTemp: 70 },
  { name: "Miami, FL", distanceMiles: 3000, averageTemp: 80 },
  { name: "Orlando, FL", distanceMiles: 2900, averageTemp: 75 },
  { name: "Honolulu, HI", distanceMiles: 2400, averageTemp: 80 },
  { name: "Austin, TX", distanceMiles: 1600, averageTemp: 70 },
  { name: "New Orleans, LA", distanceMiles: 1900, averageTemp: 75 },

  // US Winter/Cold Destinations
  { name: "Anchorage, AK", distanceMiles: 2500, averageTemp: 30 },
  { name: "Vermont, USA", distanceMiles: 2800, averageTemp: 25 },
  { name: "Lake Placid, NY", distanceMiles: 2700, averageTemp: 28 },
  { name: "Jackson Hole, WY", distanceMiles: 900, averageTemp: 20 },

  // International Destinations
  { name: "London, UK", distanceMiles: 5800, averageTemp: 55 },
  { name: "Paris, France", distanceMiles: 5700, averageTemp: 60 },
  { name: "Amsterdam, Netherlands", distanceMiles: 5700, averageTemp: 55 },
  { name: "Tokyo, Japan", distanceMiles: 5000, averageTemp: 65 },
  { name: "Sydney, Australia", distanceMiles: 8000, averageTemp: 75 },
  { name: "Rio de Janeiro, Brazil", distanceMiles: 6000, averageTemp: 80 },
  { name: "Dubai, UAE", distanceMiles: 8000, averageTemp: 95 },
  { name: "Cape Town, South Africa", distanceMiles: 11000, averageTemp: 70 },
  { name: "Moscow, Russia", distanceMiles: 6500, averageTemp: 30 },
  { name: "Reykjavik, Iceland", distanceMiles: 5000, averageTemp: 35 },
  { name: "Zurich, Switzerland", distanceMiles: 6000, averageTemp: 45 },
  { name: "Munich, Germany", distanceMiles: 5800, averageTemp: 50 },
  { name: "Rome, Italy", distanceMiles: 5600, averageTemp: 65 },
  { name: "Barcelona, Spain", distanceMiles: 5600, averageTemp: 70 },
  { name: "Mexico City, Mexico", distanceMiles: 1700, averageTemp: 70 },
  { name: "Cancun, Mexico", distanceMiles: 2300, averageTemp: 80 },
  { name: "San Juan, Puerto Rico", distanceMiles: 2500, averageTemp: 85 },
  { name: "Kyoto, Japan", distanceMiles: 5100, averageTemp: 60 },
  { name: "Bangkok, Thailand", distanceMiles: 8500, averageTemp: 90 },
  { name: "Bali, Indonesia", distanceMiles: 9000, averageTemp: 85 },
  { name: "Istanbul, Turkey", distanceMiles: 6000, averageTemp: 60 },
  { name: "Prague, Czech Republic", distanceMiles: 5900, averageTemp: 50 },
  { name: "Havana, Cuba", distanceMiles: 2300, averageTemp: 80 },
  { name: "Toronto, Canada", distanceMiles: 2400, averageTemp: 45 },
  { name: "Buenos Aires, Argentina", distanceMiles: 6200, averageTemp: 65 },
  { name: "Dublin, Ireland", distanceMiles: 5400, averageTemp: 50 },
  { name: "Victoria Falls, Zimbabwe", distanceMiles: 8400, averageTemp: 75 },
  { name: "Queenstown, New Zealand", distanceMiles: 7800, averageTemp: 55 },
  { name: "Galapagos Islands, Ecuador", distanceMiles: 3500, averageTemp: 75 },
];

    // --- Distance Input Processing ---
    let maxDistance = Infinity;
    const distanceRegex = /([\d.]+)/;
    const distanceMatch = distanceInput.match(distanceRegex);
    if (distanceMatch) {
      const value = parseFloat(distanceMatch[1]);

      if (distanceInput.toLowerCase().includes("hour")) {
        // Convert hours to miles based on estimated speeds
        if (value <= 2) {
          maxDistance = value * 30; // Slow travel (Mountain roads, scenic areas)
        } else if (value <= 4) {
          maxDistance = value * 45; // Moderate travel (City + Rural mix)
        } else {
          maxDistance = value * 65; // Fast travel (Highways)
        }
      } else {
        maxDistance = value; // Assume input is already in miles
      }
    }

    // --- Temperature Input Processing ---
    let tempMin = -Infinity,
      tempMax = Infinity;
    if (temperatureInput.includes("-")) {
      const parts = temperatureInput.split("-");
      tempMin = parseFloat(parts[0].trim());
      tempMax = parseFloat(parts[1].trim());
    } else if (temperatureInput.trim() !== "") {
      const tempValue = parseFloat(temperatureInput.trim());
      tempMin = tempValue - 5;
      tempMax = tempValue + 5;
    }

    // --- Filtering Locations Based on Criteria ---
    const filtered = destinations.filter((dest) => {
      return (
        dest.distanceMiles <= maxDistance &&
        dest.averageTemp >= tempMin &&
        dest.averageTemp <= tempMax
      );
    });

    // --- Display Results ---
    resultsDiv.innerHTML =
      "<p>Searching destinations from: <strong>" +
      startLocation +
      "</strong></p>" +
      "<p><strong>Travel Range:</strong> " +
      distanceInput +
      "</p>" +
      "<p><strong>Preferred Temperature:</strong> " +
      (temperatureInput ? temperatureInput + " °F" : "Any") +
      "</p>";
    if (filtered.length === 0) {
      resultsDiv.innerHTML +=
        "<p>No destinations found matching your criteria.</p>";
    } else {
      resultsDiv.innerHTML +=
        "<p>Found " + filtered.length + " destinations:</p>";
      const list = document.createElement("ul");
      filtered.forEach((dest) => {
        const li = document.createElement("li");
        li.textContent =
          dest.name +
          " - " +
          dest.distanceMiles +
          " miles, Avg Temp: " +
          dest.averageTemp +
          "°F";
        list.appendChild(li);
      });
      resultsDiv.appendChild(list);
    }
  });
}


  // --- Smooth Scroll Function ---
  function smoothScrollTo(target, duration = 3000) {
    const start = window.pageYOffset;
    const targetPosition = target.getBoundingClientRect().top;
    const startTime = performance.now();

    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function scroll(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start + targetPosition * easeInOutQuad(progress));
      if (elapsed < duration) {
        requestAnimationFrame(scroll);
      }
    }
    requestAnimationFrame(scroll);
  }

  // --- Welcome Panel Fade-in (for welcome.html) ---
  const welcomePanel = document.querySelector(".welcome-panel");
  if (welcomePanel) {
    setTimeout(() => {
      welcomePanel.style.display = "block";
      // Use scrollIntoView with smooth behavior
      console.log("Scrolling to welcome panel");
      welcomePanel.scrollIntoView({ behavior: "smooth", block: "start" });
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
      console.log("Scrolling to content panel", index);
      panel.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        panel.style.opacity = "1";
      }, 50);
    }, 2400 + index * 450);
  });

  // --- External Links Functionality ---
  const rentalsLink = document.getElementById("rentalsLink");
  if (rentalsLink) {
    rentalsLink.addEventListener("click", (e) => {
      e.preventDefault();
      const queries = ["Transportation Rentals", "Bike Rentals"];
      const randomQuery = queries[Math.floor(Math.random() * queries.length)];
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
      const randomQuery = queries[Math.floor(Math.random() * queries.length)];
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
      const randomQuery = queries[Math.floor(Math.random() * queries.length)];
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
