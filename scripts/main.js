var map=L.map("map").setView([32.891,-20],3);L.esri.basemapLayer("Gray").addTo(map),map.scrollWheelZoom.disable(),map.dragging.disable();var style={radius:4,fillColor:"#999",color:"#FFF",weight:.5,opacity:1,fillOpacity:.7},layer=L.esri.featureLayer("http://tmservices1.esri.com/arcgis/rest/services/LiveFeeds/NOAA_METAR_current_wind_speed_direction/MapServer/1",{pointToLayer:function(e,a){return L.circleMarker(a,style)}}).addTo(map);console.log("layer",layer);var malette=new Malette("map",{style:style,formatIn:"css",formatOut:"css"});malette.on("style-change",function(e){layer.setStyle(e)});