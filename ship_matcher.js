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
    name:"MSC Divina",
    line:"MSC Cruises",

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
    name:"Harmony of the Seas",
    line:"Royal Caribbean",

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



// =========================
// DISPLAY RESULTS
// =========================

function displayResults(results){


    document.getElementById("results").innerHTML =

    results.map((ship,index)=>`


    <div class="ship-card">


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
        ${ship.atmosphere.join(" · ")}
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



        </div>


    </div>


    `).join("");

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
