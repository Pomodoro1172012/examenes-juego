// ========================================
// CONFIGURACIÓN
// ========================================

const URL_APPS_SCRIPT =
    "https://script.google.com/macros/s/AKfycbxRunM6BUjUQNyg1rXFrJqUtvToarADE1JDu-cmhae_ljq07cfCYOB737EmjrgWnyLT/exec";


// ========================================
// OBTENER ID DEL EXAMEN
// ========================================

const parametros = new URLSearchParams(
    window.location.search
);

const idExamen = parametros.get("id");


// ========================================
// CARGAR EXAMEN
// ========================================

async function cargarExamen() {

    if (!idExamen) {

        alert("No se encontró el ID del examen.");

        return;
    }


    try {

        const respuesta =
            await fetch(
                URL_APPS_SCRIPT +
                "?id=" +
                encodeURIComponent(idExamen)
            );


        const datos =
            await respuesta.json();


        console.log(
            "Examen recibido:",
            datos
        );


        if (!datos.ok) {

            alert("No se encontró ese examen.");

            return;
        }


        window.configuracionExamen =
            datos.examen;


        console.log(
            "Configuración cargada:",
            window.configuracionExamen
        );


        iniciarExamen();


    } catch (error) {

        console.error(
            "Error cargando examen:",
            error
        );


        alert(
            "No se pudo cargar el examen."
        );

    }

}


// ========================================
// MOSTRAR EXAMEN
// ========================================

// ========================================
// INICIAR EXAMEN
// ========================================

let preguntaActual = 0;


function iniciarExamen() {

    const examen =
        window.configuracionExamen;


    let contenedor =
        document.getElementById("preguntas");


    if (!contenedor) {

        contenedor =
            document.createElement("div");

        contenedor.id =
            "preguntas";

        document.body.appendChild(
            contenedor
        );

    }


    contenedor.innerHTML = "";


    const titulo =
        document.querySelector("h1");


    if (titulo) {

        titulo.textContent =
            examen.materia;

    }


    mostrarPregunta();

}


// ========================================
// MOSTRAR UNA SOLA PREGUNTA
// ========================================

function mostrarPregunta() {

    const examen =
        window.configuracionExamen;


    const contenedor =
        document.getElementById(
            "preguntas"
        );


    contenedor.innerHTML = "";


    // Si ya terminamos
    if (
        preguntaActual >=
        examen.preguntas.length
    ) {

        mostrarFinal();

        return;

    }


    const pregunta =
        examen.preguntas[
            preguntaActual
        ];


    const bloque =
        document.createElement("div");


    bloque.className =
        "pregunta";


    const numero =
        document.createElement("h2");


    numero.textContent =
        "Pregunta " +
        (preguntaActual + 1) +
        " de " +
        examen.preguntas.length;


    bloque.appendChild(
        numero
    );


    const texto =
        document.createElement("h3");


    texto.textContent =
        pregunta.pregunta;


    bloque.appendChild(
        texto
    );


    // Crear respuestas
    pregunta.opciones.forEach(
        (opcion, indiceOpcion) => {

            const boton =
                document.createElement(
                    "button"
                );


            boton.textContent =
                opcion;


            boton.type =
                "button";


            boton.className =
                "opcion";


            boton.onclick =
                function () {

                    comprobarRespuesta(
                        pregunta,
                        indiceOpcion,
                        bloque
                    );

                };


            bloque.appendChild(
                boton
            );


            bloque.appendChild(
                document.createElement(
                    "br"
                )
            );

        }
    );


    contenedor.appendChild(
        bloque
    );

}


// ========================================
// COMPROBAR RESPUESTA
// ========================================

function comprobarRespuesta(
    pregunta,
    respuestaElegida,
    bloque
) {

    const botones =
        bloque.querySelectorAll(
            ".opcion"
        );


    botones.forEach(
        boton => {

            boton.disabled = true;

        }
    );


    if (
        respuestaElegida ===
        pregunta.correcta
    ) {

        alert(
            "✅ ¡Correcto!"
        );

    } else {

        alert(
            "❌ Incorrecto.\n\n" +
            "La respuesta correcta era: " +
            pregunta.opciones[
                pregunta.correcta
            ]
        );

    }


    // Pasar a la siguiente
    preguntaActual++;


    mostrarPregunta();

}


// ========================================
// FINAL DEL EXAMEN
// ========================================

function mostrarFinal() {

    const contenedor =
        document.getElementById(
            "preguntas"
        );


    contenedor.innerHTML = `

        <h2>🎉 Examen terminado</h2>

        <p>
            Completaste todas las preguntas.
        </p>

    `;

}

// ========================================
// COMENZAR
// ========================================

cargarExamen();
