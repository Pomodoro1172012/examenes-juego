// ========================================
// MOTOR DEL JUEGO
// ========================================

// Por ahora usamos preguntas de prueba.
// Más adelante estas preguntas NO estarán
// escritas acá: las podrá configurar el profesor.

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

    const nombre = document.getElementById("nombre").value;
    const curso = document.getElementById("curso").value;

    if (nombre === "" || curso === "") {
        alert("Completá tu nombre y tu curso.");
        return;
    }

    // Guardamos la hora exacta en la que comenzó
    horaInicio = new Date();

    console.log("Alumno:", nombre);
    console.log("Curso:", curso);
    console.log("Hora de inicio:", horaInicio);

    mostrarPregunta();
}


// ========================================
// MOSTRAR PREGUNTA
// ========================================

function mostrarPregunta() {

    const pregunta = preguntas[preguntaActual];

    console.log("Pregunta:", pregunta.pregunta);
}
