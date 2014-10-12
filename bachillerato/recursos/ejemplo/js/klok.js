//POR KLOK PARA LA GLORIA DE JESUS SEPT 13 2014 Twitter: @klokmx
$(document).ready(function(){
	Inicio();
});

var imagenes = [
	"banderanazi.png",
	"cartel.png",
	"barra.png",
	"preguntas_pregunta.png",
	"nazibandera.png",
	"propaganda1.svg",
	"propaganda2.svg",
	"respuesta.png",
	"respuestasfondo.png",
	"propaganda3.svg",
	"cerrar.png",
	"preguntafondo.png",
	"retro-mail-fondo.png",
	"judio.png",
	"fondo-hitler.png",
	"agula.png",
	"fondo-propaganda.png",
	"vignette.png",
	"fondo-nazismo.png",
	"retrofinal.png",
	"hitler.png",
	"retro-bien-fondo.png",
	"reload.png"
];

var precargadas = 0;

var ventanas = 0;
var dragueado;
var zooma;
var seccion = 1;
var zooms = [
	"El centro del cartel lo ocupa la imagen de un joven alemán, de espíritu combativo y raza aria, como Hitler quería que fuera la juventud alemana.",
	"El águila imperial alemana otorga legitimidad al partido nazi y a Hitler como heredero del Tercer Reich.",
	"Detrás del joven, se observan manos alzadas haciendo el saludo nazi: son los miembros del SS  (organización militar) que rinden obediencia y servicio total al Fürer.",
	"Los miembros del SS llevan estandartes con la cruz gamada, símbolo de la raza aria y de la superioridad alemana.",
	"Cartel de las Juventudes Hitlerianas de 1939. Esta organización surgida en 1929 encargada de adoctrinar y formar militrmente a los chicos de 10 a 18 años."
];


var examen = [
	[
		"Situación que prevalecía en Alemania a principios de la década de 1930 y que fue aprovechada por Hitler para ganar adeptos.",
		"Descontento popular",
		"¡Muy bien! La ineficacia de la República de Weimar para solucionar la crisis aumentaron el descontento.",
		"Considera otra respuesta. En esos años Alemania pasaba por una fuerte crisis económica."
	],
	[
		"Una de las promesas del partido nazi fue la de construir un ________ que vengara la humillación sufrida en la Primera Guerra Mundial.",
		"Reich milenario",
		"¡Muy bien! Hitler dijo que quería un Imperio alemán que durara mil años.",
		"Considera otra respuesta. Hitler prometió estabilidad y grandeza al pueblo alemán."
	],
	[	
		"El régimen nazi se organizó mediante un partido único encabezado por un líder carismático, ¿a cuál sistema de gobierno rechazó? ",
		"Democracia",
		"¡Muy bien! El nazismo se basaba en el principio de la jerarquía y rechazaba la igualdad de la democracia.",
		"Considera otra respuesta. El nazismo rechazaba la igualdad de las personas ante la ley."
	],
	[
		"Hitler prometió a los pueblos de lengua y cultura alemana tener un solo territorio, al que llamó: ",
		"Espacio vital",
		"¡Muy bien! Reclamó los territorios de Polonia y Checoslovaquia, donde vivían muchos alemanes.",
		"Considera otra respuesta. Este territorio era vital para la sobrevivencia del pueblo alemán."
	],
	[
		"Concepto que se refiere al carácter del nazismo de conquistar territorios vecinos para construir la Gran Alemania.  ",
		"Expansionismo",
		"¡Muy bien! El programa nazi fue expansionista y Hitler estaba dispuesto a entrar en guerra para obtener los territorios que quería.",
		"Considera otra respuesta. El programa nazi se basaba en la expansión militar y territorial alemana."
	],
	[
		"Hitler estaba convencido de que los alemanes dominarían al mundo porque creía en la: ",
		"Superioridad aria",
		"¡Muy bien! Para Hitler la raza aria tenía el derecho de subyugar a otros pueblos. ",
		"Considera otra respuesta. La superioridad de la raza blanca era un principio del nazismo."
	],
	[
		"Para el nazismo, los jóvenes debían llevar a cabo el expansionismo alemán. Por ello, los adoctrinaron dentro de:",
		"Org. paramilitares",
		"¡Muy bien! Después de pasar por las Juventudes Hitlerianas, los jóvenes se integraban al SS (milicia alemana).",
		"Considera otra respuesta. Hitler quería formar una juventud implacable basada en la disciplina militar."
	],
	[
		"La población alemana fue adoctrinada a través de una intensa ___________ que tuvo el monopolio de todos los medios de comunicación.",
		"Propaganda",
		"¡Muy bien! La intensa propaganda tenía como objetivo que las masas rindieran culto al Führer.",
		"Considera otra respuesta. Programas de radio, televisión, prensa y carteles difundían la ideología nazi."
	],
	[
		"El nazismo fue un proyecto racista cuyo objetivo era purificar al pueblo alemán de elementos “inferiores”, como los judíos. El concepto que define esta postura es:",
		"Antisemitismo",
		"¡Muy bien! Las leyes de Núremberg de 1935 excluyeron de la sociedad a los judíos.",
		"Considera otra respuesta. Los nazis promulgaron una legislación anti-judía. "
	],
	[
		"En los años previos a la Segunda Guerra Mundial, Alemania aumentó su gasto en material bélico. A este proceso se le llama: ",
		"Armamentismo",
		"¡Muy bien! Alemania se convirtió en la segunda potencia industrial del mundo, gracias a la producción de armamento.",
		"Considera otra respuesta. Toda la economía alemana giró en torno a la producción de armamento."
	]
];

