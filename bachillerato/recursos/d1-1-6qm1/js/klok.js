//aqui van todas las acciones y funciones de javascript
//facor de comentarlas

var NOMBREAPP = {
    init: function() {

        var self = this;

        var sonidoError = document.getElementById('sonido-error');

        $("#panelReel").swipe("disable");

        $(".secc1 .boton-siguiente").click(function() {
            unLock();
            goTo(2);
        });

        $(".secc2 .boton-siguiente").click(function() {
            unLock();
            goTo(3);
        });

        $(".ventana .cerrar").click(function() {
            $(".ventana").fadeOut();
        });

        $(".draggable").shuffle();

        $(".draggable").draggable();

        $(".droppable").droppable({
            drop: function(event, ui) {
                var $drop = $(this),
                    $drag = $(ui.draggable);
                if($drop.attr("data-correcto") == $drag.attr("data-correcto")) {
                    $drop.css({ "background": "url("+$drag.attr("src")+")" });
                    $drag.draggable("disable").hide();
                    $(".ventana").fadeIn().find(".retroalimentacion").text( $drag.attr("data-feedback") );
                } else {
                    sonidoError.play();

                    $drag.draggable("option", "revert", true);
                    setTimeout(function() {
                        $drag.draggable("option", "revert", false);
                    }, 300);
                }
            }
        })
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
    NOMBREAPP.init();
})