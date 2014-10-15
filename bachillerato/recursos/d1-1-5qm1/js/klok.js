//aqui van todas las acciones y funciones de javascript
//facor de comentarlas

var DISPERSION = {

    init: function() {
        // inicio

        var self = this;

        self.$sliderTemperatura = $("#slider-temperatura");
        self.$sliderFuerza = $("#slider-fuerza");
        self.$vaso = $("#vaso");
        self.$pantallas = $(".pantalla");
        self.total = self.$pantallas.length;
        self.posicion = 1;

        self.posicionEjercicio = 1;
        self.$preguntas = $(".pregunta");
        self.preguntasCorrectas = 0;

        self.initBindings();
        self.iniciarPantallas();

        self.iniciarPreguntas();
    },

    initBindings: function() {
        // Inicio de bindings
        var self = this,
            fuerza = 0,
            temp = 0;

        self.$sliderTemperatura.slider({
            min: 0,
            max: 100,
            slide: function(event, ui) {
                fuerza = self.$sliderFuerza.slider( "option", "value" );
                self.chequearEstado(ui.value, fuerza);
            }
        });

        self.$sliderFuerza.slider({
            min: 0,
            max: 2,
            step: 1,
            slide: function(event, ui) {
                temp = self.$sliderTemperatura.slider( "option", "value" );
                self.chequearEstado(temp, ui.value);
            }
        });

        $("#btnVanderwaals").click(function() {
            $(this).addClass("naranja");
            $(".contenedor-botones-izquierda").slideDown();
        });

        $(".botonera .btn").click(function() {
            var btn = $(this),
                id = btn.attr("data-id");

            if(id=="" || id==undefined) return;

            $(this).addClass("activa");
            $(".ventana[data-id='"+id+"']").fadeIn();
        });

        $(".ventana .cerrar").click(function() {
            $(this).parent().fadeOut();
        });

        $("#finale .cerrar").click(function() {
            if($("#finale").hasClass("bien")) {
                location.reload();
            } else {
                self.iniciarPreguntas(true);
                $(this).parent().fadeOut();
            }
        });
    },

    iniciarPantallas: function() {

        var self = this;

        self.$movimiento = $(".movimiento");

        self.$movimiento.children("a").click(function(e) {
            e.preventDefault();
            var that = $(this);
            if(that.hasClass("adelante")) {
                if(self.posicion == self.total) return;

                that.siblings().fadeIn();
                self.posicion++;
                var $pantalla = $(self.$pantallas[self.posicion-1]);

                $pantalla.siblings(".pantalla").fadeOut();
                $pantalla.fadeIn();

                if(self.posicion == self.total) that.fadeOut();

            } else if(that.hasClass("atras")) {

                if(self.posicion == 1) return;

                that.siblings().fadeIn();
                self.posicion--;
                var $pantalla = $(self.$pantallas[self.posicion-1]);

                $pantalla.siblings(".pantalla").fadeOut();
                $pantalla.fadeIn();

                if(self.posicion == 1) that.fadeOut();
            }
        });
    },

    iniciarPreguntas: function(reload) {
        var self = this;
        // si reload == true, relodeamos las preguntas
        self.posicionEjercicio = 1;
        self.$preguntas.hide();
        self.preguntasCorrectas = 0;
        $(self.$preguntas.selector + "[data-pregunta='1']").show();
        self.$preguntas.find(".opcion").removeClass("clicked activa");

        if(reload != true) {
            self.$preguntas.find(".opcion").click(function() {
                var $op = $(this);
                if($op.hasClass("clicked")) return;
                $op.addClass("clicked activa");
                $op.siblings().addClass("clicked");
                if($op.attr("data-correcta") == 1) {
                    self.preguntasCorrectas++;
                }
                if(self.posicionEjercicio == 10) {
                    self.grandFinale();
                    return;
                }
                setTimeout(function() {
                    $(".pregunta[data-pregunta='"+self.posicionEjercicio+"']").fadeOut(300,function(){
                        self.posicionEjercicio++;
                        $(".pregunta[data-pregunta='"+self.posicionEjercicio+"']").fadeIn();
                    });
                },500);
            });

            self.$preguntas.each(function() {
                $(this).find(".opcion").shuffle();
            });
        }
    },

    grandFinale: function() {
        var self = this,
            $finale = $("#finale");

        if(self.preguntasCorrectas > 8) {
            $finale.addClass("bien").removeClass("mal");
        } else {
            $finale.addClass("mal").removeClass("bien");
        }
        $finale.find(".respuestas-correctas").text( self.preguntasCorrectas );
        $finale.fadeIn();
    },

    chequearEstado: function(temperatura, fuerza) {
        var self = this;
        switch(fuerza) {
            case 0:
                if(temperatura<25) self.actualizarVaso("solido");
                else if(temperatura>=25 && temperatura<50) self.actualizarVaso("liquido");
                else if(temperatura>=50) self.actualizarVaso("vapor");
                break;
            case 1:
                if(temperatura<45) self.actualizarVaso("solido");
                else if(temperatura>=45 && temperatura<55) self.actualizarVaso("liquido");
                else if(temperatura>=55) self.actualizarVaso("vapor");
                break;
            case 2:
                if(temperatura<50) self.actualizarVaso("solido");
                else if(temperatura>=50 && temperatura<85) self.actualizarVaso("liquido");
                else if(temperatura>=85) self.actualizarVaso("vapor");
                break;
        }
    },

    actualizarVaso: function(estado) {
        var self = this;
        switch(estado) {
            case "liquido":
                self.$vaso.removeClass("solido vapor").addClass("liquido");
                break;
            case "solido":
                self.$vaso.removeClass("liquido vapor").addClass("solido");
                break;
            case "vapor":
                self.$vaso.removeClass("solido liquido").addClass("vapor");
                break;
        }

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

$(function() {
    DISPERSION.init();
})