function Inicio(){
	
	ventanas = 0;
	dragueado = undefined;
	zooma = undefined;
	seccion = 1;
	
	//reset
	$(".retrofinal").hide();
	$(".retrofinal").find(".texto").hide();
	$(".retrofinal").find("img").removeClass("crece");
	$('div.respuesta').remove();
	$('div.pregunta').remove();
	$(".propagandaFondo").hide();
	$(".cartel").removeClass("prop1").removeClass("prop2").removeClass("prop3").removeClass("prop4").removeClass("prop5");
	$(".visitado").removeClass("visitado");
	$(".marquesina").hide();
	
	
	$(".zoomeable").unbind("click").bind("click", function(e){
		$(this).addClass("visitado");
		var subseccion = $(this).attr("subseccion");
		$("."+subseccion).fadeIn().addClass("activa");
		if(subseccion == "propaganda"){
			setTimeout(function(){
				$(".marquesina").fadeIn(1500);
			}, 1000);
		}
	});
	
	$(".botonCerrar1").unbind("click").bind("click", function(e){
		$("."+zooma).removeClass(zooma);
		$(".propagandaFondo").fadeOut();
		$(".marquesina").fadeIn();
	});
	
	$(".botonCerrar").unbind("click").bind("click", function(e){
		$(".subseccion.activa").fadeOut();
		RegresaAudio();
		$(".marquesina").fadeOut();
		if($(".visitado").length == 3){
			unLock();
			goTo(2);
		}
	});
	
	$(".marquesina").unbind("click").bind("click", function(e){
		zooma = $(this).attr('zooma');
		var num = zooma.replace("prop", "");
		$(".marquesina").fadeOut();
		$(".cartel").addClass(zooma);
		$(".propagandaFondo").find(".texto").html(zooms[num-1]);
		$(".propagandaFondo").fadeIn();
		
	});
	
	examen = Shuffle(examen);
	examen = Shuffle(examen);
	
	ConstruyeExamen();
	
	Audio();
}

function Audio(){
	var audio = document.getElementById('hitleraudio');
	$(".play").unbind("click").bind("click", function(e){
		audio.play();
		$(this).hide();
		$(".alto").show();
	});
	
	$(".alto").unbind("click").bind("click", function(e){
		audio.pause();
		$(this).hide();
		$(".play").show();
	});
	
	$(".dial").draggable({
		containment : $(".barra"),
		start : function(){
			audio.pause();	
			$(".alto").hide();
			$(".play").show();	
		},
		stop : function(){
			var porcentaje = $(".dial").position().left/$(".barra").width();
			var quetoca = audio.duration*porcentaje;
			audio.currentTime = quetoca;
			audio.play();
			$(".alto").show();
			$(".play").hide();
		}
	})

	audio.addEventListener("pause", function() {
    	$(".audio_play").fadeIn();
    	$(".audio_pausa").fadeOut();
    }, true);
    audio.addEventListener("play", function() {
    	$(".audio_play").fadeOut();
    	$(".audio_pausa").fadeIn();
    }, true);
    audio.addEventListener("timeupdate", Progreso, true);
}

