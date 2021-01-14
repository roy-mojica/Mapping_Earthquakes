// Add console.log to check to see if our code is working. 
console.log("working");

// Create the map object with a center and zoom level. 
// let map = L.map('mapid').setView([30, 30], 2);

// // Coordinates for each point to be used in the line.
// let line = [
//     [37.6213, -122.3790],
//     [30.1975, -97.6664],
//     [43.6777, -79.6248],
//     [40.6413, -73.7781]
// ];

//   // Create a polyline using the line coordinates and make the line red.
// L.polyline(line, {
//     color: "blue",
//     weight: "4",
//     opacity: "0.5",
//     dashArray: "20, 20",
//     dashOffset: "20"
// }).addTo(map);

// //  Add a marker to the map for Los Angeles, California.
// let marker = L.marker([34.0522, -118.2437]).addTo(map);

// //  Add a circle to the map for Los Angeles, California.
// L.circleMarker([34.0522, -118.2437], {
//     color: 'black',
//     fillColor: 'lightyellow',
//     radius: 300
//  }).addTo(map);

// // Get Data from cities.js
// let cityData = cities;

// // Loop through the cities array and create one marker for each city. 
// cityData.forEach(function(city) {
//     console.log(city)
//     L.circleMarker(city.location, {
//         radius: (city.population/100000),
//         color: 'orange'
//     })
//     .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>").addTo(map);
// });

// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

// // Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport, {
//     // We turn each feature into a marker on the map.
//     pointToLayer: function(feature, latlng) {
//         console.log(feature);
//         return L.marker(latlng)
//         .bindPopup("<h2>" + feature.properties.name + "</h2> <br>" + "<h3>" + feature.properties.city + "," + feature.properties.country + "</h3>")
//     }
// }).addTo(map);

// L.geoJSON(sanFranAirport, {
//     onEachFeature: function(feature, layer) {
//         console.log(layer);
//         layer.bindPopup("<h2>" + 'Airport code:' + feature.properties.faa + "</h2> <br>" + "<h3>" + feature.properties.name + "</h3>");
//     }
// }).addTo(map);

// We create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps. 
let baseMaps = {
    Light: light,
    Dark: dark
};

// Create the map object with a center and zoom level. 
let map = L.map('mapid', {
    center: [44.0, -80.0],
    zoom: 2,
    layers: [dark]
})

// Pass our map layer into our layer control and add the layers control to the map. 
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/roy-mojica/Mapping_Earthquakes/Mapping_GeoJSON_Points/majorAirports.json";

// Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/roy-mojica/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/torontoRoutes.json";

// // Grabbing our GeoJSON data.
// d3.json(airportData).then(function(data) {
//     console.log(data);
//   // Creating a GeoJSON layer with the retrieved data.
//   L.geoJson(data, {
//       onEachFeature: function(feature, layer) {
//           console.log(layer);
//           layer.bindPopup("<h2>" + 'Airport code:' + feature.properties.faa + "</h2> <br>" + "<h3>" + 'Aireport name: ' + feature.properties.name + "</h3>")
//       }
//   }).addTo(map);
// });

// Create a style for the lines.
let myStyle = {
    color: "#ffffa1",
    weight: 2
}

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
        style: myStyle,
        onEachFeature: function(feature, layer) {
          layer.bindPopup("<h2>" + 'Airline:' + feature.properties.airline + "</h2> <br>" + "<h3>" + 'Destination: ' + feature.properties.dst + "</h3>")
      }
  }).addTo(map);
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);