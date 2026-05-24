// =========================
// GLOBAL STATE
// =========================

let currentResults = [];

// =========================
// BUTTON TOGGLES
// =========================

document.querySelectorAll('.option-btn').forEach(button => {

  button.addEventListener('click', () => {

    button.classList.toggle('active');

  });

});

// =========================
// GET ACTIVE BUTTONS
// =========================

function getSelectedButtons(id){

  return Array.from(
    document.querySelectorAll(`#${id} .active`)
  ).map(button => button.dataset.value);

}

// =========================
// SHIP DATA
// =========================

const ships = [

  {
    name: "Celebrity Millennium",
    budget: "Luxury",
    atmosphere: ["Relaxation", "Adventure"],
    size: "Medium",
    amenities: ["Pools", "Spa", "Shows", "Bars"],
    image: "https://www.wendywutours.co.uk/resource/upload/2563/cel-ml-blue-hull-aerial-4-banner.jpg.webp",
    attractions: [
      "Celebrity Theater",
      "Solarium",
      "Spa & Fitness Center"
    ]
  },

  {
    name: "MSC Divina",
    budget: "Mid",
    atmosphere: ["Family", "Relaxation"],
    size: "Large",
    amenities: ["Pools", "Shows", "Kids Club", "Bars"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/MSC_Divina_a_Istanbul.JPG/960px-MSC_Divina_a_Istanbul.JPG",
    attractions: [
      "MSC Theater",
      "Aurea Spa",
      "Kids Club Aqua Park"
    ]
  }

];

// =========================
// SCORING
// =========================

function scoreShip(ship, budget, atmosphere, size, amenities){

  let score = 0;
  let maxScore = 0;

  // Budget

  maxScore++;

  if(ship.budget === budget){
    score++;
  }

  // Size

  maxScore++;

  if(ship.size === size){
    score++;
  }

  // Atmosphere

  if(atmosphere.length){

    maxScore++;

    score += ship.atmosphere.filter(a =>
      atmosphere.includes(a)
    ).length / atmosphere.length;

  }

  // Amenities

  if(amenities.length){

    maxScore++;

    score += ship.amenities.filter(a =>
      amenities.includes(a)
    ).length / amenities.length;

  }

  return (score / maxScore) * 100;

}

// =========================
// RESULTS
// =========================

function calculateScores(){

  const budget = document.getElementById("budget").value;

  const size = document.getElementById("size").value;

  const atmosphere = getSelectedButtons("atmosphere");

  const amenities = getSelectedButtons("amenities");

  const scoredShips = ships.map(ship => ({

    ...ship,

    score: scoreShip(
      ship,
      budget,
      atmosphere,
      size,
      amenities
    )

  }));

  scoredShips.sort((a,b) => b.score - a.score);

  currentResults = scoredShips;

  const results = document.getElementById("results");

  results.innerHTML = scoredShips.map((ship,index) => `

    <div class="ship-card">

      <img
        src="${ship.image}"
        class="w-full h-52 object-cover"
      >

      <div class="p-5">

        ${index === 0
          ? `<div class="text-blue-600 font-bold text-sm mb-2">BEST MATCH</div>`
          : ""
        }

        <h2 class="text-2xl font-bold">
          ${ship.name}
        </h2>

        <p class="mt-3 text-gray-600">
          ${ship.atmosphere.join(" · ")}
        </p>

        <div class="mt-5">

          <div class="h-2 rounded-full bg-gray-200 overflow-hidden">

            <div
              class="h-full bg-blue-600 rounded-full"
              style="width:${ship.score}%">
            </div>

          </div>

          <p class="mt-2 text-sm text-gray-500">
            Match Score: ${Math.round(ship.score)}%
          </p>

        </div>

      </div>

    </div>

  `).join("");

}
