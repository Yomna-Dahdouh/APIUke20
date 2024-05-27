// ------------------ Henter HTML-elementer ------------------ //
const mybtn = document.getElementById('myList');
const tre = document.getElementById('btn');
const searchbar = document.getElementById('searchbar');

// ------------------ Legger til klikklytter ------------------ //
tre.addEventListener("click", openmenu);

// ------------------ Definerer openmenu ------------------ //
function openmenu() {
    if (mybtn.style.display != 'block') {
        mybtn.style.display = 'block';
    } else {
        mybtn.style.display = 'none';
    }
    console.log('clicked');
}

// ------------------ Kartinnstillinger ------------------ //
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

// ------------------ Oppretter kart ------------------ //
var map = L.map('map1').setView([37.7749, -122.4194], 5); // Sentrerer på USA

// ------------------ Legger til kartfliser ------------------ //
const tileURL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
L.tileLayer(tileURL, { attribution }).addTo(map);

// ------------------ Definerer showBreweries ------------------ //
async function showBreweries(state) {
    // ------------------ API-kall for bryggeridata ------------------ //
    const api_url = `https://api.openbrewerydb.org/breweries?by_state=${state}`;
    let response = await fetch(api_url);
    let data = await response.json();
    
    // ------------------ Logger data ------------------ //
    console.log(data);
    
    // ------------------ Fjerner markører ------------------ //
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });
    
    // ------------------ Legger til nye markører ------------------ //
    data.forEach(brewery => {
        // Sjekker om bryggeriet har både breddegrad og lengdegrad
        if (brewery.latitude && brewery.longitude) {
            // Konverterer breddegrad og lengdegrad til flyttall for nøyaktighet
            const latitude = parseFloat(brewery.latitude);
            const longitude = parseFloat(brewery.longitude);
            
            // Oppretter en ny markør på kartet ved de gitte koordinatene
            const marker = L.marker([latitude, longitude]).addTo(map);
            
            // Definerer innholdet som skal vises i popup-vinduet for markøren
            const popupContent = `
                <b>${brewery.name}</b><br>           <!-- Bryggeriets navn i fet skrift -->
                ${brewery.street}<br>                <!-- Gateadressen til bryggeriet -->
                ${brewery.city}, ${brewery.state} ${brewery.postal_code}<br> <!-- By, delstat og postnummer -->
                <a href="${brewery.website_url}" target="_blank">${brewery.website_url}</a> <!-- Lenke til bryggeriets nettside -->
            `;
            
            // Binder popup-innholdet til markøren slik at det vises når markøren klikkes
            marker.bindPopup(popupContent);
        }
    });
}

// ------------------ Definerer show_me ------------------ //
function show_me() {
    const state = searchbar.value;
    showBreweries(state);
}

// ------------------ Legger til tastetrykklytter ------------------ //
searchbar.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        show_me();
    }
});
