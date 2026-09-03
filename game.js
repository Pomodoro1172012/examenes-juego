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

    const pregunta = preguntas[preguntaActual];

    // Número de pregunta
    document.getElementById("numeroPregunta").textContent =
        "Pregunta " + (preguntaActual + 1);

    // Texto de la pregunta
    document.getElementById("textoPregunta").textContent =
        pregunta.pregunta;

    // Contenedor de opciones
    const contenedor = document.getElementById("opciones");

    // Limpiamos las opciones anteriores
    contenedor.innerHTML = "";

    // Creamos un botón para cada opción
    pregunta.opciones.forEach((opcion, indice) => {

        const boton = document.createElement("button");

        boton.textContent = opcion;

        boton.onclick = function () {
            responder(indice);
        };

        contenedor.appendChild(boton);
    });

    // Limpiamos el mensaje anterior
    document.getElementById("resultado").textContent = "";
}


// ========================================
// RESPONDER
// ========================================

function responder(indiceElegido) {

    const pregunta = preguntas[preguntaActual];
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

    // Esperamos un momento y pasamos a la siguiente
    setTimeout(() => {

        preguntaActual++;

        if (preguntaActual < preguntas.length) {
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

    const total = preguntas.length;

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
