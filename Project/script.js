// Initialize Leaflet map
var map = L.map('map').setView([12.926, 80.1166], 12); // Set initial view to Tambaram

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Define bus stops
var busStops = [
    { name: 'VIT Chennai', location: [12.8817, 80.0782] },
    { name: 'Vandalur Zoo', location: [12.8792, 80.0817] },
    { name: 'Vandalur Railway Station', location: [12.8928, 80.0829] },
    { name: 'Tagore Engineering College', location: [12.8956, 80.0955] },
    { name: 'Perungalathur', location: [12.9287, 80.1094] },
    { name: 'Tambaram Sanatorium Railway Station', location: [12.9442, 80.1217] },
    { name: 'Tambaram', location: [12.926, 80.1166] },
    { name: 'Chromepet', location: [12.9494, 80.1399] },
    { name: 'Pallavaram', location: [12.9717, 80.1504] },
    { name: 'Guindy', location: [13.0081, 80.2208] }
];

// Add markers for bus stops
busStops.forEach(function(stop) {
    L.marker(stop.location).addTo(map).bindPopup(stop.name);
});

// Function to fetch and draw the route using GraphHopper API
function fetchAndDrawRoute(start, end) {
    const apiKey = 'ee1851be-bbba-41a0-b794-edc401b6370f';
    const url = `https://graphhopper.com/api/1/route?point=${start}&point=${end}&vehicle=car&key=${apiKey}`;

    // Make the HTTP request
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Data received:', data);
    //Check if the response contains paths and points
    if (data.paths[0].points_encoded && data.paths[0].instructions) {
        // Parse the response and extract route coordinates
        const routeCoordinates = data.paths[0].instructions;
        console.log('Route coordinates:', routeCoordinates); // Log the route coordinates
        // Draw the route on the map
        const route = L.polyline(routeCoordinates, { color: 'red' }).addTo(map);
    } else {
        throw new Error('Route data structure is invalid');
    }
  })
  
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
}

for (var i = 0; i < busStops.length - 1; i++) {
    var currentStop = busStops[i].location;
    var nextStop = busStops[i + 1].location;
    var polyline = L.polyline([currentStop, nextStop], { 
        color: 'red', // Change color to blue
        weight: 3, // Increase weight for better visibility
        arrowheads: { // Add arrowhead at the end
            fill: true,
            size: '10px',
            frequency: '100%'
        }
    }).addTo(map);
}

// Define start and end points
const start = '12.8817,80.0782'; // VIT Chennai
const end = '13.0081,80.2208'; // Guindy

// Fetch and draw the route
fetchAndDrawRoute(start, end);


function onLocationFound(e) {
    var radius = e.accuracy / 2; // Define radius based on accuracy
    L.marker(e.latlng).addTo(map)
        .bindPopup("You are here").openPopup();
    L.circle(e.latlng, radius).addTo(map); // Add circle representing accuracy
}


// Show error if location detection fails
function onLocationError(e) {
    console.error('Error getting location:', e.message);
    alert('Error getting your location. Please make sure location services are enabled and try again.');
}

// Register location found and error event handlers
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

// Attempt to locate the user's position
map.locate({setView: true, maxZoom: 16});

