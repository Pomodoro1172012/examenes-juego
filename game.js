// ========================================
// PREGUNTAS
// ========================================

const preguntas = [
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
// COMENZAR EXAMEN
// ========================================

function comenzarExamen() {

    const nombre = document.getElementById("nombre").value.trim();
    const curso = document.getElementById("curso").value.trim();

    if (nombre === "" || curso === "") {
        alert("Completá tu nombre y tu curso.");
        return;
    }

    // Guardamos la hora exacta de inicio
    horaInicio = new Date();

    // Reiniciamos los datos
    preguntaActual = 0;
    aciertos = 0;

   // Copiamos todas las preguntas
preguntasExamen = [...preguntas];

// Mezclamos las preguntas
for (let i = preguntasExamen.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    const temporal = preguntasExamen[i];

    preguntasExamen[i] = preguntasExamen[j];

    preguntasExamen[j] = temporal;
}

// Nos quedamos solamente con la cantidad elegida
preguntasExamen = preguntasExamen.slice(0, configuracion.cantidadPreguntas);
    console.log("Alumno:", nombre);
    console.log("Curso:", curso);
    console.log("Hora de inicio:", horaInicio);

    // Ocultamos inicio
    document.getElementById("pantallaInicio").style.display = "none";

    // Mostramos examen
    document.getElementById("pantallaExamen").style.display = "block";

    mostrarPregunta();
}


// ========================================
// MOSTRAR PREGUNTA
// ========================================
function mostrarPregunta() {

    const pregunta = preguntasExamen[preguntaActual];

    document.getElementById("numeroPregunta").textContent =
        "Pregunta " + (preguntaActual + 1);

    document.getElementById("textoPregunta").textContent =
        pregunta.pregunta;

    const contenedor = document.getElementById("opciones");

    contenedor.innerHTML = "";

    // Creamos una copia de las opciones
    const opcionesMezcladas = pregunta.opciones.map((texto, indice) => {
        return {
            texto: texto,
            indiceOriginal: indice
        };
    });

    // MEZCLAR OPCIONES
    for (let i = opcionesMezcladas.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        const temporal = opcionesMezcladas[i];

        opcionesMezcladas[i] = opcionesMezcladas[j];

        opcionesMezcladas[j] = temporal;
    }

    // Crear botones
    opcionesMezcladas.forEach(opcion => {

        const boton = document.createElement("button");

        boton.textContent = opcion.texto;

        boton.onclick = function () {
            responder(opcion.indiceOriginal);
        };

        contenedor.appendChild(boton);
    });

    document.getElementById("resultado").textContent = "";
}

// ========================================
// RESPONDER
// ========================================

function responder(indiceElegido) {

    const pregunta = preguntasExamen[preguntaActual];

    const resultado = document.getElementById("resultado");

    if (indiceElegido === pregunta.correcta) {

        aciertos++;

        resultado.textContent = "✅ ¡Correcto!";

    } else {

        resultado.textContent =
            "❌ Incorrecto. La respuesta correcta es: " +
            pregunta.opciones[pregunta.correcta];
    }

    // Desactivamos los botones
    const botones = document.querySelectorAll("#opciones button");

    botones.forEach(boton => {
        boton.disabled = true;
    });

    // Pasamos a la siguiente pregunta
    setTimeout(() => {

        preguntaActual++;

        if (preguntaActual < preguntasExamen.length) {

            mostrarPregunta();

        } else {

            terminarExamen();
        }

    }, 1500);
}


// ========================================
// TERMINAR EXAMEN
// ========================================

function terminarExamen() {

    const total = preguntasExamen.length;

    document.getElementById("numeroPregunta").textContent =
        "Examen terminado";

    document.getElementById("textoPregunta").textContent =
        "¡Terminaste!";

    document.getElementById("opciones").innerHTML = "";

    document.getElementById("resultado").textContent =
        "Aciertos: " + aciertos + " de " + total;

    console.log("Aciertos:", aciertos);
    console.log("Hora de inicio:", horaInicio);
}
window.addEventListener("DOMContentLoaded", function () {

    document.getElementById("nombreMateria").textContent =
        configuracion.materia;

});
