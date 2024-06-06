// Obtener ID del producto desde la URL
const url = new URL(location.href);
const id_producto = url.searchParams.get('id');
// Referencia al contenedor de mensajes
const contenedorMensaje = document.getElementById('mensaje-accion');

// Función para obtener los detalles del producto por ID
const obtenerProducto = async (id_producto) => {
    try {
        const datos = await fetch(`http://localhost:3000/v1/productos/${id_producto}`);
        const jsonProducto = await datos.json();
        const producto = jsonProducto.productos[0];
        // Renderizar el formulario con los datos del producto
        renderizarFormulario(producto);
    } catch (error) {
        console.error(error);
    }
};

// Función para eliminar el producto
const eliminarProducto = (id_producto) => {
    const botonEliminar = document.getElementById('borrar-producto');
    botonEliminar.addEventListener('click', async () => {
        const confirmar = confirm('Está por eliminar un producto, ¿Continuar?');
        if (confirmar) {
            const respuesta = await fetch(`http://localhost:3000/v1/productos/${id_producto}`, {
                method: 'DELETE',
            });
            if (respuesta.ok) {
                // Redirigir al listado de productos después de eliminar
                location.href = './';
            }
        }
    });
};

// Función para renderizar el formulario con los datos del producto
const renderizarFormulario = (producto) => {
    const contenedor = document.getElementById('editar-producto');
    // Construimos el HTML del formulario con los campos adicionales
    let html = `<form id="formulario-editar" class="formulario-editar">
                    <label for="id-nombre">Nombre</label>
                    <input type="text" id="id-nombre" name="nombre" value="${producto.nombre}" required />
                    
                    <label for="id-marca">Marca</label>
                    <input type="text" id="id-marca" name="marca" value="${producto.marca}" required />

                    <label for="id-categoria">Categoría</label>
                    <input type="text" id="id-categoria" name="categoria" value="${producto.categoria}" required />

                    <label for="id-stock">Stock</label>
                    <input type="number" id="id-stock" name="stock" value="${producto.stock}" required />
                    
                    <button type="submit">Guardar</button>
                </form>`;
    // Asignamos el contenido generado al contenedor
    contenedor.innerHTML = html;

    // Añadimos el evento de submit al formulario
    const formulario = document.getElementById('formulario-editar');
    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();
        const datosCrudos = new FormData(formulario);
        const datosFormulario = Object.fromEntries(datosCrudos);
        const cuerpo = JSON.stringify(datosFormulario);
        // Envío asíncrono de los datos actualizados
        envioDatos(id_producto, cuerpo);
    });
};

// Función para enviar los datos actualizados a la API
const envioDatos = async (id_producto, cuerpo) => {
    const respuesta = await fetch(`http://localhost:3000/v1/productos/${id_producto}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: cuerpo,
    });
    // Manejo de la respuesta de la API
    if (respuesta.ok) {
        mostrarMensajeOk('Producto modificado exitosamente');
    } else if (respuesta.status === 400) {
        mostrarMensajeAlerta('Datos incompletos');
    } else {
        mostrarMensajeAlerta('Error desconocido');
    }
};

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

// Invocar funciones al cargar la página
obtenerProducto(id_producto);
eliminarProducto(id_producto);

// Manejo de la animación del mensaje de acción
contenedorMensaje.addEventListener('animationend', () => {
    contenedorMensaje.style.display = 'none';
});

