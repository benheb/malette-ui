//! malette.js
//! version : 0.01
//! author : Brendan Heberton
//!license : MIT 
(function(window){
  'use strict';

  var Malette = function Malette( container, options ) {
    console.log('init Malette, options: ', options);

    //store options 
    this.options = options;

    //UI defaults 
    this.width = options.width || 239;
    this.height = options.height || 'auto';
    this.container = container;
    this._handlers = {};
        
    this.layer = options.layer || null;

    //style params 
    this.format = options.formatIn || 'esri-json';
    this.exportFormat = options.formatOut || 'esri-json';

    if ( this.format === 'esri-json' ) {
      if ( options.style ) {
        
        this.style = options.style || {};
        this.fillOpacity = this.style.symbol.color[3];
        this.style.symbol.color = this._dojoColorToRgba( this.style.symbol.color ); //helper for colors, etc

      } else {
        //TODO 
        //create default esri json 
      }
    } else {
      if ( options.style ) {
        this._toEsriJson();
      }
    }

    //initialize 
    this._buildUI();

  };


  /************* UI **************/

  /*
  * Builds the main container for Malette, appends a header and tile; 
  *
  */
  Malette.prototype._buildUI = function() {

    var container = document.getElementById( this.container );
    var innerContainer = document.createElement( 'div' );
    container.appendChild( innerContainer ).id = 'malette';

    var content = document.createElement( 'div' );
    innerContainer.appendChild( content ).id = 'malette-content';

    var header = document.createElement( 'div' );
    innerContainer.appendChild( header ).id = 'malette-header';
    header.innerHTML = 'Malette';

    this._addTabs(innerContainer);
    this._constructSingleColorPalette(content);

  }



  /*
  * Builds the navigation tabs 
  * Default: Color, Size
  *
  */
  Malette.prototype._addTabs = function(el) {
    var self = this;

    var tabRegion = document.createElement( 'div' );
    el.appendChild( tabRegion ).id = 'malette-tab-region';

    this._createElement('div', tabRegion, 'malette-color-tab', 'color', 'malette-tab malette-tab-selected');
    this._createElement('div', tabRegion, 'malette-size-tab', 'size', 'malette-tab');
    this._createElement('div', tabRegion, 'malette-stroke-tab', 'stroke', 'malette-tab');
    this._createElement('div', tabRegion, 'malette-opacity-tab', 'opacity', 'malette-tab');

    //Color Ramp Handlers
    var linkEl = document.getElementsByClassName( 'malette-tab' );
    for(var i=0;i<linkEl.length;i++){
      if(linkEl[i].addEventListener){
        linkEl[i].addEventListener('click', function(e) { self._onTabClick.call(self, e) });
      } else {
        linkEl[i].attachEvent('onclick', function(e) { self._onTabClick.call(self, e) });
      }
    }
    
  }



  /*
  * Color tab UI 
  *
  *
  */
  Malette.prototype._constructSingleColorPalette = function(el) {

    el.innerHTML = '';
    var swatch;
    var colors = [
      'rgb(255,255,255)','rgb(240,240,240)','rgb(217,217,217)','rgb(189,189,189)','rgb(150,150,150)','rgb(115,115,115)','rgb(82,82,82)','rgb(37,37,37)',
      'rgb(247,252,253)','rgb(224,236,244)','rgb(191,211,230)','rgb(158,188,218)','rgb(140,150,198)','rgb(140,107,177)','rgb(136,65,157)','rgb(110,1,107)',
      'rgb(255,247,243)','rgb(253,224,221)','rgb(252,197,192)','rgb(250,159,181)','rgb(247,104,161)','rgb(221,52,151)','rgb(174,1,126)','rgb(122,1,119)',
      'rgb(255,255,204)','rgb(255,237,160)','rgb(254,217,118)','rgb(254,178,76)','rgb(253,141,60)','rgb(252,78,42)','rgb(227,26,28)','rgb(177,0,38)',
      'rgb(255,255,217)','rgb(237,248,177)','rgb(199,233,180)','rgb(127,205,187)','rgb(65,182,196)','rgb(29,145,192)','rgb(34,94,168)','rgb(12,44,132)',
      'rgb(247,252,240)','rgb(224,243,219)','rgb(204,235,197)','rgb(168,221,181)','rgb(123,204,196)','rgb(78,179,211)','rgb(43,140,190)','rgb(8,88,158)',
      'rgb(247,252,253)','rgb(229,245,249)','rgb(204,236,230)','rgb(153,216,201)','rgb(102,194,164)','rgb(65,174,118)','rgb(35,139,69)','rgb(0,88,36)'
    ];

    this._createElement('div', el, 'malette-single-color-option', 'Single', 'malette-option-toggle malette-option-toggle-selected');
    
    if ( this.layer ) {
      this._createElement('div', el, 'malette-theme-color-option', 'Theme', 'malette-option-toggle');
    } else {
      this._createElement('div', el, 'malette-theme-color-option', 'Theme', 'malette-option-toggle disabled');
    }

    var colorPalette = this._createElement('div', el, 'malette-color-palette', '', '');

    var selectedColor = this._createElement('div', colorPalette, 'malette-selected-color', 'Selected color', '');
    swatch = this._createElement('span', selectedColor, 'malette-selected-swatch', '', 'malette-color-swatch-selected');
    swatch.style.backgroundColor = this.style.symbol.color;

    colors.forEach(function(color, i) {
      swatch = document.createElement( 'div' );
      swatch.style.backgroundColor = color;
      colorPalette.appendChild( swatch ).className = 'malette-color-swatch';
    }); 

    this._wireEvents();
  }


  /*
  * Size tab UI
  *
  *
  */
  Malette.prototype._constructSizePalette = function(el) {
    var self = this;

    el.innerHTML = '';

    this._createElement('div', el, 'malette-single-size-option', 'Single', 'malette-option-toggle malette-option-toggle-selected');
    if ( this.layer ) {
      this._createElement('div', el, 'malette-graduated-size-option', 'Graduated', 'malette-option-toggle');
    } else {
      this._createElement('div', el, 'malette-graduated-size-option', 'Graduated', 'malette-option-toggle disabled');
    }

    var size = this.style.symbol.size || 8; 

    var slider = document.createElement( 'input' );
    slider.type = 'range';
    slider.min = 1;
    slider.max = 30;
    slider.step = 1;
    slider.value = size;
    el.appendChild( slider ).id = 'malette-size-slider';

    var sizeNumber = this._createElement('div', el, 'malette-size-number', 'Radius: '+size+'px', '');
    el.appendChild( sizeNumber );

    //change event 
    var linkEl = document.getElementById( 'malette-size-slider' );
    if(linkEl.addEventListener){
      linkEl.addEventListener('input', function(e) { self._onSizeChanged.call(self, e) });
    } else {
      linkEl.attachEvent('onchange', function(e) { self._onSizeChanged.call(self, e) });
    }

  }



  /*
  * Stroke tab UI
  *
  *
  */
  Malette.prototype._constructStrokePalette = function(el) {
    var self = this;

    el.innerHTML = '';

    var width = this.style.symbol.outline.width || 0.5; 

    var slider = document.createElement( 'input' );
    slider.type = 'range';
    slider.min = 0.5;
    slider.max = 20;
    slider.step = 0.5;
    slider.value = width;
    el.appendChild( slider ).id = 'malette-stroke-slider';

    var sizeNumber = this._createElement('div', el, 'malette-stroke-width', 'Stroke width: '+width+'px', '');
    el.appendChild( sizeNumber );

    //change event 
    var linkEl = document.getElementById( 'malette-stroke-slider' );
    if(linkEl.addEventListener){
      linkEl.addEventListener('input', function(e) { self._onStrokeWidthChanged.call(self, e) });
    } else {
      linkEl.attachEvent('onchange', function(e) { self._onStrokeWidthChanged.call(self, e) });
    }

  }




  /*
  * Opacity tab UI
  *
  *
  */
  Malette.prototype._constructOpacityPalette = function(el) {
    var self = this;

    el.innerHTML = '';

    var opacity = (this.fillOpacity / 255) || 0.7; 

    var slider = document.createElement( 'input' );
    slider.type = 'range';
    slider.min = 0.1;
    slider.max = 1;
    slider.step = 0.1;
    slider.value = opacity;
    el.appendChild( slider ).id = 'malette-opacity-slider';

    var sizeNumber = this._createElement('div', el, 'malette-opacity-number', 'Opacity: '+(opacity * 100)+'%', '');
    el.appendChild( sizeNumber );

    //change event 
    var linkEl = document.getElementById( 'malette-opacity-slider' );
    if(linkEl.addEventListener){
      linkEl.addEventListener('input', function(e) { self._onOpacityChanged.call(self, e) });
    } else {
      linkEl.attachEvent('onchange', function(e) { self._onOpacityChanged.call(self, e) });
    }

  }




  /*
  * creates a generic element, and appends to 'parent' div 
  *
  */
  Malette.prototype._createElement = function(type, parent, id, html, className ) {

    var el = document.createElement( type ); 
    parent.appendChild( el ).id = id;
    el.innerHTML = html;
    document.getElementById( id ).className = className;

    return el;
  }



  /************* WIRE **************/



  /*
  *
  *
  */
  Malette.prototype._wireEvents = function() {
    var self = this;
    
    //Color Ramp Handlers
    var linkEl = document.getElementsByClassName( 'malette-color-swatch' );
    for(var i=0;i<linkEl.length;i++){
      if(linkEl[i].addEventListener){
        linkEl[i].addEventListener('click', function(e) { self._onColorClick.call(self, e) });
      } else {
        linkEl[i].attachEvent('onclick', function(e) { self._onColorClick.call(self, e) });
      }
    }

  }



  /************* METHODS **************/



  Malette.prototype.changeTab = function(tab) {
    console.log('tab', tab);
    var el = document.getElementById('malette-content');

    switch(tab) {
      case 'color': 
        this._constructSingleColorPalette(el);
        break;
      case 'size': 
        this._constructSizePalette(el);
        break;
      case 'stroke': 
        this._constructStrokePalette(el);
        break;
      case 'opacity': 
        this._constructOpacityPalette(el);
        break;
      default: 
        this._constructSingleColorPalette(el);
    }

  }



  Malette.prototype.setSelectedColor = function(color) {

    this.style.symbol.color = color;
    var swatch = document.getElementById( 'malette-selected-swatch' );
    swatch.style.backgroundColor = this.style.symbol.color;

    this._updateStyle();
  }



  Malette.prototype.setSelectedSize = function(size) {
    this.style.symbol.size = parseInt(size);
    var el = document.getElementById( 'malette-size-number' );
    el.innerHTML = 'Radius: ' + size + 'px';
    this._updateStyle();
  }



  Malette.prototype.setStrokeWidth = function(width) {
    this.style.symbol.outline.width = parseFloat(width);
    var el = document.getElementById( 'malette-stroke-width' );
    el.innerHTML = 'Stroke width: ' + width + 'px';
    this._updateStyle();
  }


  Malette.prototype.setOpacity = function(opacity) {
    this.fillOpacity = parseFloat(opacity) * 255;
    var el = document.getElementById( 'malette-opacity-number' );
    el.innerHTML = 'Opacity: ' + (opacity*100) + '%';
    this._updateStyle();
  }



  //helpers 
  Malette.prototype._dojoColorToRgba = function(c) {
    var color = 'rgba('+c[0]+','+c[1]+','+c[2]+','+c[3]+')';
    return color;
  }


  Malette.prototype._rgbaToDojoColor = function(c, opacity) {
    var color;
    if ( Array.isArray(c) ) {
      color = c;
      color[3] = opacity;
      return color;
    } else {
      var color = c.split(',');
      return [ parseInt(color[0].replace(/[^0-9]/g, '')), parseInt(color[1]), parseInt(color[2]), opacity ];
    }
  }


  /*
  * Convert various style inputs to esri-json which is used in Malette 
  * 
  *
  */ 
  Malette.prototype._toEsriJson = function() {

    if ( this.format === 'css' ) {
      this.style = {
        type: 'simple',
        symbol: {}
      };
      this.style.symbol.color = (this.options.style.fillColor) ? this.options.style.fillColor : 'rgba(202,58,45,130)';
      this.style.symbol.size = ( this.options.style.radius ) ? this.options.style.radius : 8;
      this.style.symbol.outline = {};
      this.style.symbol.outline.width = this.options.style.weight || 1; 
      this.style.symbol.outline.color = [ this.options.style.color ] || 'rgba(255,255,255,255';
      this.fillOpacity = ( this.options.style.fillOpacity ) ? (this.options.style.fillOpacity * 255) : 255;
    }

  }


  /*
  * Convert esri-json to CSS 
  * 
  *
  */ 
  Malette.prototype._toCss = function(callback) {

    var css = {};
    css.fillColor = this.style.symbol.color;
    css.weight = this.style.symbol.outline.width;
    css.color = this.style.symbol.outline.color;
    css.radius = this.style.symbol.size;
    css.fillOpacity = this.fillOpacity / 255;

    callback(css);

  }



  /*
  * Master style object
  * Updates and emits 
  *
  */
  Malette.prototype._updateStyle = function() {
    var self = this; 

    if ( this.exportFormat === 'esri-json' ) {

      console.log('this.style.symbol.color', this.style.symbol.color);
      console.log('fillOpacity', this.fillOpacity);

      this.style.symbol.color = this._rgbaToDojoColor( this.style.symbol.color, this.fillOpacity ); //change colors BACK to dojo :(

      console.log('emit --->>>', this.style);
      this.emit( 'style-change', this.style );
    } else {

      if ( this.exportFormat === 'css' ) {
        this._toCss(function(css) {
          self.emit( 'style-change', css );
        });
      }

    }

  }





  /************* EVENTS **************/


  /*
  * Register Malette events 
  * 
  */
  Malette.prototype.on = function(eventName, handler){
    this._handlers[ eventName ] = handler; 
  };


  // trigger callback 
  Malette.prototype.emit = function(eventName, val) {
    if (this._handlers[ eventName ]){
      this._handlers[ eventName ](val);
    }
  };


  Malette.prototype._onColorClick = function(e) {
    if( e.which === 1 && !(e.metaKey || e.ctrlKey)){
      e.preventDefault();
      this.setSelectedColor(e.target.style.backgroundColor);
    }
  };


  Malette.prototype._onSizeChanged = function(e) {
    e.preventDefault();
    this.setSelectedSize(e.target.value);
  };


  Malette.prototype._onStrokeWidthChanged = function(e) {
    e.preventDefault();
    this.setStrokeWidth(e.target.value);
  };


  Malette.prototype._onOpacityChanged = function(e) {
    e.preventDefault();
    this.setOpacity(e.target.value);
  };


  Malette.prototype._onTabClick = function(e) {
    if( e.which === 1 && !(e.metaKey || e.ctrlKey)){
      e.preventDefault();
      var els = document.getElementsByClassName( 'malette-tab' );
      for(var i=0;i<els.length;i++){
        els[i].classList.remove( 'malette-tab-selected' );
      }
      e.target.classList.add('malette-tab-selected');

      this.changeTab(e.target.innerHTML);
    }
  };


  window.Malette = Malette;

})(window);