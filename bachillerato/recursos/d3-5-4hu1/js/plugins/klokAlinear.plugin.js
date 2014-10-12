//BY KLOK (http://klok.it) @klokmx 4 the Glory of Jesus
(function($) {

    $.fn.klokAlinear = function( opciones ) {
		
        var settings = $.extend({
            h        	: 'center',
            v        	: 'middle',
            alinearA	: $(this).parent()
        }, opciones);
        
        var alinearA = settings.alinearA;
		
		if($(alinearA).css('position') === undefined){
			$(alinearA).css({
				position : "relative"
			})
		}
		var elemento = $(this);
		$(elemento).css({
			height : "auto",
			width : "auto"
		});
		var alto = $(alinearA).height();
		var ancho = $(alinearA).width();
		
		var izq;
		var arriba;
		
		switch(settings.h){
			case "left":
			izq = 0;
			break;
			case "right":
			izq = ancho - $(elemento).outerWidth(true);
			break;
			case "center":
			izq = (ancho - $(elemento).outerWidth(true))/2;
			break;
		}
		
		switch(settings.v){
			case "top":
			arriba = 0;
			break;
			case "bottom":
			arriba = alto - $(elemento).outerHeight(true);
			break;
			case "middle":
			arriba = (alto - $(elemento).outerHeight(true))/2;
			break;
		}
		
		$(elemento).css({
			display : "block",
			width : $(elemento).width(),
			height : $(elemento).height(),
	        position : "absolute",
	        top : arriba,
	        left : izq
        });
        
        $(alinearA).resize(function(e){
			$(elemento).klokAlinear( opciones );
		});

    }

}(jQuery));