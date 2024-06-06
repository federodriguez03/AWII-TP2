// Contenedor para mensajes
const contenedorMensaje = document.getElementById('mensaje-accion');

// Función para mostrar mensaje de éxito
const mostrarMensajeOk = (mensaje) => {
    contenedorMensaje.textContent = mensaje;
    contenedorMensaje.style.display = 'block';
    contenedorMensaje.classList.add('mensaje-accion-ok');
};

// Función para mostrar mensaje de alerta
const mostrarMensajeAlerta = (mensaje) => {
    contenedorMensaje.textContent = mensaje;
    contenedorMensaje.style.display = 'block';
    contenedorMensaje.classList.add('mensaje-accion-alerta');
};

// Función para registrar un nuevo producto
const registrarProducto = () => {
    const formulario = document.getElementById('formulario-nuevo');
    formulario.addEventListener('submit', async (evento) => {
        evento.preventDefault();
        const datosCrudos = new FormData(formulario);
        const datosFormulario = Object.fromEntries(datosCrudos);
        const cuerpo = JSON.stringify(datosFormulario);
        
        try {
            const respuesta = await fetch('http://localhost:3000/v1/productos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: cuerpo,
            });
            
            if (respuesta.ok) {
                mostrarMensajeOk('Producto dado de alta');
                formulario.reset();
            } else {
                if (respuesta.status === 400) {
                    mostrarMensajeAlerta('Datos incompletos');
                } else {
                    mostrarMensajeAlerta('Error desconocido');
                }
            }
        } catch (error) {
            mostrarMensajeAlerta('Error de red o servidor');
            console.error(error);
        }
    });
};

// Invocar funciones al cargar la página
registrarProducto();

// Manejo de la animación del mensaje de acción
contenedorMensaje.addEventListener('animationend', () => {
    contenedorMensaje.style.display = 'none';
});