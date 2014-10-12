//aqui van todas las acciones y funciones de javascript
//facor de comentarlas

var GUERRAFRIA = {

    $acordeon: null,
    $ventana1: null,
    $ventana2: null,
    $ventana3: null,
    $player1: null,
    $player2: null,

    totalInteracciones: 5,
    contadorInteracciones: 0,

    init: function() {

        var self = this;
        self.player1 = $("#player1");
        self.player2 = $("#player2");

        this.iniciarAcordeon();
    },

    iniciarAcordeon: function() {
        var self = this;

        var sonidoPanel = document.getElementById('sonido-panel');

        self.$acordeon = $('.acordeon');
        self.$ventana1 = $("#ventana-1");
        self.$ventana2 = $("#ventana-2");
        self.$ventana3 = $("#ventana-3");

        self.$acordeon.on("click", ".parte .llave", function(e) {
            e.preventDefault();
            var el = $(this).parent();
            if(el.hasClass("cerrado")) {
                sonidoPanel.pause();
                sonidoPanel.currentTime = 0;
                sonidoPanel.play();
                el.removeClass("cerrado");
                el.siblings().addClass("cerrado");
            }
        });

        $("#contexto")
            .click(function(e) {
                e.preventDefault();
                self.$ventana1.fadeIn();
            })
            .one("click",function() {
                self.contadorInteracciones++;
            });
        self.$ventana1.on('click', '.cerrar', function(e) {
            self.$ventana1.fadeOut(300,function(){
                self.chequearInteracciones();
            });
        });

        $("#jquery_jplayer_1").jPlayer({
            ready: function () {
                $(this).jPlayer("setMedia", {
                    title: "Doctrina Truman",
                    mp3: "audio/audio1.mp3"
                });
            },
            swfPath: "js",
            supplied: "mp3",
            wmode: "window",
            smoothPlayBar: true,
            keyEnabled: true,
            remainingDuration: true,
            toggleDuration: true
        });

        $("#jquery_jplayer_2").jPlayer({
            ready: function () {
                $(this).jPlayer("setMedia", {
                    title: "Informe Jdanov",
                    mp3: "audio/audio2.mp3"
                });
            },
            cssSelectorAncestor: "#jp_container_2",
            swfPath: "js",
            supplied: "mp3",
            wmode: "window",
            smoothPlayBar: true,
            keyEnabled: true,
            remainingDuration: true,
            toggleDuration: true
        });

        self.$ventana2
            .on('click', '.cerrar', function(e) {
                self.$ventana2.fadeOut();
                $("#jquery_jplayer_1").jPlayer("stop");
            })
            // .one("click",function() {
            //     self.contadorInteracciones++;
            // });
        self.$ventana3.on('click', '.cerrar', function(e) {
            self.$ventana3.fadeOut(300,function(){
                self.chequearInteracciones();
            });
            $("#jquery_jplayer_2").jPlayer("stop");
        });

        // parte 4
        $("#boton-capitalismo")
            .click(function(e) {
                $("#ventana-capitalismo").fadeIn();
            })
            .one("click",function() {
                self.contadorInteracciones++;
            });
        $("#ventana-capitalismo").on('click', '.cerrar', function(e) {
            $("#ventana-capitalismo").fadeOut(300, function(){
                self.chequearInteracciones();
            });
        });

        $("#boton-truman")
            .click(function(e) {
                $("#ventana-2").fadeIn();
            })
            .one("click",function() {
                self.contadorInteracciones++;
            });
        $("#ventana-2").on('click', '.cerrar', function(e) {
            $("#ventana-2").fadeOut(300, function(){
                self.chequearInteracciones();
            });
        });

        // parte 3
        $("#boton-socialismo")
            .click(function(e) {
                $("#ventana-socialismo").fadeIn();
            })
            .one("click",function() {
                self.contadorInteracciones++;
            });
        $("#ventana-socialismo").on('click', '.cerrar', function(e) {
            $("#ventana-socialismo").fadeOut(300, function(){
                self.chequearInteracciones();
            });
        });

        $("#boton-informe")
            .click(function(e) {
                $("#ventana-3").fadeIn();
            })
            .one("click",function() {
                self.contadorInteracciones++;
            });
        $("#ventana-3").on('click', '.cerrar', function(e) {
            $("#ventana-3").fadeOut(300,function() {
                self.chequearInteracciones();
            });
        });
    },

    chequearInteracciones: function() {
        var self = this;
        console.log(self.contadorInteracciones);
        if(self.contadorInteracciones >= 5) {
            self.iniciarEjercicio();
        }
    },

    iniciarEjercicio: function() {

        var self = this;
        var contadorRespuestas = 0;
        var respuestasTotales = 10;

        var $ventanaRespuestas = $("#ventana-respuestas");

        console.log("iniciar ejercicio!");
        $("#ejercicio").removeClass("cerrado").fadeIn();

        $(".droppable").hide();
        $(".droppable:first-child").show();

        $(".draggables li").shuffle();

        setTimeout(function() {
            $(".draggable").draggable({
                revert: "invalid"
            });

            $(".droppable").droppable({
                acept: '.draggable',
                drop: function(ev, ui) {

                    $ventanaRespuestas.fadeIn();
                    $ventanaRespuestas.find(".respuesta[data-respuesta='"+$(ev.target).data("respuesta")+"']").show();

                    if($(ui.draggable).data("respuesta") == $(ev.target).data("respuesta")) {
                        $(ev.target)
                            .droppable('disable')
                            .hide()
                            .next().show();
                        $(ui.draggable).draggable("disable").hide();

                        $ventanaRespuestas.find(".correcta").show();

                        // playSound("suceso");
                        contadorRespuestas++;

                    } else {
                        $ventanaRespuestas.find(".incorrecta").show();
                        // playSound("error");
                        $(ui.draggable).draggable("option","revert",true);
                        $(ui.draggable).draggable("option","revertDuration",300);
                        setTimeout(function(){
                            $(ui.draggable).draggable("option","revert","invalid");
                            // $(ui.draggable).draggable({revert:false});
                        },301);
                    }
                }
            });
        },300);


        $ventanaRespuestas.on("click", ".cerrar", function(e) {
            e.preventDefault();
            $ventanaRespuestas.fadeOut(300, function() {
                $ventanaRespuestas.find(".respuesta").hide();
                $ventanaRespuestas.find(".correcta").hide();
                $ventanaRespuestas.find(".incorrecta").hide();

                if(contadorRespuestas==respuestasTotales) self.pantallaFinal();
            });
        })
    },

    pantallaFinal: function() {
        $("#ventana-final").fadeIn();
    }

};

(function($){

    $.fn.shuffle = function() {

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

$(document).ready(function() {
    GUERRAFRIA.init();
});