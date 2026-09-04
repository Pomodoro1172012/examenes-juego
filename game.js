// ========================================
// CONFIGURACIÓN
// ========================================

const URL_APPS_SCRIPT =
    "https://script.google.com/macros/s/AKfycbxRunM6BUjUQNyg1rXFrJqUtvToarADE1JDu-cmhae_ljq07cfCYOB737EmjrgWnyLT/exec";


// ========================================
// OBTENER ID DEL EXAMEN DESDE EL ENLACE
// ========================================

const parametros = new URLSearchParams(
    window.location.search
);

const idExamen = parametros.get("id");


// ========================================
// CARGAR EXAMEN DESDE GOOGLE
// ========================================

async function cargarExamen() {

    if (!idExamen) {

        alert(
            "No se encontró el ID del examen."
        );

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

            alert(
                "No se encontró ese examen."
            );

            return;

        }


        // Guardamos el examen en memoria
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
// INICIAR EXAMEN
// ========================================

function iniciarExamen() {

    const examen =
        window.configuracionExamen;


    console.log(
        "Iniciando examen:",
        examen
    );


    // Mostrar materia
    const titulo =
        document.querySelector("h1");


    if (titulo) {

        titulo.textContent =
            examen.materia;

    }


    // ========================================
    // ACÁ DESPUÉS VAMOS A CONECTAR
    // EL SISTEMA DE PREGUNTAS
    // ========================================

    console.log(
        "Cantidad de preguntas:",
        examen.cantidadPreguntas
    );

    console.log(
        "Preguntas:",
        examen.preguntas
    );

}


// ========================================
// COMENZAR
// ========================================

cargarExamen();
