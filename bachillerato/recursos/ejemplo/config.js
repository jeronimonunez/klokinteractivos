titulo = "Un régimen totalitario: el nazismo";

// biologia // etimologias // fisica // geografia // historiamex // historiauniv // sociales // literatura // matematicas // quimica
asignatura = "historiauniv";  // con minúsculas, sin caracteres especiales ni espacios

// texto de introducción
intro = '¿Por qué el nazismo pudo controlar la vida de la población alemana? ¿Qué hizo para ganarse el apoyo de la gente?';

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
	"instrucciones" : "Revisa cada tarjeta.", // opcional, si no se ocupa quitar todo el renglón
	"bloqueado" : true //true o false
},
{//panel 1
	"instrucciones" : "Arrastra el termino que corresponda al enunciado que aparece en pantalla.", // opcional, si no se ocupa quitar todo el renglón
	"bloqueado" : false //true o false
}

] // termina paneles