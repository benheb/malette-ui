//! malette.js
//! version : 0.01
//! author : Brendan Heberton
//!license : MIT 
!function(t){"use strict";var e=function(t,e){console.log("init Malette, options: ",e);this.options=e,this.width=e.width||239,this.height=e.height||"auto",this.container=t,this._handlers={},this.state={},this.state._isGraduated=!1,this.state._isTheme=!1,this.format=e.formatIn||"esri-json",this.exportFormat=e.formatOut||"esri-json","esri-json"===this.format?e.style&&(this.style=e.style||{},this.state.fillOpacity=this.style.symbol.color[3],this.style.symbol.color=this._dojoColorToRgba(this.style.symbol.color),this.style.symbol.outline.color=this._dojoColorToRgba(this.style.symbol.outline.color)):e.style&&this._toEsriJson(),this._buildUI(),e.exportStyle===!0&&(this.showExport=!0,this.exportFormat=e.formatOut,this._addExporter())};e.prototype._buildUI=function(){var t=document.getElementById(this.container),e=document.createElement("div");t.appendChild(e).id="malette";var o=document.createElement("div");e.appendChild(o).id="malette-content";var l=document.createElement("div");e.appendChild(l).id="malette-header",l.innerHTML="Malette",this._addTabs(e),this._constructColorRegion(o)},e.prototype._addTabs=function(t){var e=document.createElement("div");t.appendChild(e).id="malette-tab-region",this._createElement("div",e,"malette-color-tab","color","malette-tab malette-tab-selected"),this._createElement("div",e,"malette-size-tab","size","malette-tab"),this._createElement("div",e,"malette-stroke-tab","stroke","malette-tab"),this._createElement("div",e,"malette-opacity-tab","opacity","malette-tab"),this._classEventBuilder("click","malette-tab","_onTabClick")},e.prototype._addExporter=function(){var t=document.getElementById("malette-content"),e=this._createElement("div",t,"malette-export-toggle-container","",""),o=(this._createElement("span",e,"malette-export-toggle-text","Show JSON",""),this._createElement("input",e,"malette-export-toggle","",""));o.type="checkbox";var l=document.getElementById("malette"),s=this._createElement("div",l,"malette-export-container","",""),i=this._createElement("div",s,"malette-export-header","",""),a=this._createElement("input",i,"malette-export-css-toggle","","export-type-toggle");a.type="checkbox","css"===this.exportFormat?a.checked=!0:!1,this._createElement("span",i,"css-out-toggle","CSS","malette-export-label");var r=this._createElement("input",i,"malette-export-esri-toggle","","export-type-toggle");r.type="checkbox","esri-json"===this.exportFormat?r.checked=!0:!1,this._createElement("span",i,"esri-out-toggle","Esri Renderer","malette-export-label");this._createElement("textarea",s,"export-code-block","","code-block");this.selectedExportType=this.exportFormat,this._generateExportStyle(this.exportFormat),this._idEventBuilder("click","malette-export-toggle","_onToggleExportUI"),this._classEventBuilder("click","export-type-toggle","_onExportTypeChange")},e.prototype._addColors=function(t,e){var o,l=["rgb(255,255,255)","rgb(240,240,240)","rgb(217,217,217)","rgb(189,189,189)","rgb(150,150,150)","rgb(115,115,115)","rgb(82,82,82)","rgb(37,37,37)","rgb(247,252,253)","rgb(224,236,244)","rgb(191,211,230)","rgb(158,188,218)","rgb(140,150,198)","rgb(140,107,177)","rgb(136,65,157)","rgb(110,1,107)","rgb(255,247,243)","rgb(253,224,221)","rgb(252,197,192)","rgb(250,159,181)","rgb(247,104,161)","rgb(221,52,151)","rgb(174,1,126)","rgb(122,1,119)","rgb(255,255,204)","rgb(255,237,160)","rgb(254,217,118)","rgb(254,178,76)","rgb(253,141,60)","rgb(252,78,42)","rgb(227,26,28)","rgb(177,0,38)","rgb(255,255,217)","rgb(237,248,177)","rgb(199,233,180)","rgb(127,205,187)","rgb(65,182,196)","rgb(29,145,192)","rgb(34,94,168)","rgb(12,44,132)","rgb(247,252,240)","rgb(224,243,219)","rgb(204,235,197)","rgb(168,221,181)","rgb(123,204,196)","rgb(78,179,211)","rgb(43,140,190)","rgb(8,88,158)","rgb(247,252,253)","rgb(229,245,249)","rgb(204,236,230)","rgb(153,216,201)","rgb(102,194,164)","rgb(65,174,118)","rgb(35,139,69)","rgb(0,88,36)"],s=this._createElement("div",t,"malette-color-palette","",""),i=this._createElement("div",s,"malette-selected-color","Selected color","");o=this._createElement("span",i,"malette-selected-swatch","","malette-color-swatch-selected"),o.style.backgroundColor=e,l.forEach(function(t,e){o=document.createElement("div"),o.style.backgroundColor=t,s.appendChild(o).className="malette-color-swatch"})},e.prototype._addThemes=function(t,e){var o,l=this,s=this._createAttributeSelect();this.themeColors=[["rgb(255,255,255)","rgb(240,240,240)","rgb(217,217,217)","rgb(189,189,189)","rgb(150,150,150)","rgb(115,115,115)","rgb(82,82,82)","rgb(37,37,37)"],["rgb(255,255,217)","rgb(237,248,177)","rgb(199,233,180)","rgb(127,205,187)","rgb(65,182,196)","rgb(29,145,192)","rgb(34,94,168)","rgb(12,44,132)"],["rgb(255,255,229)","rgb(247,252,185)","rgb(217,240,163)","rgb(173,221,142)","rgb(120,198,121)","rgb(65,171,93)","rgb(35,132,67)","rgb(0,90,50)"],["rgb(255,247,251)","rgb(236,226,240)","rgb(208,209,230)","rgb(166,189,219)","rgb(103,169,207)","rgb(54,144,192)","rgb(2,129,138)","rgb(1,100,80)"],["rgb(247,252,253)","rgb(224,236,244)","rgb(191,211,230)","rgb(158,188,218)","rgb(140,150,198)","rgb(140,107,177)","rgb(136,65,157)","rgb(110,1,107)"],["rgb(255,255,204)","rgb(255,237,160)","rgb(254,217,118)","rgb(254,178,76)","rgb(253,141,60)","rgb(252,78,42)","rgb(227,26,28)","rgb(177,0,38)"],["rgb(255,245,235)","rgb(254,230,206)","rgb(253,208,162)","rgb(253,174,107)","rgb(253,141,60)","rgb(241,105,19)","rgb(217,72,1)","rgb(140,45,4)"]];var i=this._createElement("div",t,"malette-theme-palette","","");i.appendChild(s).id="malette-attr-select";var a=this._createElement("div",i,"malette-theme-palette-inner","","");this.themeColors.forEach(function(t,e){var s=l._createElement("div",a,"malette-theme-row-"+e,"","malette-theme-row");a.appendChild(s),t.forEach(function(t){o=document.createElement("div"),o.style.backgroundColor=t,s.appendChild(o).className="malette-theme-swatch"})})},e.prototype._constructColorRegion=function(t){var e=this;t.innerHTML="",this._createElement("div",t,"malette-single-color-option","Single","malette-option-toggle malette-option-toggle-selected"),this.options.fields?this._createElement("div",t,"malette-theme-color-option","Theme","malette-option-toggle"):this._createElement("div",t,"malette-theme-color-option","Theme","malette-option-toggle disabled");var o=this._createElement("div",t,"malatte-color-container","","");this._addColors(o,this.style.symbol.color),this._classEventBuilder("click","malette-color-swatch","_onColorClick"),this._idEventBuilder("click","malette-single-color-option","showSingleColorUI"),this.options.fields&&(this._addThemes(o),this._idEventBuilder("click","malette-theme-color-option","showThemeUI"),console.log("be here now"),this._idEventBuilder("change","malette-attr-select","_onAttributeChange"),this._classEventBuilder("click","malette-theme-row","_onThemeRowClick")),this._selectOption("malette-attr-select","selectedField"),(this.state._isTheme||this.style.visualVariables)&&e.showThemeUI()},e.prototype._addGraduated=function(t){var e=this._createAttributeSelect(),o=this._createElement("div",t,"malette-graduated-palette","","");o.appendChild(e).id="malette-grad-attr-select"},e.prototype._constructSizePalette=function(t){var e=this;t.innerHTML="",this._createElement("div",t,"malette-single-size-option","Single","malette-option-toggle malette-option-toggle-selected"),this.options.fields?this._createElement("div",t,"malette-graduated-size-option","Graduated","malette-option-toggle"):this._createElement("div",t,"malette-graduated-size-option","Graduated","malette-option-toggle disabled");var o=this._createElement("div",t,"malette-size-palette","",""),l=this.style.symbol.size||8,s=document.createElement("input");s.type="range",s.min=1,s.max=30,s.step=1,s.value=l,o.appendChild(s).id="malette-size-slider";this._createElement("div",o,"malette-size-number","Radius: "+l+"px","");this._idEventBuilder("input","malette-size-slider","_onSizeChanged"),this._idEventBuilder("click","malette-single-size-option","showSingleSizeUI"),this.options.fields&&(this._addGraduated(t),this._idEventBuilder("click","malette-graduated-size-option","showGraduatedUI"),this._idEventBuilder("change","malette-grad-attr-select","_onGradAttributeChange")),this._selectOption("malette-grad-attr-select","selectedField"),this.state._isGraduated&&e.showGraduatedUI()},e.prototype._constructStrokePalette=function(t){t.innerHTML="";var e=this.style.symbol.outline.width||.5,o=document.createElement("input");o.type="range",o.min=.5,o.max=20,o.step=.5,o.value=e,t.appendChild(o).id="malette-stroke-slider";var l=this._createElement("div",t,"malette-stroke-width",e+"px","");t.appendChild(l),this._addColors(t,this.style.symbol.outline.color),this._idEventBuilder("input","malette-stroke-slider","_onStrokeWidthChanged"),this._classEventBuilder("click","malette-color-swatch","_onStrokeColorClick")},e.prototype._constructOpacityPalette=function(t){t.innerHTML="";var e=this.state.fillOpacity/255||.7,o=document.createElement("input");o.type="range",o.min=.1,o.max=1,o.step=.1,o.value=e,t.appendChild(o).id="malette-opacity-slider";var l=this._createElement("div",t,"malette-opacity-number","Opacity: "+100*e+"%","");t.appendChild(l),this._idEventBuilder("input","malette-opacity-slider","_onOpacityChanged")},e.prototype._createElement=function(t,e,o,l,s){var i=document.createElement(t);return e.appendChild(i).id=o,i.innerHTML=l,document.getElementById(o).className=s,i},e.prototype._createAttributeSelect=function(){for(var t=document.createElement("select"),e=0;e<this.options.fields.length;e++)if(("esriFieldTypeDouble"===this.options.fields[e].type||"esriFieldTypeInteger"===this.options.fields[e].type||"esriFieldTypeSingle"===this.options.fields[e].type)&&this.options.fields[e].statistics&&this.options.fields[e].statistics.max){var o=document.createElement("option");o.setAttribute("value",this.options.fields[e].type),o.setAttribute("id",this.options.fields[e].name.replace(/ /g,"")),o.appendChild(document.createTextNode(this.options.fields[e].name)),t.appendChild(o)}return t},e.prototype._selectOption=function(t,e){if(this.state[e]){for(var o=0,l=document.getElementById(t),s=0;s<l.length;s++)l.options[s].text===this.state[e].replace(/ /g,"")&&(o=l.options[s].index);document.getElementById(t).getElementsByTagName("option")[o].selected="selected"}},e.prototype._classEventBuilder=function(t,e,o){console.log("class event builder!");for(var l=this,s=document.getElementsByClassName(e),i=0;i<s.length;i++)s[i].addEventListener?s[i].addEventListener(t,function(t){l[o].call(l,t)}):s[i].attachEvent("on"+t,function(t){l[o].call(l,t)})},e.prototype._idEventBuilder=function(t,e,o){console.log("id event builder!");var l=this,s=document.getElementById(e);s.addEventListener?s.addEventListener(t,function(t){l[o].call(l,t)}):s.attachEvent("on"+t,function(t){l[o].call(l,t)})},e.prototype.changeTab=function(t){var e=document.getElementById("malette-content");switch(t){case"color":this._constructColorRegion(e);break;case"size":this._constructSizePalette(e);break;case"stroke":this._constructStrokePalette(e);break;case"opacity":this._constructOpacityPalette(e);break;default:this._constructColorRegion(e)}},e.prototype.classify=function(t){var e=this.options.fields,o=8,l=[];return e.forEach(function(e){if(e.name===t)for(var s=(e.statistics.max-e.statistics.min)/o,i=0;o>=i;i++)l.push(e.statistics.min+s*i)}),l},e.prototype.setTheme=function(t,e){var o=this;this.state.selectedField=e?e:this.state.selectedField,t||this.selectedRamp?!t&&this.selectedRamp&&(t=this.selectedRamp):t=[[255,247,251,this.state.fillOpacity],[236,226,240,this.state.fillOpacity],[208,209,230,this.state.fillOpacity],[166,189,219,this.state.fillOpacity],[103,169,207,this.state.fillOpacity],[54,144,192,this.state.fillOpacity],[2,129,138,130],[1,100,80,this.state.fillOpacity]],this.selectedRamp=t?t:this.selectedRamp,console.log("here",this.state.fillOpacity),this.selectedRamp.forEach(function(t,e){console.log("self.state.fillOpacity",o.state.fillOpacity),o.selectedRamp[e][3]=o.state.fillOpacity}),console.log("post here",this.selectedRamp);var l=this.classify(this.state.selectedField);this.style.visualVariables=[{type:"colorInfo",field:this.state.selectedField,stops:[{value:l[0],color:this.selectedRamp[0],label:null},{value:l[1],color:this.selectedRamp[1],label:null},{value:l[2],color:this.selectedRamp[2],label:null},{value:l[3],color:this.selectedRamp[3],label:null},{value:l[4],color:this.selectedRamp[4],label:null},{value:l[5],color:this.selectedRamp[5],label:null},{value:l[6],color:this.selectedRamp[6],label:null},{value:l[7],color:this.selectedRamp[7],label:null}]}],this.updateStyle()},e.prototype.setGraduated=function(t){this.state.selectedField=t?t:this.state.selectedField;var e=this.classify(this.state.selectedField);this.style.type="classBreaks",this.style.field=this.state.selectedField,this.style.minValue=1,this.style.classBreakInfos=[{symbol:{color:this._rgbaToDojoColor(this.style.symbol.color),size:4,xoffset:0,yoffset:0,type:"esriSMS",style:"esriSMSCircle",outline:{color:this._rgbaToDojoColor(this.style.symbol.outline.color),width:this.style.symbol.outline.width,type:"esriSLS",style:"esriSLSSolid"}},label:e[0],classMaxValue:e[0]},{symbol:{color:this._rgbaToDojoColor(this.style.symbol.color),size:10,xoffset:0,yoffset:0,type:"esriSMS",style:"esriSMSCircle",outline:{color:this._rgbaToDojoColor(this.style.symbol.outline.color),width:this.style.symbol.outline.width,type:"esriSLS",style:"esriSLSSolid"}},label:"> "+e[0]+" to "+e[1],classMaxValue:e[1]},{symbol:{color:this._rgbaToDojoColor(this.style.symbol.color),size:16,xoffset:0,yoffset:0,type:"esriSMS",style:"esriSMSCircle",outline:{color:this._rgbaToDojoColor(this.style.symbol.outline.color),width:this.style.symbol.outline.width,type:"esriSLS",style:"esriSLSSolid"}},label:"> "+e[1]+" to "+e[2],classMaxValue:e[2]},{symbol:{color:this._rgbaToDojoColor(this.style.symbol.color),size:22,xoffset:0,yoffset:0,type:"esriSMS",style:"esriSMSCircle",outline:{color:this._rgbaToDojoColor(this.style.symbol.outline.color),width:this.style.symbol.outline.width,type:"esriSLS",style:"esriSLSSolid"}},label:"> "+e[2]+" to "+e[3],classMaxValue:e[3]},{symbol:{color:this._rgbaToDojoColor(this.style.symbol.color),size:30,xoffset:0,yoffset:0,type:"esriSMS",style:"esriSMSCircle",outline:{color:this._rgbaToDojoColor(this.style.symbol.outline.color),width:this.style.symbol.outline.width,type:"esriSLS",style:"esriSLSSolid"}},label:"> "+e[3]+" to "+e[4],classMaxValue:e[4]}],this.updateStyle()},e.prototype.clearTheme=function(){this.style.visualVariables=null,this.updateStyle()},e.prototype.clearGraduated=function(){this.style.type="simple",this.style.field=null,this.style.minValue=1,this.style.classBreakInfos=null,this.updateStyle()},e.prototype.showThemeUI=function(){document.getElementById("malette-theme-palette").style.display="block",document.getElementById("malette-color-palette").style.display="none",document.getElementById("malette-single-color-option").className="malette-option-toggle",document.getElementById("malette-theme-color-option").className="malette-option-toggle malette-option-toggle-selected",this.state._isTheme=!0;var t=document.getElementById("malette-attr-select").selectedIndex,e=document.getElementById("malette-attr-select")[t].innerHTML;this.setTheme(null,e)},e.prototype.showSingleColorUI=function(){document.getElementById("malette-theme-palette").style.display="none",document.getElementById("malette-color-palette").style.display="block",document.getElementById("malette-single-color-option").className="malette-option-toggle malette-option-toggle-selected",document.getElementById("malette-theme-color-option").className="malette-option-toggle",this.state._isTheme=!1,this.clearTheme()},e.prototype.showGraduatedUI=function(){document.getElementById("malette-graduated-palette").style.display="block",document.getElementById("malette-size-palette").style.display="none",document.getElementById("malette-single-size-option").className="malette-option-toggle",document.getElementById("malette-graduated-size-option").className="malette-option-toggle malette-option-toggle-selected",this.state._isGraduated=!0;var t=document.getElementById("malette-grad-attr-select").selectedIndex,e=document.getElementById("malette-grad-attr-select")[t].innerHTML;this.setGraduated(e)},e.prototype.showSingleSizeUI=function(){document.getElementById("malette-graduated-palette").style.display="none",document.getElementById("malette-size-palette").style.display="block",document.getElementById("malette-single-size-option").className="malette-option-toggle malette-option-toggle-selected",document.getElementById("malette-graduated-size-option").className="malette-option-toggle",this.state._isGraduated=!1,this.clearGraduated()},e.prototype.toggleExportUI=function(t){t.target.checked===!0?(document.getElementById("malette-export-container").style.visibility="visible",document.getElementById("malette-export-toggle-text").innerHTML="Hide JSON"):(document.getElementById("malette-export-container").style.visibility="hidden",document.getElementById("malette-export-toggle-text").innerHTML="Show JSON")},e.prototype.changeExportType=function(t){for(var e=document.getElementsByClassName("export-type-toggle"),o=0;o<e.length;o++)document.getElementsByClassName("export-type-toggle")[o].checked=!1;t.target.checked=!0;var l=t.target.id;"malette-export-esri-toggle"===l?(this.selectedExportType="esri-json",this._generateExportStyle("esri-json")):"malette-export-css-toggle"===l&&(this.selectedExportType="css",this._generateExportStyle("css"))},e.prototype.setSelectedColor=function(t){this.style.symbol.color=t;var e=document.getElementById("malette-selected-swatch");e.style.backgroundColor=this.style.symbol.color,this.state._isGraduated?this.setGraduated():this.updateStyle()},e.prototype.setSelectedThemeRow=function(t){var e=this,o=parseInt(t.target.id.replace(/malette-theme-row-/g,"")),l=[];this.themeColors[o].forEach(function(t){var o=e._rgbaToDojoColor(t);l.push(o)}),this.setTheme(l)},e.prototype.setSelectedStrokeColor=function(t){this.style.symbol.outline.color=t;var e=document.getElementById("malette-selected-swatch");e.style.backgroundColor=this.style.symbol.outline.color,this.state._isGraduated?this.setGraduated():this.updateStyle()},e.prototype.setSelectedSize=function(t){this.style.symbol.size=parseInt(t);var e=document.getElementById("malette-size-number");e.innerHTML="Radius: "+t+"px",this.updateStyle()},e.prototype.setStrokeWidth=function(t){this.style.symbol.outline.width=parseFloat(t);var e=document.getElementById("malette-stroke-width");e.innerHTML=t+"px",this.state._isGraduated?this.setGraduated():this.updateStyle(),this.state._isTheme?this.setTheme():this.updateStyle()},e.prototype.setOpacity=function(t){this.state.fillOpacity=255*parseFloat(t);var e=document.getElementById("malette-opacity-number");e.innerHTML="Opacity: "+100*t+"%",this.state._isGraduated?this.setGraduated():this.state._isTheme?this.setTheme():this.updateStyle()},e.prototype._dojoColorToRgba=function(t){var e="rgba("+t[0]+","+t[1]+","+t[2]+","+t[3]+")";return e},e.prototype._rgbaToDojoColor=function(t,e){var o;if(e||(e=255),Array.isArray(t))return o=t,o[3]=e,o;var o=t.split(",");return[parseInt(o[0].replace(/[^0-9]/g,"")),parseInt(o[1]),parseInt(o[2]),e]},e.prototype._toEsriJson=function(){"css"===this.format&&(this.style={type:"simple",symbol:{}},this.style.symbol.color=this.options.style.fillColor?this.options.style.fillColor:"rgba(202,58,45,130)",this.style.symbol.size=this.options.style.radius?this.options.style.radius:8,this.style.symbol.outline={},this.style.symbol.outline.width=this.options.style.weight||1,this.style.symbol.outline.color=[this.options.style.color]||"rgba(255,255,255,255",this.state.fillOpacity=this.options.style.fillOpacity?255*this.options.style.fillOpacity:255)},e.prototype._toCss=function(t){var e={};e.fillColor=this.style.symbol.color,e.weight=this.style.symbol.outline.width,e.color=this.style.symbol.outline.color,e.radius=this.style.symbol.size,e.fillOpacity=this.state.fillOpacity/255,t(e)},e.prototype.updateStyle=function(){var t=this;"esri-json"===this.exportFormat?(this.style.symbol&&(this.style.symbol.color=this._rgbaToDojoColor(this.style.symbol.color,this.state.fillOpacity),this.style.symbol.outline.color=this._rgbaToDojoColor(this.style.symbol.outline.color)),console.log("emit --->>>",this.style),this.emit("style-change",this.style)):"css"===this.exportFormat&&this._toCss(function(e){t.emit("style-change",e)}),this._generateExportStyle()},e.prototype._generateExportStyle=function(t){t=t||this.selectedExportType,"esri-json"===t?(console.log("this.style.symbol.color",this.style.symbol.color),console.log("fillOpacity",this.state.fillOpacity),this.style.symbol.color=this._rgbaToDojoColor(this.style.symbol.color,this.state.fillOpacity),this.style.symbol.outline.color=this._rgbaToDojoColor(this.style.symbol.outline.color),document.getElementById("export-code-block").innerHTML=JSON.stringify(this.style,null,2)):"css"===t&&this._toCss(function(t){document.getElementById("export-code-block").innerHTML=JSON.stringify(t,null,2)})},e.prototype.on=function(t,e){this._handlers[t]=e},e.prototype.emit=function(t,e){this._handlers[t]&&this._handlers[t](e)},e.prototype._onColorClick=function(t){1!==t.which||t.metaKey||t.ctrlKey||(t.preventDefault(),this.setSelectedColor(t.target.style.backgroundColor))},e.prototype._onThemeRowClick=function(t){t.preventDefault(),this.setSelectedThemeRow(t)},e.prototype._onAttributeChange=function(t){var e=document.getElementById("malette-attr-select").selectedIndex,o=document.getElementById("malette-attr-select")[e].innerHTML;this.state.selectedField=o,this.setTheme(null,o),console.log("on attr change!",this._isGraduated),this.state._isGraduated&&this.setGraduated(o)},e.prototype._onGradAttributeChange=function(t){var e=document.getElementById("malette-grad-attr-select").selectedIndex,o=document.getElementById("malette-grad-attr-select")[e].innerHTML;this.state.selectedField=o,this.setGraduated(o),this.state._isTheme&&this.setTheme(null,o)},e.prototype._onStrokeColorClick=function(t){1!==t.which||t.metaKey||t.ctrlKey||(t.preventDefault(),this.setSelectedStrokeColor(t.target.style.backgroundColor))},e.prototype._onSizeChanged=function(t){t.preventDefault(),this.setSelectedSize(t.target.value)},e.prototype._onStrokeWidthChanged=function(t){t.preventDefault(),this.setStrokeWidth(t.target.value)},e.prototype._onOpacityChanged=function(t){t.preventDefault(),this.setOpacity(t.target.value)},e.prototype._onToggleExportUI=function(t){this.toggleExportUI(t)},e.prototype._onExportTypeChange=function(t){this.changeExportType(t)},e.prototype._onTabClick=function(t){if(1===t.which&&!t.metaKey&&!t.ctrlKey){t.preventDefault();for(var e=document.getElementsByClassName("malette-tab"),o=0;o<e.length;o++)e[o].classList.remove("malette-tab-selected");t.target.classList.add("malette-tab-selected"),this.changeTab(t.target.innerHTML)}},t.Malette=e}(window);