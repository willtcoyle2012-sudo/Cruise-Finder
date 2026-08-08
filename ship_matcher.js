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
