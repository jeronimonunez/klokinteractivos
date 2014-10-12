function EsiOs(){
	var userAgent = window.navigator.userAgent;
	if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
		return true;
	} else {
		return false;
	}
}

function Shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

function Retraso(parametros){
	setTimeout(function(){
		parametros.func();
	}, parametros.tiempo)
}

(function($){
 
    $.fn.Revuelve = function() {
 
        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function(){
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
           });
 
        this.each(function(i){
            $(this).replaceWith($(shuffled[i]));
        });
 
        return $(shuffled);
 
    };
 
})(jQuery);

function Precargar(){
	if(precargadas < imagenes.length){
	
	$.each(imagenes, function(i){
		var img = "<img>";
		$(img).attr("src", "img/"+imagenes[i]).load(function(){
			precargadas += 1;
			$(this).remove();
		})
	})
	
	}
}