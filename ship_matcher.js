// =========================
// GLOBAL STATE
// =========================

let currentResults = [];

// =========================
// BUTTON TOGGLES
// =========================

document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".option-btn").forEach(button => {
    button.addEventListener("click", () => {
      button.classList.toggle("active");
    });
  });

});

// =========================
// GET SELECTED BUTTONS
// =========================

function getSelectedButtons(id) {
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
    attractions: ["Celebrity Theater", "Solarium", "Spa & Fitness Center"]
  },
  {
    name: "Nieuw Statendam",
    budget: "Luxury",
    atmosphere: ["Relaxation", "Adventure"],
    size: "Medium",
    amenities: ["Bars", "Spa", "Shows"],
    image: "https://res.cloudinary.com/cruiseimages/q_auto,f_auto,w_750,ar_4:3,c_fit/ship/1144214.jpg",
    attractions: ["Music Hall", "Retreat Spa", "Main Dining Room"]
  },
  {
    name: "MSC Divina",
    budget: "Mid",
    atmosphere: ["Family", "Relaxation"],
    size: "Large",
    amenities: ["Pools", "Shows", "Kids Club", "Bars"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/MSC_Divina_a_Istanbul.JPG/960px-MSC_Divina_a_Istanbul.JPG",
    attractions: ["MSC Theater", "Aurea Spa", "Kids Club Aqua Park"]
  },
  {
    name: "Mariner of the Seas",
    budget: "Mid",
    atmosphere: ["Adventure", "Family"],
    size: "Large",
    amenities: ["Pools", "Adventure Park", "Shows", "Bars", "Kids Club"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Bahamas_Cruise_-_ship_exterior_-_June_2018_%283303%29.jpg/960px-Bahamas_Cruise_-_ship_exterior_-_June_2018_%283303%29.jpg",
    attractions: ["FlowRider Surf Simulator", "Adventure Ocean Kids Club", "Broadway Shows"]
  },
  {
    name: "Carnival Vista",
    budget: "Budget",
    atmosphere: ["Adventure", "Party"],
    size: "Large",
    amenities: ["Pools", "Bars", "Shows"],
    image: "https://eatsleepcruise.com/wp-content/uploads/2025/07/Carnival-Vista-Cruise-Review-Feature.jpg.optimal.jpg",
    attractions: ["SkyRide", "WaterWorks Park", "IMAX Theater"]
  },
  {
    name: "Norwegian Breakaway",
    budget: "Mid",
    atmosphere: ["Party", "Adventure"],
    size: "Large",
    amenities: ["Pools", "Bars", "Shows", "Adventure Park"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Norwegian_Breakaway_Jan_20_2023.jpg/960px-Norwegian_Breakaway_Jan_20_2023.jpg",
    attractions: ["The Waterfront Promenade", "Ropes Course & Zipline", "Burn the Floor Show", "Aqua Park Water Slides"]
  },
  {
    name: "Royal Caribbean Harmony of the Seas",
    budget: "Mid",
    atmosphere: ["Adventure", "Family"],
    size: "Mega",
    amenities: ["Pools", "Spa", "Shows", "Adventure Park", "Bars"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/RCCL_Harmony_of_the_Seas_%2850991506292%29.jpg/960px-RCCL_Harmony_of_the_Seas_%2850991506292%29.jpg",
    attractions: ["Ultimate Abyss Slide", "FlowRider", "Central Park Promenade"]
  }
];

// =========================
// SCORING FUNCTION
// =========================

function scoreShip(ship, budget, atmosphere, size, amenities) {

  let score = 0;
  let maxScore = 0;

  // Budget match
  maxScore++;
  if (ship.budget === budget) score++;

  // Size match
  maxScore++;
  if (ship.size === size) score++;

  // Atmosphere match
  if (atmosphere.length) {
    maxScore++;
    score += ship.atmosphere.filter(a => atmosphere.includes(a)).length / atmosphere.length;
  }

  // Amenities match
  if (amenities.length) {
    maxScore++;
    score += ship.amenities.filter(a => amenities.includes(a)).length / amenities.length;
  }

  return (score / maxScore) * 100;
}

// =========================
// MAIN SEARCH FUNCTION
// =========================

function calculateScores() {

  const budget = document.getElementById("budget").value;
  const size = document.getElementById("size").value;
  const atmosphere = getSelectedButtons("atmosphere");
  const amenities = getSelectedButtons("amenities");

  const scoredShips = ships.map(ship => ({
    ...ship,
    score: scoreShip(ship, budget, atmosphere, size, amenities)
  }));

  scoredShips.sort((a, b) => b.score - a.score);

  currentResults = scoredShips;

  const resultsEl = document.getElementById("results");

  resultsEl.innerHTML = scoredShips.map((ship, index) => `
    <div class="ship-card">
      <img src="${ship.image}" class="w-full h-52 object-cover">

      <div class="p-5">

        ${index === 0 ? `<div class="text-blue-600 font-bold text-sm mb-2">BEST MATCH</div>` : ""}

        <h2 class="text-2xl font-bold">${ship.name}</h2>

        <p class="mt-3 text-gray-600">
          ${ship.atmosphere.join(" · ")}
        </p>

        <div class="mt-5">

          <div class="h-2 rounded-full bg-gray-200 overflow-hidden">
            <div class="h-full bg-blue-600" style="width:${ship.score}%"></div>
          </div>

          <p class="mt-2 text-sm text-gray-500">
            Match Score: ${Math.round(ship.score)}%
          </p>

        </div>

      </div>
    </div>
  `).join("");
}
