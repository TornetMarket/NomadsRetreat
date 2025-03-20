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
        (email === "nomad@gmail.com" && password === "Dev@!") ||
        (email === "admin@nomad.com" && password === "Admin@!") ||
        (email === "richie.dev@nomad" && password === "dev") ||
        (email === "rudy042208@yahoo.com" && password === "FrancoAdmin!") ||
        (email === "BetaTest@gmail.com" && password === "test!")
      ) {
        // Store the username in localStorage
        localStorage.setItem('username', email.split('@')[0]);  // Save just the part before @
        window.location.href = "welcome.html";
      } else {
        alert("Invalid credentials. Please try again.");
      }
    });
  }

// Assume you have a function that gets the user's latitude and longitude
async function getUserCoordinates(location) {
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=AIzaSyBuNmH1PIyy6_mq-AgEt1LNc_kl5NFF2Nc`;
  const response = await fetch(geocodeUrl);
  const data = await response.json();
  if (data.status === "OK") {
    return data.results[0].geometry.location;
  } else {
    throw new Error("Geocoding failed: " + data.status);
  }
}

const filterBtn = document.getElementById("filter-btn");
if (filterBtn) {
  filterBtn.addEventListener("click", async () => {
    const startLocation = document.getElementById("start-location").value.trim();
    const distanceInput = document.getElementById("distance").value.trim();
    const temperatureInput = document.getElementById("temperature").value.trim();
    const resultsDiv = document.getElementById("results");

    if (!startLocation || !distanceInput) {
      resultsDiv.innerHTML = "<p>Please enter a valid start location and distance.</p>";
      return;
    }

    // Show loading message
    resultsDiv.innerHTML = "<p>Locating ideal Locations...</p>";

    // Get user coordinates
    let userCoords;
    try {
      userCoords = await getUserCoordinates(startLocation);
    } catch (error) {
      resultsDiv.innerHTML = `<p>Error geocoding location: ${error.message}</p>`;
      return;
    }

    // Process distance input (convert hours to miles if necessary)
    let maxDistance = Infinity;
    const distanceRegex = /([\d.]+)/;
    const distanceMatch = distanceInput.match(distanceRegex);
    if (distanceMatch) {
      const value = parseFloat(distanceMatch[1]);
      if (distanceInput.toLowerCase().includes("hour")) {
        if (value <= 2) maxDistance = value * 50;
        else if (value <= 4) maxDistance = value * 60;
        else maxDistance = value * 70;
      } else {
        maxDistance = value;
      }
    }

    // Process temperature input
    let tempMin = -Infinity, tempMax = Infinity;
    if (temperatureInput.includes("-")) {
      const parts = temperatureInput.split("-");
      tempMin = parseFloat(parts[0].trim());
      tempMax = parseFloat(parts[1].trim());
    } else if (temperatureInput.trim() !== "") {
      const tempValue = parseFloat(temperatureInput.trim());
      tempMin = tempValue - 5;
      tempMax = tempValue + 5;
    }
    
  // Updated and expanded destination data with latitude and longitude
const destinations = [
  // California & Nearby (short distance)
  { name: "San Francisco, CA", latitude: 37.7749, longitude: -122.4194, averageTemp: 65 },
  { name: "Sacramento, CA", latitude: 38.5816, longitude: -121.4944, averageTemp: 68 },
  { name: "Los Angeles, CA", latitude: 34.0522, longitude: -118.2437, averageTemp: 75 },
  { name: "San Diego, CA", latitude: 32.7157, longitude: -117.1611, averageTemp: 70 },
  { name: "Lake Tahoe, CA/NV", latitude: 39.0968, longitude: -120.0324, averageTemp: 45 },
  { name: "Reno, NV", latitude: 39.5296, longitude: -119.8138, averageTemp: 50 },
  { name: "Yosemite National Park, CA", latitude: 37.8651, longitude: -119.5383, averageTemp: 50 },
  { name: "Santa Barbara, CA", latitude: 34.4208, longitude: -119.6982, averageTemp: 65 },

  // Popular Hiking Destinations
  { name: "Zion National Park, UT", latitude: 37.2982, longitude: -113.0263, averageTemp: 60 },
  { name: "Grand Canyon, AZ", latitude: 36.1070, longitude: -112.1130, averageTemp: 50 },
  { name: "Banff National Park, Canada", latitude: 51.1784, longitude: -115.5708, averageTemp: 45 },
  { name: "Torres del Paine, Chile", latitude: -51.2538, longitude: -72.2432, averageTemp: 40 },
  { name: "Patagonia, Argentina", latitude: -38.4161, longitude: -71.8333, averageTemp: 50 },
  { name: "Mount Kilimanjaro, Tanzania", latitude: -3.0674, longitude: 37.3556, averageTemp: 45 },

  // Beach & Ocean Activities
  { name: "Maui, HI", latitude: 20.7984, longitude: -156.3319, averageTemp: 80 },
  { name: "Phuket, Thailand", latitude: 7.8804, longitude: 98.3923, averageTemp: 85 },
  { name: "Bora Bora, French Polynesia", latitude: -16.5004, longitude: -151.7415, averageTemp: 80 },
  { name: "Maldives, South Asia", latitude: 3.2028, longitude: 73.2207, averageTemp: 85 },
  { name: "Gold Coast, Australia", latitude: -28.0167, longitude: 153.4000, averageTemp: 75 },
  { name: "Seychelles, Africa", latitude: -4.6796, longitude: 55.4920, averageTemp: 85 },

  // Resort Destinations
  { name: "Malibu, CA", latitude: 34.0259, longitude: -118.7798, averageTemp: 70 },
  { name: "Palm Springs, CA", latitude: 33.8303, longitude: -116.5453, averageTemp: 80 },
  { name: "Whistler, Canada", latitude: 50.1163, longitude: -122.9574, averageTemp: 25 },
  { name: "Cabo San Lucas, Mexico", latitude: 22.8905, longitude: -109.9167, averageTemp: 80 },
  { name: "Montego Bay, Jamaica", latitude: 18.4762, longitude: -77.8939, averageTemp: 85 },
  { name: "Gstaad, Switzerland", latitude: 46.4712, longitude: 7.2866, averageTemp: 45 },

  // Scenic Destinations
  { name: "Santorini, Greece", latitude: 36.3932, longitude: 25.4615, averageTemp: 75 },
  { name: "Amalfi Coast, Italy", latitude: 40.6333, longitude: 14.6027, averageTemp: 70 },
  { name: "Cinque Terre, Italy", latitude: 44.1272, longitude: 9.7389, averageTemp: 70 },
  { name: "Big Sur, CA", latitude: 36.2704, longitude: -121.8081, averageTemp: 60 },
  { name: "Iceland's Golden Circle", latitude: 64.9631, longitude: -19.0208, averageTemp: 35 },
  { name: "Plitvice Lakes, Croatia", latitude: 44.8801, longitude: 15.6166, averageTemp: 60 },
  { name: "Geirangerfjord, Norway", latitude: 62.1008, longitude: 7.2059, averageTemp: 40 },
  { name: "Milford Sound, New Zealand", latitude: -44.6704, longitude: 167.9279, averageTemp: 55 },

  // Popular Tourist & Major Cities
  { name: "Las Vegas, NV", latitude: 36.1699, longitude: -115.1398, averageTemp: 85 },
  { name: "Phoenix, AZ", latitude: 33.4484, longitude: -112.0740, averageTemp: 90 },
  { name: "Denver, CO", latitude: 39.7392, longitude: -104.9903, averageTemp: 55 },
  { name: "Salt Lake City, UT", latitude: 40.7608, longitude: -111.8910, averageTemp: 50 },
  { name: "Seattle, WA", latitude: 47.6062, longitude: -122.3321, averageTemp: 55 },
  { name: "Portland, OR", latitude: 45.5051, longitude: -122.6750, averageTemp: 60 },
  { name: "Chicago, IL", latitude: 41.8781, longitude: -87.6298, averageTemp: 50 },
  { name: "Boston, MA", latitude: 42.3601, longitude: -71.0589, averageTemp: 45 },
  { name: "New York City, NY", latitude: 40.7128, longitude: -74.0060, averageTemp: 55 },
  { name: "Washington, DC", latitude: 38.9072, longitude: -77.0369, averageTemp: 60 },
  { name: "Nashville, TN", latitude: 36.1627, longitude: -86.7816, averageTemp: 70 },
  { name: "Miami, FL", latitude: 25.7617, longitude: -80.1918, averageTemp: 80 },
  { name: "Orlando, FL", latitude: 28.5383, longitude: -81.3792, averageTemp: 75 },
  { name: "Honolulu, HI", latitude: 21.3069, longitude: -157.8583, averageTemp: 80 },
  { name: "Austin, TX", latitude: 30.2672, longitude: -97.7431, averageTemp: 70 },
  { name: "New Orleans, LA", latitude: 29.9511, longitude: -90.0715, averageTemp: 75 },

  // US Winter/Cold Destinations
  { name: "Anchorage, AK", latitude: 61.2181, longitude: -149.9003, averageTemp: 30 },
  { name: "Vermont, USA", latitude: 44.5588, longitude: -72.5778, averageTemp: 25 },
  { name: "Lake Placid, NY", latitude: 44.2795, longitude: -73.9799, averageTemp: 28 },
  { name: "Jackson Hole, WY", latitude: 43.4799, longitude: -110.7624, averageTemp: 20 },

  // International Destinations
  { name: "London, UK", latitude: 51.5074, longitude: -0.1278, averageTemp: 55 },
  { name: "Paris, France", latitude: 48.8566, longitude: 2.3522, averageTemp: 60 },
  { name: "Amsterdam, Netherlands", latitude: 52.3676, longitude: 4.9041, averageTemp: 55 },
  { name: "Tokyo, Japan", latitude: 35.6895, longitude: 139.6917, averageTemp: 65 },
  { name: "Sydney, Australia", latitude: -33.8688, longitude: 151.2093, averageTemp: 75 },
  { name: "Rio de Janeiro, Brazil", latitude: -22.9068, longitude: -43.1729, averageTemp: 80 },
  { name: "Dubai, UAE", latitude: 25.276987, longitude: 55.296249, averageTemp: 95 },
  { name: "Cape Town, South Africa", latitude: -33.9249, longitude: 18.4241, averageTemp: 70 },
  { name: "Moscow, Russia", latitude: 55.7558, longitude: 37.6173, averageTemp: 30 },
  { name: "Reykjavik, Iceland", latitude: 64.1466, longitude: -21.9426, averageTemp: 35 },
  { name: "Zurich, Switzerland", latitude: 47.3769, longitude: 8.5417, averageTemp: 45 },
  { name: "Munich, Germany", latitude: 48.1351, longitude: 11.5820, averageTemp: 50 },
  { name: "Rome, Italy", latitude: 41.9028, longitude: 12.4964, averageTemp: 65 },
  { name: "Barcelona, Spain", latitude: 41.3851, longitude: 2.1734, averageTemp: 70 },
  { name: "Mexico City, Mexico", latitude: 19.4326, longitude: -99.1332, averageTemp: 70 },
  { name: "Cancun, Mexico", latitude: 21.1619, longitude: -86.8515, averageTemp: 80 },
  { name: "San Juan, Puerto Rico", latitude: 18.4655, longitude: -66.1057, averageTemp: 85 },
  { name: "Kyoto, Japan", latitude: 35.0116, longitude: 135.7681, averageTemp: 60 },
  { name: "Bangkok, Thailand", latitude: 13.7563, longitude: 100.5018, averageTemp: 90 },
  { name: "Bali, Indonesia", latitude: -8.3405, longitude: 115.0920, averageTemp: 85 },
  { name: "Istanbul, Turkey", latitude: 41.0082, longitude: 28.9784, averageTemp: 60 },
  { name: "Prague, Czech Republic", latitude: 50.0755, longitude: 14.4378, averageTemp: 50 },
  { name: "Havana, Cuba", latitude: 23.1136, longitude: -82.3666, averageTemp: 80 },
  { name: "Toronto, Canada", latitude: 43.651070, longitude: -79.347015, averageTemp: 45 },
  { name: "Buenos Aires, Argentina", latitude: -34.6037, longitude: -58.3816, averageTemp: 65 },
  { name: "Dublin, Ireland", latitude: 53.3498, longitude: -6.2603, averageTemp: 50 },
  { name: "Victoria Falls, Zimbabwe", latitude: -17.9243, longitude: 25.8560, averageTemp: 75 },
  { name: "Queenstown, New Zealand", latitude: -45.0312, longitude: 168.6626, averageTemp: 55 },
  { name: "Galapagos Islands, Ecuador", latitude: -0.9538, longitude: -90.9656, averageTemp: 75 },

  // Snowy Destinations
  { name: "Chamonix, France", latitude: 45.9237, longitude: 6.8694, averageTemp: 28 },
  { name: "Aspen, CO, USA", latitude: 39.1911, longitude: -106.8175, averageTemp: 25 },
  { name: "Sapporo, Japan", latitude: 43.0618, longitude: 141.3545, averageTemp: 30 },
  { name: "Rovaniemi, Finland", latitude: 66.5039, longitude: 25.7294, averageTemp: 20 },
  { name: "St. Moritz, Switzerland", latitude: 46.4977, longitude: 9.8374, averageTemp: 32 },

  // Hot Destinations
  { name: "Death Valley, CA, USA", latitude: 36.5323, longitude: -116.9325, averageTemp: 101 },
  { name: "Kuwait City, Kuwait", latitude: 29.3759, longitude: 47.9774, averageTemp: 94 },
  { name: "Doha, Qatar", latitude: 25.2760, longitude: 51.5200, averageTemp: 90 },
  { name: "Riyadh, Saudi Arabia", latitude: 24.7136, longitude: 46.6753, averageTemp: 95 },

  // Cold Destinations
  { name: "Nuuk, Greenland", latitude: 64.1835, longitude: -51.7216, averageTemp: 20 },
  { name: "Barrow, AK, USA", latitude: 71.2906, longitude: -156.7886, averageTemp: 10 },
  { name: "Yakutsk, Russia", latitude: 62.0355, longitude: 129.6755, averageTemp: 5 },
  { name: "Oymyakon, Russia", latitude: 63.4641, longitude: 142.7737, averageTemp: -15 },

  // Scuba Diving Destinations
  { name: "Great Barrier Reef, Australia", latitude: -18.2871, longitude: 147.6992, averageTemp: 75 },
  { name: "Belize Barrier Reef, Belize", latitude: 17.3616, longitude: -87.9094, averageTemp: 80 },
  { name: "Coron, Philippines", latitude: 11.8789, longitude: 120.2633, averageTemp: 85 },
  { name: "Raja Ampat, Indonesia", latitude: -0.2349, longitude: 130.5243, averageTemp: 84 },

  // Economically Diverse Destinations
  { name: "Zurich, Switzerland", latitude: 47.3769, longitude: 8.5417, averageTemp: 45 },
  { name: "Monaco", latitude: 43.7384, longitude: 7.4246, averageTemp: 60 },
  { name: "Lagos, Nigeria", latitude: 6.5244, longitude: 3.3792, averageTemp: 85 },
  { name: "Dhaka, Bangladesh", latitude: 23.8103, longitude: 90.4125, averageTemp: 85 },
  { name: "Manila, Philippines", latitude: 14.5995, longitude: 120.9842, averageTemp: 82 },

  // More unique places
  { name: "Athabasca Glacier, Canada", latitude: 52.1833, longitude: -117.2856, averageTemp: 20 },
  { name: "Timbuktu, Mali", latitude: 16.7666, longitude: -3.0026, averageTemp: 85 },
  { name: "Ushuaia, Argentina", latitude: -54.8019, longitude: -68.3030, averageTemp: 45 },
  { name: "Fiji Islands", latitude: -17.7134, longitude: 178.0650, averageTemp: 78 },
  { name: "Antarctica", latitude: -82.8628, longitude: 135.0000, averageTemp: -50 },

  // India
  { name: "Delhi, India", latitude: 28.6139, longitude: 77.2090, averageTemp: 77 },
  { name: "Mumbai, India", latitude: 19.0760, longitude: 72.8777, averageTemp: 82 },
  { name: "Jaipur, India", latitude: 26.9124, longitude: 75.7873, averageTemp: 78 },
  { name: "Varanasi, India", latitude: 25.3176, longitude: 82.9739, averageTemp: 79 },
  { name: "Goa, India", latitude: 15.2993, longitude: 74.1240, averageTemp: 85 },

  // Egypt
  { name: "Cairo, Egypt", latitude: 30.0444, longitude: 31.2357, averageTemp: 80 },
  { name: "Luxor, Egypt", latitude: 25.6872, longitude: 32.6396, averageTemp: 85 },
  { name: "Giza, Egypt", latitude: 30.0131, longitude: 31.2089, averageTemp: 79 },
  { name: "Sharm El Sheikh, Egypt", latitude: 27.9158, longitude: 34.3299, averageTemp: 90 },

  // Even more unique locations
  { name: "Petra, Jordan", latitude: 30.3285, longitude: 35.4444, averageTemp: 75 },
  { name: "Machu Picchu, Peru", latitude: -13.1631, longitude: -72.5450, averageTemp: 57 },
  { name: "Bangkok, Thailand", latitude: 13.7563, longitude: 100.5018, averageTemp: 90 },
  { name: "Kasuga-taisha, Nara, Japan", latitude: 34.683, longitude: 135.849, averageTemp: 60 },
];

    // Filter destinations based on calculated distance and temperature
    const filtered = destinations.filter(dest => {
      const distanceToDest = calculateDistance(userCoords.lat, userCoords.lng, dest.latitude, dest.longitude);
      return distanceToDest <= maxDistance &&
             dest.averageTemp >= tempMin &&
             dest.averageTemp <= tempMax;
    });

    // Display results (fade in effect can be applied as desired)
    resultsDiv.innerHTML = `
      <p>Searching destinations from: <strong>${startLocation}</strong></p>
      <p><strong>Travel Range:</strong> ${distanceInput}</p>
      <p><strong>Preferred Temperature:</strong> ${temperatureInput ? temperatureInput + " °F" : "Any"}</p>
    `;
    if (filtered.length === 0) {
      resultsDiv.innerHTML += "<p>No destinations found matching your criteria.</p>";
    } else {
      resultsDiv.innerHTML += `<p>Found ${filtered.length} destinations:</p>`;
      const list = document.createElement("ul");
      filtered.forEach(dest => {
        const li = document.createElement("li");
        const distanceToDest = calculateDistance(userCoords.lat, userCoords.lng, dest.latitude, dest.longitude).toFixed(1);
        li.textContent = `${dest.name} - ${distanceToDest} miles away, Avg Temp: ${dest.averageTemp}°F`;
        list.appendChild(li);
      });
      resultsDiv.appendChild(list);
    }

    // Fade-in effect
    resultsDiv.style.opacity = "0";
    resultsDiv.style.transition = "opacity 1s ease-in-out";
    setTimeout(() => {
      resultsDiv.style.opacity = "1";
    }, 50);
  });
}

// Haversine formula function (in miles)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 3958.8; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
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

// Fade in the Local Meet Ups Panel
const contentPanels = document.querySelectorAll(".content-panel");
contentPanels.forEach((panel, index) => {
  setTimeout(() => {
    panel.style.display = "block";
    console.log("Scrolling to content panel", index);
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      panel.style.opacity = "1";
    }, 50);
  }, 666 + index * 450);
});

// Map US state names to their abbreviations
const stateAbbreviations = {
  "alabama": "al", "alaska": "ak", "arizona": "az", "arkansas": "ar", "california": "ca",
  "colorado": "co", "connecticut": "ct", "delaware": "de", "florida": "fl", "georgia": "ga",
  "hawaii": "hi", "idaho": "id", "illinois": "il", "indiana": "in", "iowa": "ia",
  "kansas": "ks", "kentucky": "ky", "louisiana": "la", "maine": "me", "maryland": "md",
  "massachusetts": "ma", "michigan": "mi", "minnesota": "mn", "mississippi": "ms",
  "missouri": "mo", "montana": "mt", "nebraska": "ne", "nevada": "nv", "new hampshire": "nh",
  "new jersey": "nj", "new mexico": "nm", "new york": "ny", "north carolina": "nc",
  "north dakota": "nd", "ohio": "oh", "oklahoma": "ok", "oregon": "or", "pennsylvania": "pa",
  "rhode island": "ri", "south carolina": "sc", "south dakota": "sd", "tennessee": "tn",
  "texas": "tx", "utah": "ut", "vermont": "vt", "virginia": "va", "washington": "wa",
  "west virginia": "wv", "wisconsin": "wi", "wyoming": "wy"
};

async function updateMeetupLink() {
  const meetupLink = document.getElementById("meetupLink");

  try {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    console.log("Geolocation data:", data);

    let link = "";
    const countryCode = data.country_code.toLowerCase();

    if (countryCode === "us") {
      // For US users
      const region = data.region.toLowerCase();
      const stateAbbr = stateAbbreviations[region] || region.replace(/\s+/g, '-');
      const city = data.city.toLowerCase().replace(/\s+/g, '-');
      link = `https://www.meetup.com/find/us--${stateAbbr}--${city}/hiking/`;
    } else {
      // For non-US users
      const city = data.city.toLowerCase().replace(/\s+/g, '-');
      link = `https://www.meetup.com/find/${countryCode}--${city}/hiking/`;
    }

    if (meetupLink) {
      meetupLink.href = link;
      console.log("Meetup URL set to:", link);
    }
  } catch (error) {
    console.error("Error fetching geolocation:", error);
    // Provide a default fallback URL if geolocation fails
    if (meetupLink) {
      meetupLink.href = "https://www.meetup.com/find/";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateMeetupLink();
});


