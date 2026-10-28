import apiConfig from "../adventuresData.js";

// 1. Extract the adventure ID from the URL query string
function getAdventureIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("adventure");
}

// 2. Fetch all adventures and find the matching one
async function fetchAdventureDetails(adventureId) {
  try {
    let res = await fetch(apiConfig.backendEndpoint);
    let adventures = await res.json();
    let matchedAdventure = adventures.find((adv) => adv.id === adventureId);
    return matchedAdventure;
  } catch (error) {
    console.log("Could not fetch adventure details", error);
    return null;
  }
}

// 3. Initialize and render data onto the DOM
async function initDetail() {
  let adventureId = getAdventureIdFromURL();
  if (!adventureId) return;

  let adventure = await fetchAdventureDetails(adventureId);
  
  if (!adventure) {
    document.querySelector(".container").innerHTML = `
      <h3 class="text-center text-danger mt-5">Adventure not found!</h3>
    `;
    return;
  }

  const exploreLink = document.getElementById("explore-nav-link");
  if (exploreLink && adventure.city) {
    exploreLink.href = `../adventures.html?city=${adventure.city}`;
  }

  const adventuresBreadcrumbLink = document.getElementById("breadcrumb-adventures-link");
  if (adventuresBreadcrumbLink && adventure.city) {
    adventuresBreadcrumbLink.href = `../adventures.html?city=${adventure.city}`;
  }

  // Populate HTML elements with MockAPI data
  document.getElementById("adventure-name").innerText = adventure.name;
  document.getElementById("breadcrumb-adventure-name").innerText = adventure.name;
  document.getElementById("adventure-subtitle").innerText = adventure.subtitle;
  document.getElementById("adventure-image").src = adventure.image;
  document.getElementById("adventure-content").innerText = adventure.content;
  document.getElementById("adventure-cost").innerText = `Rs ${adventure.costPerHead}`;
}

initDetail();

const reserveButton = document.getElementById("reserve-btn")

if (reserveButton) {
  reserveButton.addEventListener("click", function () {
    console.log("Booking confirmed");
    alert("Booking confirmed");

    
    // Remove the "../" prefix if booking.html is in the main root folder
    window.location.href = "index.html";
  });
}
