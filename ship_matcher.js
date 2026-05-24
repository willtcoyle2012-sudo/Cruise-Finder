// =========================
// GLOBAL STATE
// =========================
let currentResults = [];

// =========================
// SHIP DATA (UNCHANGED)
// =========================
const ships = [
  {
    name: "Celebrity Millennium",
    budget: "Luxury",
    vibes: ["Relaxation", "Adventure"],
    size: "Medium",
    amenities: ["Pools", "Spa", "Shows", "Bars"],
    image: "https://www.wendywutours.co.uk/resource/upload/2563/cel-ml-blue-hull-aerial-4-banner.jpg.webp",
    attractions: ["Celebrity Theater", "Solarium", "Spa & Fitness Center"]
  },
  {
    name: "Nieuw Statendam",
    budget: "Luxury",
    vibes: ["Relaxation", "Adventure"],
    size: "Medium",
    amenities: ["Bars", "Spa", "Shows"],
    image: "https://res.cloudinary.com/cruiseimages/q_auto,f_auto,w_750,ar_4:3,c_fit/ship/1144214.jpg",
    attractions: ["Music Hall", "Retreat Spa", "Main Dining Room"]
  },
  {
    name: "MSC Divina",
    budget: "Mid",
    vibes: ["Family", "Relaxation"],
    size: "Large",
    amenities: ["Pools", "Shows", "Kids Club", "Bars"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/MSC_Divina_a_Istanbul.JPG/960px-MSC_Divina_a_Istanbul.JPG",
    attractions: ["MSC Theater", "Aurea Spa", "Kids Club Aqua Park"]
  },
  {
    name: "Mariner of the Seas",
    budget: "Mid",
    vibes: ["Adventure", "Family"],
    size: "Large",
    amenities: ["Pools", "Adventure Park", "Shows", "Bars", "Kids Club"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Bahamas_Cruise_-_ship_exterior_-_June_2018_%283303%29.jpg/960px-Bahamas_Cruise_-_ship_exterior_-_June_2018_%283303%29.jpg",
    attractions: ["FlowRider Surf Simulator", "Adventure Ocean Kids Club", "Broadway Shows"]
  },
  {
    name: "Carnival Vista",
    budget: "Budget",
    vibes: ["Adventure", "Party"],
    size: "Large",
    amenities: ["Pools", "Bars", "Shows"],
    image: "https://eatsleepcruise.com/wp-content/uploads/2025/07/Carnival-Vista-Cruise-Review-Feature.jpg.optimal.jpg",
    attractions: ["SkyRide", "WaterWorks Park", "IMAX Theater"]
  },
  {
    name: "Norwegian Breakaway",
    budget: "Mid",
    vibes: ["Party", "Adventure"],
    size: "Large",
    amenities: ["Pools", "Bars", "Shows", "Adventure Park"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Norwegian_Breakaway_Jan_20_2023.jpg/960px-Norwegian_Breakaway_Jan_20_2023.jpg",
    attractions: ["Waterfront Promenade", "Ropes Course", "Aqua Park"]
  },
  {
    name: "Harmony of the Seas",
    budget: "Mid",
    vibes: ["Adventure", "Family"],
    size: "Mega",
    amenities: ["Pools", "Spa", "Shows", "Adventure Park", "Bars"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/RCCL_Harmony_of_the_Seas_%2850991506292%29.jpg/960px-RCCL_Harmony_of_the_Seas_%2850991506292%29.jpg",
    attractions: ["Ultimate Abyss", "FlowRider", "Central Park"]
  }
];

// =========================
// HELPERS (UNCHANGED)
// =========================
function getSelectedOptions(id) {
  return Array.from(document.getElementById(id).selectedOptions).map(o => o.value);
}

// =========================
// SCORING (UNCHANGED)
// =========================
function scoreShip(ship, budget, vibes, size, amenities) {
  let score = 0;
  let maxScore = 0;

  maxScore++;
  if (ship.budget === budget) score++;

  maxScore++;
  if (ship.size === size) score++;

  if (vibes.length) {
    maxScore++;
    score += ship.vibes.filter(v => vibes.includes(v)).length / vibes.length;
  }

  if (amenities.length) {
    maxScore++;
    score += ship.amenities.filter(a => amenities.includes(a)).length / amenities.length;
  }

  return (score / maxScore) * 100;
}

// =========================
// RENDER
// =========================
function calculateScores() {
  const budget = document.getElementById("budget").value;
  const size = document.getElementById("size").value;
  const vibes = getSelectedOptions("vibes");
  const amenities = getSelectedOptions("amenities");

  const scoredShips = ships.map(ship => ({
    ...ship,
    score: scoreShip(ship, budget, vibes, size, amenities)
  })).sort((a, b) => b.score - a.score);

  currentResults = scoredShips;

  const results = document.getElementById("results");

  results.innerHTML = scoredShips.map((ship, index) => {

    const badge = index === 0
      ? `<div class="text-green-500 font-bold mb-2">BEST MATCH</div>`
      : "";

    return `
      <div class="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition">

        <div class="relative h-52">
          <img src="${ship.image}" class="w-full h-full object-cover">

          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

          <div class="absolute bottom-3 left-3 text-white">
            <h3 class="text-lg font-bold">${ship.name}</h3>
            ${badge}
          </div>
        </div>

        <div class="p-4">
          <div class="h-2 rounded-full mb-4 ${
            ship.score > 70 ? 'bg-green-500' :
            ship.score > 40 ? 'bg-yellow-500' :
            'bg-red-500'
          }"></div>

          <button onclick="openModal(${index})"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl">
            View More
          </button>
        </div>

      </div>
    `;
  }).join("");
}

// =========================
// MODAL (UNCHANGED LOGIC)
// =========================
function openModal(index) {
  const ship = currentResults[index];

  document.getElementById("modalContent").innerHTML = `
    <img src="${ship.image}" class="w-full h-64 object-cover rounded-t-3xl">

    <div class="p-6">
      <h2 class="text-2xl font-bold mb-3">${ship.name}</h2>

      <p><b>Vibes:</b> ${ship.vibes.join(", ")}</p>
      <p><b>Size:</b> ${ship.size}</p>
      <p><b>Amenities:</b> ${ship.amenities.join(", ")}</p>

      <p class="mt-4 font-semibold">Attractions</p>
      <p>${ship.attractions.join(", ")}</p>

      <button class="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl">
        Book Now
      </button>
    </div>
  `;

  document.getElementById("shipModal").classList.remove("opacity-0", "pointer-events-none");
  document.getElementById("shipModalContent").classList.remove("translate-y-10");
}

function closeModal() {
  document.getElementById("shipModal").classList.add("opacity-0", "pointer-events-none");
  document.getElementById("shipModalContent").classList.add("translate-y-10");
}
