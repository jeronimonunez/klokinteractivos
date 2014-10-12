color1 = '';
color2 = '';

footerImg = '';
headerImg = '';
footerOff = '../../common/img/mas.png';
footerOn = '../../common/img/menos.png';
headerOff = '../../common/img/head1.png';
headerOn = '../../common/img/head2.png';
firstFooterClick = false;
footerHeight = ''
firstToggle = true;

var ua = navigator.userAgent.toLowerCase();
var isiPad = /iPad/i.test(ua) || /iPhone OS 3_1_2/i.test(ua) || /iPhone OS 3_2_2/i.test(ua);
var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");

$(document).ready(function () {
	if(isAndroid){
		$('body').css('background-size','220%').css('background-position','0 0');
	}
	if(isAndroid){
		$('body').css('background-size','220%').css('background-position','0 0');
	}
	//ajustar pantalla a 790 × 560 pixeles
	window.resizeTo(790,560);
	
	//crear splash		
	$('<section id="splash"><img src="splash.png" /></section>').insertBefore('#activity')

	//crear header y footer
	$('<header> <img id="headerImg"/><h1></h1><a id="headerTab"><img src="../../common/img/iniciare.png"/></a></header><footer><img id="logo" src=""/><section id="instrucciones"></section><div id="seccSugerecias"></div><nav id="footerButtons"><ul><li><a id="home"><img src="../../common/img/home.png"/></a></li><li><a id="footerTab"><img src="../../common/img/menos.png"/></a></li><li><a id="reiniciar"><img src="../../common/img/reiniciar.png"/></a></li></ul></nav></footer>').insertAfter('#activity')
	footerImg = $('#footerTab img');
	
	asignaturas = ['biologia', 'etimologias', 'fisica', 'geografia', 'historiamex', 'historiauniv', 'sociales', 'literatura', 'matematicas', 'quimica' ];
	colorFooter = 'rgba(255, 255, 255, 0.15)';
	colorHeader = 'rgba(255, 255, 255, 0.9)';

	color1 = colorFooter/*[asignaturas.indexOf(asignatura)];*/
	color2 = colorHeader/*[asignaturas.indexOf(asignatura)];*/
	
	$('h1').text(titulo).css('background-color', color1);
	$('footer').css('background-color', color1);
	$('title').text(titulo);

	$('#instrucciones').html(intro).addClass('introTxt');
     /*
	midWidth = parseInt($('#instrucciones').css('width')) / 2 * -1;
	$('#instrucciones').css('margin-left', midWidth);
    */


	$('body').css('background-image', 'url(../../common/skin/' + asignatura + '.jpg)');
	$('#headerImg').attr('src', '../../common/skin/' + asignatura + '.png');

	$('.button').css('background-color',color2).hover(function(){
		$(this).css('background-color', color1)
		}, function(){
			$(this).css('background-color', color2)
	});

	$('#splash, #activity, #pageSections').hide();
	$('#activity').css('border-color', color1)
	$('#splash').fadeIn(1000);

	alreadyDown = false;
	footerHeight = $('footer').css('height');

	var headerHeight = $('h1').css('height');

	//mostrar botones parte izquierda
	if (botones.length != 0) {
		for (var a = 0; a < botones.length; a++) {
			$('#footerButtons li:last').after('<li><a id = "' + botones[a] + '"><img src="../../common/img/' + botones[a] + '.png"> </img</a></li>')
		}
	}

	$('#footerButtons li, #seccSugerecias').hide(); // se eliminó .not(':first')
	// funciones de botones


	$('#home').click(function () {location.reload();})
	
	/***************************/
	/***** BOTÓN REINICIAR ****/
	/*************************/
	
	
	$('#reiniciar').click(function(){
		alert("No se ha programado el botón para reiniciar la actividad.");
		init();
	})
	
	/***************************/
	/***** FIN: REINICIAR *****/
	/*************************/
	
	$('#headerTab').click(function () {
		if (firstToggle == true) {
			firstToggle = false;
			$('#instrucciones').css('margin-left', '0').html(paneles[0].instrucciones).removeClass('introTxt');
			$('#splash, #logo').fadeOut(1000);
			$('#activity, #pageSections').fadeIn(4000);
			$('footer li').fadeIn(1000);
			$(this).html('');
			$('<img src="../../common/img/head2.png" />').appendTo($(this));

			autoHideFooter = setTimeout(

			function () {
				if (firstFooterClick == false) {
					footerImg = $('#footerTab img');

					if (footerImg.attr('src') == footerOn) {

						footerImg.attr('src', footerOff)
                        footerHeight = $('footer').css('height');
						$('footer').animate({
							bottom: '-=' + footerHeight
						},
						500, 'swing');
					}
				}
			},
			12000

			);
		} // firstToggle

		switchHeader()

	})

	$('#footerTab').click(switchFooter)
	$('#splash').center();
	if (centrar == true) {
		$('#activity').center()
	};

	window.onresize = function (event) {
		$('#splash').center();
		if (centrar == true) {
			$('#activity').center()
		};
	}
}); //TERMINA DOCUMENT READY

function switchFooter() {
	firstFooterClick = true;
	if (footerImg.attr('src') == footerOn) {
		footerImg.attr('src', footerOff)
		$('footer').stop(true, true).animate({
			bottom: '-=' + footerHeight
		},
		500, 'swing');
	} else {
		footerImg.attr('src', footerOn)
		$('footer').stop(true, true).animate({
			bottom: '+=' + footerHeight
		},
		500, 'swing');
	}
}

function switchHeader() {
	headerImg = $('#headerTab img');
	if (headerImg.attr('src') == headerOn) {
		headerImg.attr('src', headerOff)
		$('header').animate({
			marginTop: '-=' + 84
		},
		500, 'swing');
	} else {
		headerImg.attr('src', headerOn)
		$('header').animate({
			marginTop: '+=' + 84
		},
		500, 'swing');
	}
}

function addButtons(buttonID) {
	$(document).ready(function () {
		$('#footerButtons li:last').after('<li><a id = "' + buttonID + '"><img src="img-html/' + buttonID + '.png"> </img</a></li>')
	})
}

function removeButtons(buttonID) {
	$(document).ready(function () {
		$('#' + buttonID).remove();
	})
}



function updateInstructions(newInstructions){
var firstClick = true;
     $('#instrucciones').html(newInstructions)
	if (footerImg.attr('src') == footerOff) {
		footerImg.attr('src', footerOn)
		$('footer').stop(true, true).animate({
			bottom: '+=' + footerHeight
		},500, 'swing');
	}
}

jQuery.fn.center = function () {
	this.css('position', 'absolute')
	this.css("z-index", "-1000");
	this.css("top", (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop() + "px");
	this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
	return this;
}