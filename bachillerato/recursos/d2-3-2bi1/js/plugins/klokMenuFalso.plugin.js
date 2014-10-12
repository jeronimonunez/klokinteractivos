function klokMenuFalso(parametros){
	var menu = $("<div>");
	$(menu).addClass("klokMenuFalso");
	if(parametros.id !== undefined){
		$(menu).attr("id", parametros.id);
	}
	if(parametros.clase !== undefined){
		$(menu).addClass(parametros.clase);
	}
	if(parametros.colocar_en !== undefined){
		var pariente = $(parametros.colocar_en);
	} else {
		var pariente = $("body");
	}
	
	$(menu)
	.click(function(){
		if(!$(this).hasClass("abierto")){
		   	$(this).addClass("abierto");
		} else {
		  	$(this).removeClass("abierto");
		}
	})
	.data("valor_default", parametros.valor_default)
	.appendTo($(pariente));
					
	var seleccion = $("<div></div>")
					.addClass("seleccion")
					.html(parametros.valor_default)
					.appendTo($(menu));
	
	var ul = $("<ul></ul>").appendTo($(menu));
	
	$.each(parametros.opciones, function(p, f){
		var li = $("<li></li>")
			.appendTo($(ul))
			.html(p)
			.data("f",f.funcion)
			.data("default", parametros.regresar_a_default)
			.click(function(){
				if(!$(this).hasClass("seleccionado")){
					$(this).addClass("visto");
					$(this).parent().find(".seleccionado").removeClass("seleccionado");
					if($(this).data("default") === false){
						$(this).parent().parent().find(".seleccion").html($(this).html());
					} else {
						$(this).parent().parent().find(".seleccion").html($(this).parent().parent().data("valor_default"));
					}					
					$(this).addClass("seleccionado");
					$(this).data("f")();
				}
			})
	});	
}

function klokMenuFalsoReset( el ){
	$(el).find(".seleccionado").removeClass(".seleccionado");
	$(el).find(".seleccion").html($(el).data("valor_default"));
	$(el).removeClass("abierto");
}