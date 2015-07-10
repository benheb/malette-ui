
map = L.map('map').setView([32.891, -20], 3);
L.esri.basemapLayer("Gray").addTo(map);

map.scrollWheelZoom.disable();

var geojsonMarkerOptions = {
    radius: 4,
    fillColor: "#999",
    color: "#FFF",
    weight: 0.5,
    opacity: 1,
    fillOpacity: 0.7
};

var layer = L.esri.featureLayer('http://tmservices1.esri.com/arcgis/rest/services/LiveFeeds/NOAA_METAR_current_wind_speed_direction/MapServer/1', {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, geojsonMarkerOptions);
  }
}).addTo(this.map);


var malette = new Malette('map', {});


malette.on('style-change', function( style ){
  console.log('style', style);
  geojsonMarkerOptions.fillColor = style.selectedColor;
  layer.setStyle(geojsonMarkerOptions);
});
