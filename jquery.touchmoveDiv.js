jQuery.fn.touchableDiv = function(options) {

  var defaults = {
		velocity : 1, 
		orientation: "horizontal",
		selectorMove:"#moveObject"
  };
  
  var initialTouch = {
		touchX : 0,
		touchY : 0
  }
var initialPosition = { 
	left : 0,
	top : 0
}
 
  var settings = $.extend({}, defaults, options);
 
  return this.each(function(){
		$(this).bind("touchstart",function(e){
			e.stopPropagation();
			initialTouch.touchX = e.originalEvent.touches[0].clientX;
			initialTouch.touchY = e.originalEvent.touches[0].clientY;
			initialPosition = {
				left : $(settings.selectorMove).position().left,
				top : $(settings.selectorMove).position().top
			}
		});
		$(this).bind("touchend",function(e){
			initialTouch = {
				touchX : 0,
				touchY : 0
			}
		});
		$(this).bind("touchmove", function(e,delta){
			e.preventDefault();
			e.stopPropagation();
			console.log(e.originalEvent.touches[0].clientX);
			var moveTouchX = e.originalEvent.touches[0].clientX;
			var moveTouchY = e.originalEvent.touches[0].clientY;
			
			if (settings.orientation === "horizontal"){
				var movimiento = initialPosition.left + ((moveTouchX - initialTouch.touchX) * settings.velocity);
				if (movimiento > 0){ 
					movimiento = 0;
				}else if ($(this).width() >= $(settings.selectorMove).width() + movimiento) {
					movimiento = -($(settings.selectorMove).width() - $(this).width());
				}
				
				if  ((movimiento <= 0) && ($(this).width() <= $(settings.selectorMove).width() + movimiento)){
					$(settings.selectorMove).css("left",movimiento);	
				}
			}
		});
  });
 
};