// modulo.mjs

import { readFile, writeFile } from 'node:fs';
import { join, parse } from 'node:path';

const v1 = join('api', 'v1');

export const obtenerProductos = (respuesta) => {
    const ruta = join(v1, 'productos.json');
    readFile(ruta, (error, datos) => {
        if (error) {
            respuesta.writeHead(500, { 'Content-Type': 'text-plain' });
            respuesta.end('Error de servidor');
        } else {
            respuesta.writeHead(200, {
                'Content-Type': 'application/json;charset=utf-8',
                'access-control-allow-origin': '*'
            });
            respuesta.end(datos);
        }
    });
};

export const obtenerProductoPorID = (peticion, respuesta) => {
    const ruta = join(v1, 'productos.json');
    readFile(ruta, (error, datos) => {
        if (error) {
            respuesta.writeHead(500, { 'Content-Type': 'text-plain' });
            respuesta.end('Error de servidor');
        } else {
            const id = parse(peticion.url).base;
            const objetoJSON = JSON.parse(datos);
            const arregloProductos = objetoJSON.productos;
            const productoIndividual = arregloProductos.find((producto) => {
                return (parseInt(producto.id) === parseInt(id));
            });
            if (productoIndividual) {
                respuesta.writeHead(200, {
                    'Content-Type': 'application/json;charset=utf-8',
                    'access-control-allow-origin': '*'
                });
                const jsonCompleto = `{"productos": [${JSON.stringify(productoIndividual)}]}`;
                respuesta.end(jsonCompleto);
            } else {
                respuesta.writeHead(404, { 'Content-Type': 'application/json;charset=utf-8' });
                respuesta.end(datos);
            }
        }
    });
};

export const crearProducto = (peticion, respuesta) => {
    let datosDelCliente = '';
    peticion.on('data', (pedacitos) => {
        datosDelCliente += pedacitos;
    });
    peticion.on('error', () => {
        console.error(error);
        respuesta.writeHead(500, { 'Content-Type': 'text-plain;charset=utf-8' });
        respuesta.end('Error en el servidor');
    });
    peticion.on('end', () => {
        const ruta = join(v1, 'productos.json');
        readFile(ruta, (error, datos) => {
            if (error) {
                respuesta.writeHead(500, { 'Content-Type': 'text-plain' });
                respuesta.end('Error de servidor');
            } else {
                const datosJSON = JSON.parse(datos);
                const arregloDeIds = datosJSON.productos.map((producto) => parseInt(producto.id));
                const id = Math.max(...arregloDeIds) + 1;
                const nuevoProducto = JSON.parse(datosDelCliente);
                const objetoProducto = {
                    id: id,
                    nombre: nuevoProducto.nombre,
                    marca: nuevoProducto.marca,
                    categoria: nuevoProducto.categoria,
                    stock: nuevoProducto.stock
                };
                datosJSON.productos.push(objetoProducto);
                const DatosJSONCadena = JSON.stringify(datosJSON);
                writeFile(ruta, DatosJSONCadena, (error) => {
                    if (error) {
                        respuesta.writeHead(500, { 'Content-Type': 'text-plain' });
                        respuesta.end('Error de servidor');
                    } else {
                        console.log('Archivo insertado');
                    }
                });
                respuesta.writeHead(201, {
                    'content-Type': 'text/plain;charset=utf-8',
                    'access-control-allow-origin': '*'
                });
                respuesta.end('Recurso creado correctamente');
            }
        });
    });
};

export const modificarProducto = (peticion, respuesta) => {
    let payload = '';
    peticion.on('data', (paquetes) => { payload += paquetes });
    peticion.on('error', (error) => {
        console.log(error);
        respuesta.writeHead(500, { 'Content-Type': 'text/plain; charset=utf8' });
        respuesta.end('Error al recibir los datos en el servidor');
    });
    peticion.on('end', () => {
        const ruta = join(v1, 'productos.json');
        const id = parse(peticion.url).base;
        readFile(ruta, (error, datos) => {
            if (error) {
                respuesta.writeHead(500, { 'Content-Type': 'text/plain' });
                respuesta.end('Error al leer el archivo.');
            } else {
                const objetoJSON = JSON.parse(datos);
                const objetoUsuario = JSON.parse(payload);
                const arrayProductos = objetoJSON.productos;
                const indiceProducto = arrayProductos.findIndex((elemento) => parseInt(elemento.id) === parseInt(id));
                if (indiceProducto !== -1) {
                    arrayProductos[indiceProducto] = {
                        id: id,
                        nombre: objetoUsuario.nombre,
                        marca: objetoUsuario.marca,
                        categoria: objetoUsuario.categoria,
                        stock: objetoUsuario.stock
                    };
                    objetoJSON.productos = arrayProductos;
                    writeFile(ruta, JSON.stringify(objetoJSON), (error) => {
                        if (error) {
                            respuesta.writeHead(500, { 'Content-Type': 'text/plain' });
                            respuesta.end('Error al escribir en el archivo.');
                        } else {
                            respuesta.writeHead(200, {
                                'Content-Type': 'application/json;charset=utf-8',
                                'access-control-allow-origin': '*'
                            });
                            respuesta.end('Producto modificado con éxito.');
                        }
                    });
                } else {
                    respuesta.writeHead(404, { 'Content-Type': 'text/plain' });
                    respuesta.end('Producto no encontrado.');
                }
            }
        });
    });
};

export const eliminarProducto = (peticion, respuesta) => {
    const ruta = join(v1, 'productos.json');
    const id = parse(peticion.url).base;
    readFile(ruta, (error, datos) => {
        if (error) {
            respuesta.writeHead(500, { 'Content-Type': 'text-plain' });
            respuesta.end('Error de servidor');
        } else {
            const objetoJSON = JSON.parse(datos);
            const arregloProductos = objetoJSON.productos;
            const arregloProductosNuevo = arregloProductos.filter((producto) => {
                return parseInt(producto.id) !== parseInt(id);
            });
            objetoJSON.productos = arregloProductosNuevo;
            const datosObjetoJSON = JSON.stringify(objetoJSON);
            writeFile(ruta, datosObjetoJSON, (error) => {
                if (error) {
                    respuesta.writeHead(500, { 'Content-Type': 'text-plain' });
                    respuesta.end('Error en el servidor');
                } else {
                    respuesta.writeHead(200, {
                        'Content-Type': 'text/plain',
                        'access-control-allow-origin': '*'
                    });
                    respuesta.end('Producto eliminado');
                }
            });
        }
    });
};
