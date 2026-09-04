// ========================================
// CONFIGURACIÓN DEL EXAMEN
// ========================================

// Intentamos obtener el examen creado por la profesora
const datosGuardados =
    localStorage.getItem("configuracionExamen");

let configuracionExamen = null;

if (datosGuardados !== null) {

    configuracionExamen =
        JSON.parse(datosGuardados);

}


// ========================================
// PREGUNTAS DE PRUEBA
// ========================================

const preguntasPrueba = [

    {
        pregunta: "¿Cuál es la capital de Argentina?",

        opciones: [
            "Córdoba",
            "Buenos Aires",
            "Rosario",
            "Mendoza"
        ],

        correcta: 1
    },


    {
        pregunta: "¿Cuánto es 2 + 2?",

        opciones: [
            "3",
            "4",
            "5",
            "6"
        ],

        correcta: 1
    }

];


// ========================================
// VARIABLES DEL EXAMEN
// ========================================

let preguntaActual = 0;

let aciertos = 0;

let horaInicio = null;

let preguntasExamen = [];


// ========================================
// CARGAR MATERIA
// ========================================

window.addEventListener("DOMContentLoaded", function () {

    if (configuracionExamen !== null) {

        document.getElementById("nombreMateria").textContent =
            configuracionExamen.materia;

    }

});


// ========================================
// COMENZAR EXAMEN
// ========================================

function comenzarExamen() {

    const nombre =
        document
            .getElementById("nombre")
            .value
            .trim();


    const curso =
        document
            .getElementById("curso")
            .value
            .trim();


    if (nombre === "" || curso === "") {

        alert(
            "Completá tu nombre y tu curso."
        );

        return;
    }


    // Guardamos la hora exacta de inicio

    horaInicio = new Date();


    // Reiniciamos los datos

    preguntaActual = 0;

    aciertos = 0;


    // ========================================
    // ELEGIR LAS PREGUNTAS
    // ========================================

    if (
        configuracionExamen !== null &&
        configuracionExamen.preguntas &&
        configuracionExamen.preguntas.length > 0
    ) {

        // Usamos las preguntas creadas por la profesora

        preguntasExamen =
            [...configuracionExamen.preguntas];

    } else {

        // Si no hay configuración,
        // usamos las preguntas de prueba

        preguntasExamen =
            [...preguntasPrueba];

    }


    // ========================================
    // MEZCLAR PREGUNTAS
    // ========================================

    for (
        let i = preguntasExamen.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );


        const temporal =
            preguntasExamen[i];


        preguntasExamen[i] =
            preguntasExamen[j];


        preguntasExamen[j] =
            temporal;

    }


    // ========================================
    // CANTIDAD DE PREGUNTAS
    // ========================================

    let cantidad;


    if (configuracionExamen !== null) {

        cantidad =
            configuracionExamen.cantidadPreguntas;

    } else {

        cantidad =
            preguntasExamen.length;

    }


    preguntasExamen =
        preguntasExamen.slice(
            0,
            cantidad
        );


    console.log(
        "Alumno:",
        nombre
    );


    console.log(
        "Curso:",
        curso
    );


    console.log(
        "Hora de inicio:",
        horaInicio
    );


    console.log(
        "Preguntas del examen:",
        preguntasExamen
    );


    // ========================================
    // MOSTRAR EXAMEN
    // ========================================

    document
        .getElementById("pantallaInicio")
        .style.display = "none";


    document
        .getElementById("pantallaExamen")
        .style.display = "block";


    mostrarPregunta();

}


// ========================================
// MOSTRAR PREGUNTA
// ========================================

function mostrarPregunta() {

    const pregunta =
        preguntasExamen[preguntaActual];


    document
        .getElementById("numeroPregunta")
        .textContent =
            "Pregunta " +
            (preguntaActual + 1);


    document
        .getElementById("textoPregunta")
        .textContent =
            pregunta.pregunta;


    const contenedor =
        document.getElementById("opciones");


    contenedor.innerHTML = "";


    // ========================================
    // MEZCLAR OPCIONES
    // ========================================

    const opcionesMezcladas =
        pregunta.opciones.map(
            (texto, indice) => {

                return {

                    texto: texto,

                    indiceOriginal: indice

                };

            }
        );


    for (
        let i = opcionesMezcladas.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );


        const temporal =
            opcionesMezcladas[i];


        opcionesMezcladas[i] =
            opcionesMezcladas[j];


        opcionesMezcladas[j] =
            temporal;

    }


    // ========================================
    // CREAR BOTONES
    // ========================================

    opcionesMezcladas.forEach(
        opcion => {

            const boton =
                document.createElement(
                    "button"
                );


            boton.textContent =
                opcion.texto;


            boton.onclick =
                function () {

                    responder(
                        opcion.indiceOriginal
                    );

                };


            contenedor.appendChild(
                boton
            );

        }
    );


    document
        .getElementById("resultado")
        .textContent = "";

}


// ========================================
// RESPONDER
// ========================================

function responder(indiceElegido) {

    const pregunta =
        preguntasExamen[preguntaActual];


    const resultado =
        document.getElementById("resultado");


    if (
        indiceElegido ===
        pregunta.correcta
    ) {

        aciertos++;


        resultado.textContent =
            "✅ ¡Correcto!";

    } else {

        resultado.textContent =
            "❌ Incorrecto. La respuesta correcta es: " +
            pregunta.opciones[
                pregunta.correcta
            ];

    }


    // Desactivamos los botones

    const botones =
        document.querySelectorAll(
            "#opciones button"
        );


    botones.forEach(
        boton => {

            boton.disabled = true;

        }
    );


    // Siguiente pregunta

    setTimeout(
        () => {

            preguntaActual++;


            if (
                preguntaActual <
                preguntasExamen.length
            ) {

                mostrarPregunta();

            } else {

                terminarExamen();

            }

        },
        1500
    );

}


// ========================================
// TERMINAR EXAMEN
// ========================================

function terminarExamen() {

    const total =
        preguntasExamen.length;


    document
        .getElementById("numeroPregunta")
        .textContent =
            "Examen terminado";


    document
        .getElementById("textoPregunta")
        .textContent =
            "¡Terminaste!";


    document
        .getElementById("opciones")
        .innerHTML = "";


    document
        .getElementById("resultado")
        .textContent =
            "Aciertos: " +
            aciertos +
            " de " +
            total;


    console.log(
        "Aciertos:",
        aciertos
    );


    console.log(
        "Hora de inicio:",
        horaInicio
    );

}
