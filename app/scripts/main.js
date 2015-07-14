
var map = L.map('map').setView([32.891, -20], 3);
L.esri.basemapLayer("Gray").addTo(map);

map.scrollWheelZoom.disable();
map.dragging.disable();

var style = {
    radius: 4,
    fillColor: "#999",
    color: "#FFF",
    weight: 0.5,
    opacity: 1,
    fillOpacity: 0.7
};

var layer = L.esri.featureLayer('http://tmservices1.esri.com/arcgis/rest/services/LiveFeeds/NOAA_METAR_current_wind_speed_direction/MapServer/1', {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, style);
  }
}).addTo(map);

console.log('layer', layer);

var malette = new Malette('map', {
  style: style,
  format: 'css',
  exportFormat: 'css'
});


malette.on('style-change', function( style ){
  console.log('main map LISTENER style', style);
  layer.setStyle(style);
});