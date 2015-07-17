

require(["esri/map", "esri/layers/FeatureLayer", "esri/renderers/SimpleRenderer", "esri/renderers/ClassBreaksRenderer", "esri/renderers/jsonUtils", "dojo/domReady!"], 
  function(Map, FeatureLayer, SimpleRenderer, ClassBreaksRenderer, jsonUtils) { 
    var map = new Map("map", {
      center: [10, 27.5],
      zoom: 3,
      basemap: "gray",
      smartNavigation: false
    });

    map.on('load', function() {
      map.disableScrollWheelZoom();
    });

    var layer = new FeatureLayer('http://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Cities/FeatureServer/0', {
      mode: FeatureLayer.MODE_ONDEMAND,
      outFields: ['*']
    });

    map.addLayer(layer);

    layer.on('load', function() {
      console.log('layer', layer.renderer);
      var simpleJson = {
          "type": "simple",
          "label": "",
          "description": "",
          "symbol": {
            "color": [
              180,
              180,
              180,
              153
            ],
            "size": 4,
            "angle": 0,
            "xoffset": 0,
            "yoffset": 0,
            "type": "esriSMS",
            "style": "esriSMSCircle",
            "outline": {
              "color": [
                115,
                115,
                115,
                255
              ],
              "width": 0.2,
              "type": "esriSLS",
              "style": "esriSLSSolid"
            }
          },
          "visualVariables": [
            {
              "type": "colorInfo",
              "field": "POP_RANK",
              "stops": [
                {
                  "value": 1,
                  "color": {
                    "r": 255,
                    "g": 255,
                    "b": 217,
                    "a": 0.6
                  },
                  "label": null
                },
                {
                  "value": 1.75,
                  "color": {
                    "r": 237,
                    "g": 248,
                    "b": 177,
                    "a": 0.6
                  },
                  "label": null
                },
                {
                  "value": 2.5,
                  "color": {
                    "r": 199,
                    "g": 233,
                    "b": 180,
                    "a": 0.6
                  },
                  "label": null
                },
                {
                  "value": 3.25,
                  "color": {
                    "r": 127,
                    "g": 205,
                    "b": 187,
                    "a": 0.6
                  },
                  "label": null
                },
                {
                  "value": 4,
                  "color": {
                    "r": 65,
                    "g": 182,
                    "b": 196,
                    "a": 0.6
                  },
                  "label": null
                },
                {
                  "value": 4.75,
                  "color": {
                    "r": 29,
                    "g": 145,
                    "b": 192,
                    "a": 0.6
                  },
                  "label": null
                },
                {
                  "value": 5.5,
                  "color": {
                    "r": 34,
                    "g": 94,
                    "b": 168,
                    "a": 0.6
                  },
                  "label": null
                },
                {
                  "value": 6.25,
                  "color": {
                    "r": 12,
                    "g": 44,
                    "b": 132,
                    "a": 0.6
                  },
                  "label": null
                }
              ]
            }
          ],
          "field": null,
          "minValue": 1,
          "classBreakInfos": null
        }
      var rend = jsonUtils.fromJson(simpleJson);
      layer.setRenderer(rend);
      
      $.getJSON('http://opendata.arcgis.com/datasets/6996f03a1b364dbab4008d99380370ed_0.json', function(res) {
              
        var fields = res.data.fields;
        malette = new Malette('map', {
          style: simpleJson,
          formatIn: 'esri-json',
          formatOut: 'esri-json',
          fields: fields,
          type: 'point',
          exportStyle: true
        });

        malette.on('style-change', function( style ){
          var rend = jsonUtils.fromJson(style);
          layer.setRenderer(rend);
          layer.redraw();
        });

      });

    });
});

/*
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
  formatIn: 'css',
  formatOut: 'css'
});


malette.on('style-change', function( style ){
  layer.setStyle(style);
});
*/