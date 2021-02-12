//store API 
var magnitudeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_hour.geojson"

var myMap = L.map("map", {
    center: [35.2271, -80.8431],
    zoom: 2
  });

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
}).addTo(myMap);


L.control.layers(baseMaps, overlayMaps).addTo(myMap);

d3.json(magnitudeURL, function(earthquakeData) {
    function markerSize(magnitude) {
        if (magnitude === 0) {
          return 1;
        }
        return magnitude * 3;
    }
    // Function to Determine Style of Marker Based on the Magnitude of the Earthquake
    function styleInfo(feature) {
        return {
          opacity: 1,
          fillOpacity: 1,
          fillColor: chooseColor(feature.properties.mag),
          color: "#000000",
          radius: markerSize(feature.properties.mag),
          stroke: true,
          weight: 0.5
        };
    }
    // create marker based on magnitude 
    function chooseColor(magnitude) {
        switch (true) {
        case magnitude > 5:
            return "#581845";
        case magnitude > 4:
            return "#900C3F";
        case magnitude > 3:
            return "#C70039";
        case magnitude > 2:
            return "#FF5733";
        case magnitude > 1:
            return "#FFC300";
        default:
            return "#DAF7A6";
        }
    }
    var earthquakes = L.geoJSON(earthquakeData, {
        pointToLayer: function(earthquakeData, latlng) 
          returnL.circle(latlng), {
            radius: radiusSize(earthquakeData.properties.mag),
            color: circleColor(earthquakeData.properties.mag),
            fillOpacity: 1
          },
        onEachFeature: onEachFeature
      }).addTo(myMap);