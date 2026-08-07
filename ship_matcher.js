// =========================
// STATE
// =========================

let currentResults = [];
 

// ========================= 
// STARTUP
// =========================

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".option-btn").forEach(button => {

        button.addEventListener("click", () => {

            button.classList.toggle("active");

        });

    });


    startBannerSlider();

});


// =========================
// GET SELECTED BUTTONS
// =========================

function getSelectedButtons(id){

    return Array.from(
        document.querySelectorAll(`#${id} .active`)
    )
    .map(button => button.dataset.value);

}



// =========================
// SHIP DATABASE
// =========================

const ships = [

{
    name: "Celebrity Constellation",
    line: "Celebrity Cruises",
    booking:
    "https://www.celebritycruises.com/cruise-ships/celebrity-constellation",
 
    budget: "Luxury",
 
    atmosphere:[
        "Relaxation",
        "Adventure"
    ],

    size:"Medium",

    amenities:[
        "Pools",
        "Spa",
        "Shows",
        "Bars"
    ],

    image:
    "https://www.wendywutours.co.uk/resource/upload/2563/cel-ml-blue-hull-aerial-4-banner.jpg.webp",

    attractions:[
        "Celebrity Theater",
        "Solarium",
        "Spa & Fitness"
    ]
},



{
    name:"Nieuw Statendam",
    line:"Holland America Line",
    booking:
    "https://www.hollandamerica.com/en/eu/find-a-cruise?shipId:(NS)",
 
    budget:"Luxury",

    atmosphere:[
        "Relaxation",
        "Adventure"
    ],

    size:"Medium",

    amenities:[
        "Bars",
        "Spa",
        "Shows"
    ],

    image:
    "https://res.cloudinary.com/cruiseimages/q_auto,f_auto,w_750,ar_4:3,c_fit/ship/1144214.jpg",

    attractions:[
        "Music Hall",
        "Retreat Spa",
        "Dining Room"
    ]
},


    
{
    name: "EXPLORA I",
    line: "Explora Journeys",
    booking:
    "https://explorajourneys.com/ie/en/ships/explora-I?_gl=1*hzcssc*_up*MQ..*_gs*MQ..&gclid=CjwKCAjwhNbTBhB4EiwAsFSg-n-CA4WXjphnlqvrq70Swj-DxHkawOLqpG9TbN-jc-G-Nu9JpQkSghoCxlAQAvD_BwE&gbraid=0AAAAAoVePPVwptj-THUz6i07n2NgVle_H&perPage=9&sortCriteria=ec_prd_sail_from_datetime%20asc%2Cec_prd_price_double_sellingprice%20asc&f-ec_prd_ship_name=EXPLORA%20I",
 
    budget: "Luxury",

    atmosphere: [
        "Relaxation"
    ],

    size: "Medium",

    amenities: [
        "Pools",
        "Spa",
        "Shows",
        "Bars"
    ],

    image:
    "https://www.kreuzfahrten.de/data/pictures/ship/explora-journeys-explora-i-5005-20230929-0.jpg",

    attractions: [
        "Ocean Wellness Spa",
        "Explora Lounge",
        "The Conservatory Pool & Bar"
    ]
},



{
    name: "Carnival Paradise",
    line: "Carnival Cruise Line",
    booking:
    "https://www.carnival.com/cruise-ships/carnival-paradise",
 
   budget: "Budget",

    atmosphere: [
        "Family",
        "Party",
        "Relaxation"
    ],

    size: "Medium",

    amenities: [
        "Pools",
        "Spa",
        "Shows",
        "Bars",
        "Adventure Park",
        "Kids Club"
    ],

    image:
    "https://preview.redd.it/carnival-paradise-v0-c5wwrvrv9mof1.jpeg?width=640&crop=smart&auto=webp&s=ee8a3aa578f89064122323a8c823791288e5dcc3",

    attractions: [
        "Carnival WaterWorks",
        "Cloud 9 Spa",
        "The Punchliner Comedy Club"
    ]
},



{
    name: "Ambience",
    line: "Ambassador Cruise Line",
    booking:
    "https://www.ambassadorcruiseline.com/our-ships/ambience/",
 
    budget: "Mid",

    atmosphere: [
        "Relaxation"
    ],

    size: "Medium",

    amenities: [
        "Pools",
        "Spa",
        "Shows",
        "Bars"
    ],

    image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Ambience_moored_at_Pier_25_in_Port_of_Tallinn_19_May_2022_%28cropped%29.jpg/960px-Ambience_moored_at_Pier_25_in_Port_of_Tallinn_19_May_2022_%28cropped%29.jpg",

    attractions: [
        "The Palladium Theatre",
        "Green Sea Spa",
        "The Observatory"
    ]
},
    


{
    name: "Marella Voyager",
    line: "Marella Cruises",
    booking:
    "https://www.tui.co.uk/cruise/ships/marella-voyager/",
  
    budget: "Mid",

    atmosphere: [
        "Family",
        "Relaxation",
        "Adventure"
    ],

    size: "Medium",

    amenities: [
        "Pools",
        "Spa",
        "Shows",
        "Bars",
        "Kids Club"
    ],

    image:
    "https://www.cruisemapper.com/images/ships/682-97dc8b10300f.jpg",

    attractions: [
        "The Veranda",
        "The Broadway Show Lounge",
        "The Kitchens"
    ]
},



{
    name: "Aurora",
    line: "P&O Cruises",
    booking:
    "https://www.pocruises.com/cruise-ships/aurora/overview",
  
    budget: "Mid",

    atmosphere: [
        "Relaxation"
    ],

    size: "Medium",

    amenities: [
        "Pools",
        "Spa",
        "Shows",
        "Bars"
    ],

    image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/MV_Aurora_2015-08-24_-_Side.JPG/960px-MV_Aurora_2015-08-24_-_Side.JPG",

    attractions: [
        "The Curzon Theatre",
        "The Playhouse Cinema",
        "Oasis Spa"
    ]
},



{
    name: "Regatta",
    line: "Oceania Cruises",
    booking:
    "https://www.oceaniacruises.com/ships/regatta",
  
    budget: "Luxury",

    atmosphere: [
        "Relaxation"
    ],

    size: "Small",

    amenities: [
        "Pools",
        "Spa",
        "Shows",
        "Bars"
    ],

    image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Regatta%2C_Fremantle%2C_2018_%2804%29.jpg/960px-Regatta%2C_Fremantle%2C_2018_%2804%29.jpg",

    attractions: [
        "Aquamar Spa + Vitality Center",
        "Grand Dining Room",
        "Horizons"
    ]
},



{
    name: "MSC Orchestra",
    line: "MSC Cruises",
    booking:
    "https://www.msccruises.ie/ships/msc-orchestra",
  
    budget: "Mid",

    atmosphere: [
        "Family",
        "Relaxation"
    ],

    size: "Medium",

    amenities: [
        "Pools",
        "Spa",
        "Shows",
        "Bars",
        "Kids Club"
    ],

    image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-FRuPnP7OFJclsVB-8Hd-IMzrsdM2i9pYcCssP990LQ&s=10",

    attractions: [
        "Covent Garden Theatre",
        "MSC Aurea Spa",
        "Savannah Bar"
    ]
},





    
    
{
    name:"MSC Divina",
    line:"MSC Cruises",
    booking:
    "https://www.msccruises.ie/ships/msc-divina",
  
    budget:"Mid",

    atmosphere:[
        "Family",
        "Relaxation"
    ],

    size:"Large",

    amenities:[
        "Pools",
        "Shows",
        "Kids Club",
        "Bars"
    ],

    image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/MSC_Divina_a_Istanbul.JPG/960px-MSC_Divina_a_Istanbul.JPG",

    attractions:[
        "MSC Theater",
        "Aqua Park",
        "Spa"
    ]
},



{
    name:"Mariner of the Seas",
    line:"Royal Caribbean",
    booking:
    "https://www.royalcaribbean.com/gbr/en/cruise-ships/mariner-of-the-seas",
  
    budget:"Mid",

    atmosphere:[
        "Adventure",
        "Family"
    ],

    size:"Large",

    amenities:[
        "Pools",
        "Adventure Park",
        "Shows",
        "Bars",
        "Kids Club"
    ],

    image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Bahamas_Cruise_-_ship_exterior_-_June_2018_%283303%29.jpg/960px-Bahamas_Cruise_-_ship_exterior_-_June_2018_%283303%29.jpg",

    attractions:[
        "FlowRider",
        "Kids Club",
        "Shows"
    ]
},



{
    name:"Carnival Vista",
    line:"Carnival Cruise Line",
    booking:
    "https://www.carnival.com/cruise-ships/carnival-vista",
  
    budget:"Budget",

    atmosphere:[
        "Adventure",
        "Party"
    ],

    size:"Large",

    amenities:[
        "Pools",
        "Bars",
        "Shows"
    ],

    image:
    "https://eatsleepcruise.com/wp-content/uploads/2025/07/Carnival-Vista-Cruise-Review-Feature.jpg.optimal.jpg",

    attractions:[
        "SkyRide",
        "Water Park",
        "IMAX Theater"
    ]
},



{
    name:"Norwegian Breakaway",
    line:"Norwegian Cruise Line",
    booking:
    "https://www.ncl.com/fr/en/cruise-ship/breakaway",
  
    budget:"Mid",

    atmosphere:[
        "Party",
        "Adventure"
    ],

    size:"Large",

    amenities:[
        "Pools",
        "Bars",
        "Shows",
        "Adventure Park"
    ],

    image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Norwegian_Breakaway_Jan_20_2023.jpg/960px-Norwegian_Breakaway_Jan_20_2023.jpg",

    attractions:[
        "Ropes Course",
        "Water Slides",
        "Promenade"
    ]
},

    

{
    name: "Celebrity Silhouette",
    line: "Celebrity Cruises",
    booking:
    "https://www.celebritycruises.com/ie/cruise-ships/celebrity-silhouette",
 
    budget: "Luxury",

    atmosphere: [
        "Relaxation",
        "Adventure"
    ],

    size: "Large",

    amenities: [
        "Pools",
        "Spa",
        "Shows",
        "Bars"
    ],

    image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Celebrity_Silhouette_%28ship%2C_2011%29_at_Liverpool_Cruise_Terminal_1.jpg/960px-Celebrity_Silhouette_%28ship%2C_2011%29_at_Liverpool_Cruise_Terminal_1.jpg",

    attractions: [
        "The Lawn Club",
        "The Retreat Lounge",
        "The Theatre"
    ]
},


    
{
    name:"Harmony of the Seas",
    line:"Royal Caribbean",
    booking:
    "https://www.royalcaribbean.com/gbr/en/cruise-ships/harmony-of-the-seas",
 
    budget:"Mid",

    atmosphere:[
        "Adventure",
        "Family"
    ],

    size:"Mega",

    amenities:[
        "Pools",
        "Spa",
        "Shows",
        "Adventure Park",
        "Bars"
    ],

    image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/RCCL_Harmony_of_the_Seas_%2850991506292%29.jpg/960px-RCCL_Harmony_of_the_Seas_%2850991506292%29.jpg",

    attractions:[
        "Ultimate Abyss",
        "Central Park",
        "FlowRider"
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

        score +=
        ship.atmosphere.filter(item =>
            atmosphere.includes(item)
        ).length / atmosphere.length;

    }



    // Amenities

    if(amenities.length){

        maxScore++;

        score +=
        ship.amenities.filter(item =>
            amenities.includes(item)
        ).length / amenities.length;

    }



    return (score / maxScore) * 100;

}




// =========================
// SEARCH
// =========================

function calculateScores(){

console.log("CALCULATE SCORES FIRED"); 

    const budget =
    document.getElementById("budget").value;


    const size =
    document.getElementById("size").value;


    const atmosphere =
    getSelectedButtons("atmosphere");


    const amenities =
    getSelectedButtons("amenities");



    const scoredShips =
    ships.map(ship => ({

        ...ship,

        score:
        scoreShip(
            ship,
            budget,
            atmosphere,
            size,
            amenities
        )

    }));



    scoredShips.sort((a,b)=>
        b.score-a.score
    );



    currentResults = scoredShips;



    displayResults(scoredShips);

}

document.getElementById("resultsSection").scrollIntoView({
    behavior:"smooth"
});

// =========================
// DISPLAY RESULTS
// =========================

function displayResults(results){

    document.getElementById("results").innerHTML =

    results.map((ship,index)=>`

    <div class="ship-card cursor-pointer"
        onclick="openModal(${index})">

        <img
        src="${ship.image}"
        class="w-full h-52 object-cover">

        <div class="p-5">

        ${
            index===0
            ?
            `<div class="text-blue-600 font-bold text-sm mb-2">
            BEST MATCH
            </div>`
            :
            ""
        }

        <h2 class="text-2xl font-bold">
        ${ship.name}
        </h2>

        <p class="text-sm text-gray-500 mt-1">
        ${ship.line}
        </p>

        <p class="mt-3 text-gray-600">
        ${ship.atmosphere.join(" • ")}
        </p>

        <div class="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">

            <div
            class="h-full bg-blue-600"
            style="width:${ship.score}%">
            </div>

        </div>

        <p class="text-sm text-gray-500 mt-2">
        Match Score: ${Math.round(ship.score)}%
        </p>

        <button
        class="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition">

        View More

        </button>

        </div>

    </div>

    `).join("");

}

// =========================
// Modal
// =========================

function openModal(index){

    const ship = currentResults[index];

    document.getElementById("modalContent").innerHTML = `

        <img
        src="${ship.image}"
        class="w-full h-72 object-cover rounded-t-[32px]">

        <div class="p-8">

            <h2 class="text-4xl font-bold">
            ${ship.name}
            </h2>

            <p class="text-lg text-gray-500 mt-1">
            ${ship.line}
            </p>

            <div class="flex gap-2 flex-wrap mt-6">

                <span class="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                ${Math.round(ship.score)}% Match
                </span>

                <span class="bg-gray-100 px-4 py-2 rounded-full">
                ${ship.budget}
                </span>

                <span class="bg-gray-100 px-4 py-2 rounded-full">
                ${ship.size}
                </span>

            </div>

            <h3 class="font-bold text-xl mt-8">
            Atmosphere
            </h3>

            <p class="mt-2">
            ${ship.atmosphere.join(", ")}
            </p>

            <h3 class="font-bold text-xl mt-6">
            Amenities
            </h3>

            <p class="mt-2">
            ${ship.amenities.join(", ")}
            </p>

            <h3 class="font-bold text-xl mt-6">
            Top Attractions
            </h3>

            <ul class="list-disc ml-6 mt-2">

                ${ship.attractions.map(a=>`<li>${a}</li>`).join("")}

            </ul>

 <a
href="${ship.booking}"
target="_blank"
class="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-center block">

View Sailings

</a>

        </div>

    `;

    const modal = document.getElementById("shipModal");
    const modalContent = document.getElementById("shipModalContent");

    modal.classList.remove("opacity-0","pointer-events-none");
    modalContent.classList.remove("translate-y-8");

}

function closeModal(){

    const modal = document.getElementById("shipModal");
    const modalContent = document.getElementById("shipModalContent");

    modal.classList.add("opacity-0","pointer-events-none");
    modalContent.classList.add("translate-y-8");

}



// =========================
// BANNER SLIDER
// =========================

const bannerImages = [

"https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/blogs/2147843317/images/6851e1-8b04-3a1f-3f13-f66668f4a45_rccl-cococay-landscape-professor-melissa-horizontal-3.jpg",

"https://www.cruisehive.com/wp-content/uploads/2024/08/nassaucruise1.jpg",

"https://cruisefever.net/wp-content/uploads/2023/08/cruise-port-scams-to-avoid.jpg"

];


let bannerIndex = 0;



function startBannerSlider(){


    const image =
    document.getElementById("bannerImage");


    if(!image) return;



    setInterval(()=>{


        bannerIndex =
        (bannerIndex + 1)
        %
        bannerImages.length;



        image.src =
        bannerImages[bannerIndex];


    },4000);


}
