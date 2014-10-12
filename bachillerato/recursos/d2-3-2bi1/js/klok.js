//aqui van todas las acciones y funciones de javascript
//facor de comentarlas


var anemiaApp = ( function( window, undefined ){
    // variable que contiene al player de video
    var player, player2;
    // variables con los sonidos de suceso y error
    var sonidoSuceso = document.getElementById('sonido-suceso');
    var sonidoError = document.getElementById('sonido-error');

    // acumulado de respuestas correctas de ejercicios
    var acumuladoEjercicios = [-1,0,0,0];

    var pantallasIniciadas = [0,0,0]

    // 4. The API will call this function when the video player is ready.
    var onPlayerReady = function(event) {
        event.target.playVideo();
    }

    var stopVideo = function() {
        player.stopVideo();
    }

    var playSound = function(sonido) {
        if(sonido == "suceso") {
            sonidoSuceso.play();
        } else if(sonido == "error") {
            sonidoError.play();
        }
    }

    var iniciarEjercicio1 = function() {
        var totalPreguntasDraggables = 30;
        $("#panelReel").swipe("disable")

        var $scene2 = $('#scene2'),
            $ejercicio1 = $('#ejercicio1');

        $scene2.parallax();

        $ejercicio1.find(".fragmento.draggable").draggable({
            helper: 'clone'
        });
        $ejercicio1.find(".fragmento.droppable").droppable({
            accept: ".draggable",
            hoverClass: 'droppable-hover',
            drop: function(ev, ui) { //ocurre cuando el draggable cae dentro del droppable
                if($(ui.draggable).data("respuesta") == $(ev.target).data("respuesta")) {
                    // correcto
                    $(ev.target).droppable('disable').addClass('respuesta-'+$(ev.target).data("respuesta"));
                    playSound("suceso");
                    acumuladoEjercicios[1]++;
                    if(acumuladoEjercicios[1]==totalPreguntasDraggables) {
                        iniciarEjercicio1Parte2();
                    }
                } else {
                    playSound("error");
                }
            }
        });
    }

    var iniciarEjercicio1Parte2 = function() {
        var totalPreguntasDraggables = 4,
            respuestasCorrectas = 0;

        $('#ejercicio1').addClass("parte2");
        var $parte2 = $("#ejercicio1-parte2");

        $parte2.fadeIn();

        $parte2.find(".boton-imagen.draggable").draggable({
            revert: "invalid"
        });
        $parte2.find(".boton-imagen.droppable").droppable({
            accept: ".boton-imagen.draggable",
            hoverClass: 'droppable-hover',
            drop: function(ev, ui) { //ocurre cuando el draggable cae dentro del droppable
                if($(ui.draggable).data("respuesta") == $(ev.target).data("respuesta")) {
                    // correcto
                    // $(ev.target).droppable('disable').addClass('respuesta-'+$(ev.target).data("respuesta"));
                    $(ev.target)
                        .droppable('disable')
                        .attr('src', $(ui.draggable).attr('src'));
                    $(ui.draggable).draggable("disable").hide();
                    playSound("suceso");
                    respuestasCorrectas++;
                    if(respuestasCorrectas==totalPreguntasDraggables) iniciarEjercicio1Parte3();
                } else {
                    playSound("error");
                    // $(ui.draggable).draggable({revert:true, revertDuration:300});
                    $(ui.draggable).draggable("option","revert",true);
                    $(ui.draggable).draggable("option","revertDuration",300);
                    setTimeout(function(){
                        $(ui.draggable).draggable("option","revert","invalid");
                        // $(ui.draggable).draggable({revert:false});
                    },301);
                }
            }
        });
    }

    var iniciarEjercicio1Parte3 = function() {
        var $parte3 = $('#ejercicio1-parte3'),
            contadorPreguntas = 0,
            totalPreguntas = 3;
        $parte3.fadeIn();
        $parte3.find('.siguiente-ventana').on('click', function(e){
            e.preventDefault();
            $parte3.find('.ventana-1').fadeOut(300, function(){
                $parte3.find('.ventana-2').fadeIn();
                iniciarVentanas($parte3, totalPreguntas, 3, anemiaApp.pantallaTres);
            });
        })
    }

    var iniciarEjercicio2 = function() {
        var totalPreguntasDraggables = 30;
        $("#panelReel").swipe("disable")

        var $scene3 = $('#scene3'),
            $ejercicio2 = $('#ejercicio2');

        $scene3.parallax();

        $ejercicio2.find(".fragmento.draggable").draggable({
            helper: 'clone'
        });
        $ejercicio2.find(".fragmento.droppable").droppable({
            accept: ".draggable",
            hoverClass: 'droppable-hover',
            drop: function(ev, ui) { //ocurre cuando el draggable cae dentro del droppable
                if($(ui.draggable).data("respuesta") == $(ev.target).data("respuesta")) {
                    // correcto
                    $(ev.target).droppable('disable').addClass('respuesta-'+$(ev.target).data("respuesta"));
                    playSound("suceso");
                    acumuladoEjercicios[2]++;
                    if(acumuladoEjercicios[2]==totalPreguntasDraggables) {
                        iniciarEjercicio2Parte2();
                    }
                } else {
                    playSound("error");
                }
            }
        });
    }

    var iniciarEjercicio2Parte2 = function() {
        var totalPreguntasDraggables = 10,
            respuestasCorrectas = 0;

        $('#ejercicio2').addClass("parte2");
        var $parte2 = $("#ejercicio2-parte2");

        var $tablaGrande = $parte2.find(".tabla-grande");
        var $contendorDraggables = $parte2.find(".circulo-imagen-container");

        $parte2.fadeIn();

        $tablaGrande.find(".boton-cerrar").on('click', function(e) {
            e.preventDefault();
            $tablaGrande.fadeOut();
            $contendorDraggables.fadeOut();
            $parte2.find('.circulo-imagen.draggable').fadeOut();
        });

        $parte2.find('.tabla-mini').on('click', function(e){
            $tablaGrande.fadeIn();
            $contendorDraggables.fadeIn();
            $parte2.find('.circulo-imagen.draggable').fadeIn();
        });

        $parte2.find(".circulo-imagen.draggable").draggable({
            helper: 'clone',
            revert: 'invalid',
            start: function(ev, ui) {
                $tablaGrande.fadeOut();
                $(ui.helper).siblings().fadeOut();
            }
        });
        $parte2.find(".circulo-imagen.droppable").droppable({
            accept: ".circulo-imagen.draggable",
            hoverClass: 'droppable-hover',
            drop: function(ev, ui) { //ocurre cuando el draggable cae dentro del droppable
                if($(ui.draggable).data("respuesta") == $(ev.target).data("respuesta")) {
                    // correcto
                    $(ev.target).droppable('disable').addClass('respuesta-'+$(ev.target).data("respuesta"));
                    playSound("suceso");
                    respuestasCorrectas++;
                    if(respuestasCorrectas==totalPreguntasDraggables) iniciarEjercicio2Parte3();
                } else {
                    playSound("error");
                    // $(ui.draggable).draggable({revert:true, revertDuration:300});
                    $(ui.draggable).draggable("option","revert",true);
                    $(ui.draggable).draggable("option","revertDuration",300);
                    setTimeout(function(){
                        $(ui.draggable).draggable("option","revert","invalid");
                    },301);
                }
            }
        });
    }

    var iniciarEjercicio2Parte3 = function() {
        // console.log("ejercicio2-parte3");

        var totalPreguntasDraggables = 4,
            respuestasCorrectas = 0;

        $('#ejercicio2').addClass("parte3");
        var $parte3 = $("#ejercicio2-parte3");
        $("#ejercicio2-parte2").addClass("parte3");

        $parte3.fadeIn();

        $parte3.find(".boton-imagen.draggable").draggable({
            // helper: 'clone'
            revert: "invalid"
        });
        $parte3.find(".boton-imagen.droppable").droppable({
            accept: ".boton-imagen.draggable",
            hoverClass: 'droppable-hover',
            drop: function(ev, ui) { //ocurre cuando el draggable cae dentro del droppable
                if($(ui.draggable).data("respuesta") == $(ev.target).data("respuesta")) {
                    // correcto
                    // $(ev.target).droppable('disable').addClass('respuesta-'+$(ev.target).data("respuesta"));
                    $(ev.target)
                        .droppable('disable')
                        .attr('src', $(ui.draggable).attr('src'));
                    $(ui.draggable).draggable("disable").hide();
                    playSound("suceso");
                    respuestasCorrectas++;
                    if(respuestasCorrectas==totalPreguntasDraggables) iniciarEjercicio2Parte4();
                } else {
                    playSound("error");
                    // $(ui.draggable).draggable({revert:true, revertDuration:300});
                    $(ui.draggable).draggable("option","revert",true);
                    $(ui.draggable).draggable("option","revertDuration",300);
                    setTimeout(function(){
                        $(ui.draggable).draggable("option","revert","invalid");
                        // $(ui.draggable).draggable({revert:false});
                    },301);
                }
            }
        });
    }

    var iniciarEjercicio2Parte4 = function() {
        var $parte4 = $('#ejercicio2-parte4'),
            contadorPreguntas = 0,
            totalPreguntas = 3;
        $parte4.fadeIn();
        $parte4.find('.siguiente-ventana').on('click', function(e){
            e.preventDefault();
            $parte4.find('.ventana-1').fadeOut(300, function(){
                $parte4.find('.ventana-2').fadeIn();
                iniciarVentanas($parte4, totalPreguntas, 4, anemiaApp.pantallaCuatro);
            });
        });
    }

    var iniciarEjercicio3 = function() {
        var totalPreguntasDraggables = 30;
        $("#panelReel").swipe("disable")

        var $scene4 = $('#scene4'),
            $ejercicio3 = $('#ejercicio3');

        $scene4.parallax();

        $ejercicio3.find(".fragmento.draggable").draggable({
            helper: 'clone'
        });
        $ejercicio3.find(".fragmento.droppable").droppable({
            accept: ".draggable",
            hoverClass: 'droppable-hover',
            drop: function(ev, ui) { //ocurre cuando el draggable cae dentro del droppable
                if($(ui.draggable).data("respuesta") == $(ev.target).data("respuesta")) {
                    // correcto
                    $(ev.target).droppable('disable').addClass('respuesta-'+$(ev.target).data("respuesta"));
                    playSound("suceso");
                    acumuladoEjercicios[3]++;
                    if(acumuladoEjercicios[3]==totalPreguntasDraggables) {
                        iniciarEjercicio3Parte2();
                    }
                } else {
                    playSound("error");
                }
            }
        });
    }

    var iniciarEjercicio3Parte2 = function() {
        var totalPreguntasDraggables = 10,
            respuestasCorrectas = 0;


        var $ejercicio3 = $('#ejercicio3');
        $ejercicio3.addClass("parte2");
        var $parte2 = $("#ejercicio3-parte2");

        var $tablaGrande = $parte2.find(".tabla-grande");
        var $contendorDraggables = $parte2.find(".circulo-imagen-container");

        $parte2.fadeIn();

        $tablaGrande.find(".boton-cerrar").on('click', function(e) {
            e.preventDefault();
            $tablaGrande.fadeOut();
            $contendorDraggables.fadeOut();
            $parte2.find('.circulo-imagen.draggable').fadeOut();
        });

        $parte2.find('.tabla-mini').on('click', function(e){
            $tablaGrande.fadeIn();
            $contendorDraggables.fadeIn();
            $parte2.find('.circulo-imagen.draggable').fadeIn();
        });

        $parte2.find(".circulo-imagen.draggable").draggable({
            helper: 'clone',
            start: function(ev, ui) {
                $tablaGrande.fadeOut();
                $(ui.helper).siblings().fadeOut();
            }
        });
        $ejercicio3.find(".circulo-imagen.droppable").droppable({
            accept: ".circulo-imagen.draggable",
            hoverClass: 'droppable-hover',
            drop: function(ev, ui) { //ocurre cuando el draggable cae dentro del droppable
                if($(ui.draggable).data("respuesta") == $(ev.target).data("respuesta")) {
                    // correcto
                    $(ev.target).droppable('disable').addClass('respuesta-'+$(ev.target).data("respuesta"));
                    playSound("suceso");
                    respuestasCorrectas++;
                    if(respuestasCorrectas==totalPreguntasDraggables) iniciarEjercicio3Parte3();
                } else {
                    playSound("error");
                    $(ui.draggable).draggable({revert:true, revertDuration:300});
                    setTimeout(function(){
                        $(ui.draggable).draggable({revert:false});
                    },301);
                }
            }
        });
    }

    var iniciarEjercicio3Parte3 = function() {
        var $parte3 = $('#ejercicio3-parte3'),
            contadorPreguntas = 0,
            totalPreguntas = 1;
        $parte3.fadeIn();
        $parte3.find('.siguiente-ventana').on('click', function(e){
            e.preventDefault();
            $parte3.find('.ventana-1').fadeOut(300, function(){
                $parte3.find('.ventana-2').fadeIn();
                iniciarVentanas($parte3, totalPreguntas, -1, iniciarEjercicio3Parte4);
            });
        });
    }

    var iniciarEjercicio3Parte4 = function() {
        var $parte3 = $('#ejercicio3-parte3');
        var $parte4 = $('#ejercicio3-parte4');
        var $parte5 = $('#ejercicio3-parte5');
        $parte3.fadeOut();
        $parte4.fadeIn(300, function(){
            $('.boton-play-ultimo').on('click', function(e){
                e.preventDefault();
                $parte4.fadeOut();
                $parte5.fadeIn();

                player2 = new YT.Player('ytplayer2', {
                    height: '315',
                    width: '560',
                    videoId: 'R4-c3hUhhyc',
                    events: {
                        'onReady': onPlayerReady
                    }
                });
            })
        });
    }

    var iniciarVentanas = function($ventana, totalPreguntas, siguientePantalla, callback) {
        var contadorPreguntas = 0;

        var $preguntas = $ventana.find('.ventana-pregunta');

        $.each($preguntas, function() {
            var that = $(this);
            that.find('input').on('change', function(){
                if($(this).attr("data-correcta")==1) {
                    playSound("suceso");
                    contadorPreguntas++;
                    setTimeout(function(){
                        if(contadorPreguntas==totalPreguntas) {
                            if(siguientePantalla!=-1) {
                                goTo(siguientePantalla);
                            }
                            callback();
                        } else {
                            that.hide();
                            that.next().fadeIn();
                        }
                    },1000);
                } else {
                    playSound("error");
                }
            });
        })
    }

    return {
        pantallaUno: function(){
            // iniciamos la app

            if(pantallasIniciadas[1] == 1) return;

            var $scene = $('#scene'),
                $contenedorVideo = $('#contenedor-video'),
                $reproducirVideo = $('#reproducir-video'),
                $cerrarVideo = $('#cerrar-video'),
                $pantallaSiguiente = $('#pantalla-siguiente');

            // var totalPreguntas = 30,
            //     contadorPreguntas = 0;

            $scene.parallax();

            $reproducirVideo.on('click', function(e) {
                e.preventDefault();
                $contenedorVideo.removeClass('oculto');

                // esta funcion crea un <iframe> con un reproductor de youtube
                player = new YT.Player('ytplayer', {
                    height: '315',
                    width: '560',
                    videoId: 'fC_h0zWM1us',
                    events: {
                        'onReady': onPlayerReady
                    }
                });
            });

            $cerrarVideo.on('click', function(e) {
                e.preventDefault();
                $contenedorVideo.addClass('oculto');
                stopVideo();
            });

            $pantallaSiguiente.on('click', function(e) {
                e.preventDefault();
                unLock();
                goTo(2);
                anemiaApp.pantallaDos();
            });

            pantallasIniciadas[1] = 1;
        },

        pantallaDos: function() {

            if(pantallasIniciadas[2] == 1) return;

            iniciarEjercicio1();

            pantallasIniciadas[2]=1;
        },

        pantallaTres: function() {
            if(pantallasIniciadas[3] == 1) return;
            iniciarEjercicio2();
            pantallasIniciadas[3]=1;
        },

        pantallaCuatro: function() {
            if(pantallasIniciadas[4] == 1) return;
            iniciarEjercicio3();
            pantallasIniciadas[4]=1;
        },

        // API (solo para uso en dev)
        setearEjercicio: function(numeroEjercicio, numero) {
            acumuladoEjercicios[numeroEjercicio] = numero;
            // console.log(acumuladoEjercicios);
        },
        ej1p2: function() {
            iniciarEjercicio1Parte2();
        },
        ej1p3: function() {
            iniciarEjercicio1Parte3();
        },
        ej2p2: function() {
            iniciarEjercicio2Parte2();
        },
        ej2p3: function() {
            iniciarEjercicio2Parte3();
        },
        ej2p4: function() {
            iniciarEjercicio2Parte4();
        },
        ej3p2: function() {
            iniciarEjercicio3Parte2();
        },
        ej3p3: function() {
            iniciarEjercicio3Parte3();
        },
        ej3p4: function() {
            iniciarEjercicio3Parte4();
        }
    }

})( window );

anemiaApp.pantallaUno();