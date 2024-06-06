// Implementación Front-End de API REST

// Función para obtener productos
const obtenemosProductos = async () => {
    // Solicitamos los datos de la API
    const datos = await fetch('http://localhost:3000/v1/productos');
    const jsonProductos = await datos.json();
    const productos = jsonProductos.productos;
    // Renderizamos los productos
    renderizar('productos', productos);
};

// Función para renderizar productos
const renderizar = (id, productos) => {
    // Obtenemos el contenedor donde se renderizarán los productos
    const contenedor = document.getElementById(id);
    // Construimos el HTML con la información de los productos
    let html = '';
    productos.forEach((producto) => {
        html += `<article class="producto">
                    <ul>
                        <li class="producto-nombre">Nombre: ${producto.nombre}</li>
                        <li class="producto-marca">Marca: ${producto.marca}</li>
                        <li class="producto-categoria">Categoría: ${producto.categoria}</li>
                        <li class="producto-stock">Stock: ${producto.stock}</li>
                        <li><a class="producto-editar" href="./editar.html?id=${producto.id}">Editar</a></li>
                    </ul>
                </article>`;
    });
    // Asignamos el contenido HTML generado al contenedor
    contenedor.innerHTML = html;
};

// ---------------------------------------------------------
// Invocar funciones ---------------------------------------
// ---------------------------------------------------------
obtenemosProductos();
