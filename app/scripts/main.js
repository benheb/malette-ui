
this.map = L.map('map').setView([32.891, -20], 3);
L.esri.basemapLayer("Gray").addTo(this.map);

var geojsonMarkerOptions = {
    radius: 4,
    fillColor: "#256e9d",
    color: "#FFF",
    weight: 0.8,
    opacity: 1,
    fillOpacity: 0.7
};

var layer = L.esri.featureLayer('http://services1.arcgis.com/szcgiQwor8m0ZTum/arcgis/rest/services/Earthquakes/FeatureServer/0', {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, geojsonMarkerOptions);
  }
}).addTo(this.map);
