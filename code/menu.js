
const mybtn = document.getElementById('myList');
const tre = document.getElementById('btn');
tre.addEventListener("click", openmenu );
function openmenu() {
    if(mybtn.style.display != 'block') {
        mybtn.style.display = 'block';
    } else {
        mybtn.style.display = 'none';
    }
    console.log('clicked');
}

// map settings
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'

var map = L.map('map1').setView([59.745164250056135, 10.164131070531106], 15);
let marker = L.marker([59.745164250056135,10.164131070531106 ]).addTo(map)
let tileURL =   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { }).addTo(map);
const tiles =L.tileLayer(tileURL,{attribution})
let place = document.getElementById("searchbar").value;
const api_url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + place; 
console.log(place);


async function show_me(){

    let response = await fetch(api_url);
    //let response = await fetch('https://api.openbrewerydb.org/breweries');
    let data = await response.json();
    console.log(data);
    data.forEach(element => {
        let marker = L.marker([element.lat, element.lon]).addTo(map);
        marker.bindPopup(`<b>${element.name}</b><br>${element.lat}  ${element.lon}`).openPopup();
    });
}
