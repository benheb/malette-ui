var Malette = function( container, options ) {
  console.log('init Malette, options: ', options);

  this.options = options;
  this.container = container;
  this.width = options.width || 239;
  this.height = options.height || 'auto';
  
  this._buildUI();

  return this;
};


Malette.prototype._buildUI = function() {

  var container = document.getElementById( this.container );
  var innerContainer = document.createElement('div');
  container.appendChild( innerContainer ).id = 'malette';

  innerContainer.innerHTML = 'Styler Goes Here...';
}