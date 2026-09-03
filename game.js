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

    // Creamos una copia de las preguntas
    preguntasExamen = [...preguntas];

    // Mezclamos las preguntas aleatoriamente
    preguntasExamen.sort(() => Math.random() - 0.5);

    console.log("Alumno:", nombre);
    console.log("Curso:", curso);
    console.log("Hora de inicio:", horaInicio);

    // Ocultamos la pantalla inicial
    document.getElementById("pantallaInicio").style.display = "none";

    // Mostramos el examen
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

    pregunta.opciones.forEach((opcion, indice) => {

        const boton = document.createElement("button");

        boton.textContent = opcion;

        boton.onclick = function () {
            responder(indice);
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

    // Desactivamos todos los botones
    const botones = document.querySelectorAll("#opciones button");

    botones.forEach(boton => {
        boton.disabled = true;
    });

    // Esperamos y pasamos a la siguiente pregunta
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
