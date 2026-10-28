import apiConfig from "./adventuresData.js";

function getCityFromURL(){
const params = new URLSearchParams(window.location.search)
return params.get("city")
}

async function fetchAddventures() {
  try {
    let res = await fetch(apiConfig.backendEndpoint);
    let data = await res.json();
    return data;
  } catch (error) {
    console.log("couldn't make the request");
    return[]
  }
}
async function init(){
  let cityId = getCityFromURL()

  const exploreLink = document.getElementById("explore-nav-link");
  if (exploreLink && cityId) {
    exploreLink.href = `adventures.html?city=${cityId}`;
  }

  let adventure = await fetchAddventures()
  if(!adventure) return;

  let filteredAdventures = adventure.filter((adventure) => adventure.city === cityId)

  let container = document.getElementById("adventure-data");
  if (!container) return;

  // Handle case where no adventures match the city
  if (filteredAdventures.length === 0) {
    container.innerHTML = `<p class="text-center w-100">No adventures found for this city.</p>`;
    return;
  }

  filteredAdventures.forEach((adventure) => {
    addAdventure(adventure.id, adventure.name, adventure.costPerHead, adventure.image);
  });

}
function addAdventure(id, name, costPerhead, image) {
  let cardDiv = document.createElement("div");
  cardDiv.className = "col-lg-3 col-sm-6 col-12 mb-4";
  cardDiv.innerHTML = `
  <a href="detail.html?adventure=${id}" class="text-decoration-none">
  <div class="card adventure-card h-100 shadow-sm">
   <div class="image-wrapper" style="height: 250px; overflow: hidden;">
     <img src="${image}" class="w-100 h-100" style="object-fit: cover;" alt="${name}">
   </div>
    <div class="card-body d-flex justify-content-between align-items-center">
        <h5 class="mb-0 fw-bold text-truncate" style="max-width: 70%;" title="${name}"">${name}</h5>
        <p class="mb-0 text-muted fw-semibold">Rs ${costPerhead}</p>
    </div>
</div>
</a>
  `;
  let container = document.getElementById("adventure-data");
  container.append(cardDiv);
}

init()