function RegresaAudio(){
	var audio = document.getElementById('hitleraudio');
	audio.pause();
	audio.currentTime = 0;
	$(".dial").css({
		left : 0
	});
	$(".alto").hide();
	$(".play").show();
}

function Progreso() { 
    var oAudio = document.getElementById('hitleraudio'); 
    var elapsedTime = Math.round(oAudio.currentTime);
    var fWidth = (elapsedTime * $(".barra").width()) / oAudio.duration;
	if (fWidth > 0) {
	    $(".dial").css({
	        left : fWidth
	    })
	}
}

function ConstruyeExamen(){
	$(examen).each(function(i){
		
		var pregunta = $(this)[0];
		var respuesta = $(this)[1];
		var retro_ok = $(this)[2];
		var retro_mal = $(this)[3];
		
		var div_respuesta = $("<div></div>").addClass("respuesta").appendTo(".seccion2").html(respuesta).attr("num", i).addClass("num"+i);
	
		var div_pregunta = $("<div></div>").addClass("pregunta").appendTo(".seccion2").attr("num", i).addClass("preg"+i);
		var div_texto = $("<div></div>").addClass("texto").appendTo(div_pregunta).html(pregunta);
		
	});
	
	$('div.respuesta').Revuelve();
	$('div.pregunta').Revuelve();
	
	$('div.pregunta').hide();
	$('.preg0').addClass("pregVisidble").show();
	
	
	$('div.respuesta').draggable({
		start: function(){$("#panelReel").swipe("disable")},
		containment : $(".seccion2"),
		revert: function(valid) {
        	if(!valid) {
        		num = $(this).attr("num");
            	Retro("mala", num);
			}
			return !valid;
		},
		stop: function(){$("#panelReel").swipe("enable")},
		zIndex: 100
	})
	
	$('div.pregunta').each(function(){
		var num = $(this).attr("num");
		$(this).droppable({
			accept : $(".num"+num),
			drop: function(event, ui) {
				var num = parseInt($(this).attr("num"));
				$(ui.draggable).fadeOut();
				$(this).fadeOut();
				$(".preg"+Number(num+1)).fadeIn();
				Retro("buena", num);
			}
		});
	})
	
}


function Retro(buenaomala, num){
	switch (buenaomala){
		case "mala":
		var numpreg = parseInt($(".pregVisidble").attr("num"));
		$(".retro").removeClass("buena").addClass("mala").find(".texto").html(examen[numpreg][3]);
		$(".cerrarRetro").unbind("click").bind("click", function(){
			$(".retro").fadeOut();
		});
		break;
		case "buena":
		$(".num"+num).fadeOut();
		$(".preg"+num).fadeOut();
		$(".retro").removeClass("mala").addClass("buena").find(".texto").html(examen[num][2]);
		$(".cerrarRetro").unbind("click").bind("click", function(){
			num = num + 1;
			if($(".preg"+num).length == 0){
				RetroFinal();
			}
			$(".retro").fadeOut(function(){
				if($(".preg"+num).length){
					$(".pregVisidble").removeClass("pregVisidble");
					$(".preg"+num).addClass("pregVisidble").fadeIn();
				}
			});
		});
		break;
	}
	$(".retro").fadeIn();
}

function RetroFinal(){	
	
	$(".retrofinal").fadeIn(function(){
		$(".retrofinal").find("img").addClass("crece");
		setTimeout(function(){
			$(".retrofinal").find(".reload").fadeIn(2000);
			$(".retrofinal").find(".texto").fadeIn(2000, function(){
				setTimeout(function(){
					$(".retrofinal").find(".texto").fadeOut(4000);
					
				}, 6000);
			});
		}, 3000);
	})
}

function Reinicia(){
	goTo(1);
	bloquear.push(1);
	$("#secc1").addClass("lock");
	Inicio();
}