document.addEventListener("DOMContentLoaded", () => {
  fetch("https://ipapi.co/json/")
    .then(response => response.json())
    .then(data => {
      console.log("Geolocation data:", data); // Check response in the console
      const city = data.city || "";
      const region = data.region || "";
      // Use region_code if available, for a two-letter abbreviation
      const regionAbbr = data.region_code || region;
      
      // Construct location string: for US, use abbreviation; otherwise use full region name
      const locationStr = (city && regionAbbr) 
        ? `${city}, ${regionAbbr}` 
        : (city ? city : "Your City");
      
      const startLocationInput = document.getElementById("start-location");
      if (startLocationInput) {
        startLocationInput.placeholder = locationStr;
      }
    })
    .catch(error => {
      console.error("Error fetching geolocation:", error);
    });
});

document.getElementById('sendButton').addEventListener('click', function() {
  const chatInput = document.getElementById('chatInput');
  const chatbox = document.getElementById('chatbox');

  const message = chatInput.value.trim();
  if (message !== '') {
    // Get the logged-in username from localStorage
    const username = localStorage.getItem('username') || "Guest";

    // Remove placeholder text on first message
    const placeholder = chatbox.querySelector('.chat-placeholder');
    if (placeholder) {
      chatbox.removeChild(placeholder);
    }

    // Create and add user message
    const userMessage = document.createElement('p');
    userMessage.textContent = `${username}: ${message}`;
    userMessage.style.color = '#64ffda';
    chatbox.appendChild(userMessage);

    // Clear input field
    chatInput.value = '';
    chatbox.scrollTop = chatbox.scrollHeight;
  }
});

