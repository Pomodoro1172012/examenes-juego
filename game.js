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

function iniciarExamen() {

    const examen =
        window.configuracionExamen;


    // Buscar el lugar donde van las preguntas
    let contenedor =
        document.getElementById("preguntas");


    // Si no existe, lo creamos
    if (!contenedor) {

        contenedor =
            document.createElement("div");

        contenedor.id = "preguntas";


        document.body.appendChild(
            contenedor
        );

    }


    // Limpiar contenido anterior
    contenedor.innerHTML = "";


    // Mostrar materia
    const titulo =
        document.querySelector("h1");


    if (titulo) {

        titulo.textContent =
            examen.materia;

    }


    // ========================================
    // MOSTRAR CADA PREGUNTA
    // ========================================

    examen.preguntas.forEach(
        (pregunta, indice) => {

            const bloque =
                document.createElement("div");


            bloque.className =
                "pregunta";


            const textoPregunta =
                document.createElement("h2");


            textoPregunta.textContent =
                (indice + 1) +
                ". " +
                pregunta.pregunta;


            bloque.appendChild(
                textoPregunta
            );


            // ========================================
            // CREAR OPCIONES
            // ========================================

            pregunta.opciones.forEach(
                (opcion, indiceOpcion) => {

                    const boton =
                        document.createElement("button");


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
                        document.createElement("br")
                    );

                }
            );


            contenedor.appendChild(
                bloque
            );

        }
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


    // Desactivar todos los botones
    botones.forEach(
        boton => {

            boton.disabled = true;

        }
    );


    if (
        respuestaElegida ===
        pregunta.correcta
    ) {

        alert("✅ ¡Correcto!");

    } else {

        alert(
            "❌ Incorrecto.\n\n" +
            "La respuesta correcta era: " +
            pregunta.opciones[
                pregunta.correcta
            ]
        );

    }

}


// ========================================
// COMENZAR
// ========================================

cargarExamen();
