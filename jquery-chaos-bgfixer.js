/*
 * jQuery CSS Background Fixer
 * Forces the size of HTML elements to be set so that CSS backgrounds are never incompletely rendered (cut off).
 * The CSS background will be repeated both the x and y axis a whole number of times.
 * Currently Supports the following values for background-repeat: repeat-x, repeat-y, and repeat.
 * By Matthew Sigley
 * Version 1.0.2
 */

(function( $ ) {
	$.fn.fixCssBg = function() {
			var thisElement = $(this);
			if(typeof thisElement != 'undefined')
				return this;
			var cssBgImg = thisElement.css('background-image');
			cssBgImg = cssBgImg.match(/^(?:u|U)(?:r|R)(?:l|L)\((?:"|')?([^"']+)(?:"|')?\)$/);
	
			//Check for Invalid CSS property
			if(cssBgImg === null) return;
			
			var bgImgLoad = function(e) {
				var elementToResize = e.data.elementToResize;
				var cssBgRepeat = elementToResize.css('background-repeat');
				var bgImgWidth = $(this).width();
				var bgImgHeight = $(this).height();
				if(this.complete) {
					//Good valid image file
					var currentWidth = elementToResize.width();
					var currentHeight = elementToResize.height();
					var maxWidth = elementToResize.css('max-width') == 'none' ? 10000 : parseInt(elementToResize.css('max-width'));
					var maxHeight = elementToResize.css('max-height') == 'none' ? 10000 : parseInt(elementToResize.css('max-height'));
					var minWidth = parseInt(elementToResize.css('min-width'));
					var minHeight = parseInt(elementToResize.css('min-height'));
					var fitWidth, fitHeight;
					
					switch(cssBgRepeat) {
						case 'repeat-x':
							var fitWidth = Math.ceil(currentWidth / bgImgWidth) * bgImgWidth;
							var fitHeight = currentHeight > bgImgHeight ? currentHeight : bgImgHeight;
							break;
						case 'repeat-y':
							var fitWidth = currentWidth > bgImgWidth ? currentWidth : bgImgWidth;
							var fitHeight = Math.ceil(currentHeight / fitHeight) * bgImgHeight;
							break;
						case 'repeat':
							var fitWidth = currentWidth > bgImgWidth ? currentWidth : bgImgWidth;
							var fitHeight = currentHeight > bgImgHeight ? currentHeight : bgImgHeight;
							break;
						default:
							fitWidth = currentWidth;
							fitHeight = currentHeight;
							break;
					}
					if(fitWidth >= minWidth && fitWidth <= maxWidth)
						elementToResize.width(fitWidth);
					if(fitHeight >= minHeight && fitHeight <= maxHeight)
						elementToResize.height(fitHeight);
				}
			};
			
			var resizeElement = function(cssBgImg) {
				var bgImg = new Image();
				bgImg.src = cssBgImg;
				$(bgImg).on('load', {'elementToResize' : thisElement}, bgImgLoad);
				$(bgImg).css('display', 'none');
				$('body').append(bgImg);
			};
			
			resizeElement(cssBgImg[1]);
		//Maintain chainability
		return this;
	};
})( jQuery );