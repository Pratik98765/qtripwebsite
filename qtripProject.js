import config from "./qtripProjectBackend.js";

async function fetchCities() {
  try {
    let res = await fetch(config.backendEndpoint);
    let data = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log("couldn't make the request");
  }
}

let cities = await fetchCities();
// console.log(cities);
cities.forEach((city) => {
  addCityToDom( city.id, city.name, city.places, city.img);
});

function addCityToDom(id, name, places, img) {
  let cardDiv = document.createElement("div");
  cardDiv.className = "col-6 col-lg-3 mb-4";
  cardDiv.innerHTML = `
  <a href ="adventures.html?city=${id}"class="text-decoration-none text-inherit">
  <div class="card adventure-card h-100 border-0 shadow-sm overflow-hidden">
    <img src="${img}" class="card-img-top" style="height: 300px; object-fit: cover;">
    <div class="card-body d-flex flex-column align-items-center">
        <h5 class="mb-0 fw-bold">${name}</h5>
        <p class="mb-0 opacity-75">${places}</p>
    </div>
  </div>
  `;
  let container = document.getElementById("data");
  container.append(cardDiv);
}


