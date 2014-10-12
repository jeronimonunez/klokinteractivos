titulo = "Pequeño cambio, graves consecuencias";

// biologia // etimologias // fisica // geografia // historiamex // historiauniv // sociales // literatura // matematicas // quimica
asignatura = "biologia";  // con minúsculas, sin caracteres especiales ni espacios

// texto de introducción
intro = 'La secuencia de ácidos nucléicos del ADN proporciona la receta exacta para producir una proteína. ¿Sábes cómo se produce? ¿Qué sucede si por alguna situacón un  ácido nucléico se mueve de lugar?';

// 'info' 'ayuda' 'nuevo' etc...
botones = ['anterior','siguiente','documento','instruccion','pausa','reproducir'];
/*agregar o quitar botones, separar con comas. Con cada botón que se agregue se genera un id con su nombre, por ejemplo: '#imprimir', '#info'.
//Los botones de regreso a portada y reinicio de la actividad ya tienen graficos preconfigurados, solo hace falta programar '#reiniciar'.
//Agregar  los gráficos de los botones en formato png a la carpeta 'img-html'*/

centrar =  true  //centrar automáticamente el interactivo, true o false
transicion = 'vertical' // horizontal // vertical //fade

var paneles = [
/// agregar o quitar segmentos  entre corchetes, según el número de sections que tenga el html.
/// separar  con comas.  ejemplo: {...}, {...}, {...}
{//panel 1
	"instrucciones" : "Lee la informción. Pulsa el icono para ver el video, al terminar, haz clic en la flecha de avance.", // opcional, si no se ocupa quitar todo el renglón
	"bloqueado" : true //true o false
},

{//panel 2
	"instrucciones" : "De acuerdo con el fragmento del gen HbA que codifica a la hemoglobina, arrastra las bases nitrogenadas que correspondan. Recuerda que en el ARN en lugar de tiamina se usa la base uracilo.",
	"bloqueado" : true //true o false
},

{//panel 3
	"instrucciones" : "De acuerdo con la secuencia de bases nitrogenadas del ARN-mensajero, arrastra las bases que corresponda. ",
	"bloqueado" : true //true o false
},

{//panel 4
	"instrucciones" : "¿Qué ocurre si por alguna razón se  cambia la secuencia de un par de las bases del gen HbS? Arrastra las bases y aminoácidos al lugar  que corresponda. ",
	"bloqueado" : false //true o false
}

] // termina paneles