// servidor.mjs

import { createServer } from 'node:http';
import { obtenerProductos, obtenerProductoPorID, crearProducto, modificarProducto, eliminarProducto } from './modulo.mjs';

const PUERTO = 3000;

const servidor = createServer(async (peticion, respuesta) => {
    if (peticion.method === 'OPTIONS') {
        respuesta.writeHead(200, {
            'access-control-allow-origin': '*',
            'access-control-allow-methods': 'GET,POST,PUT,DELETE',
            'access-control-allow-headers': 'Content-Type'
        });
        respuesta.end();
    } 
    // GET - Obtener
    else if (peticion.method === 'GET') {
        if (peticion.url === '/v1/productos') {
            obtenerProductos(respuesta);
        } else if (peticion.url.match('/v1/productos')) {
            obtenerProductoPorID(peticion, respuesta);
        } else {
            respuesta.writeHead(404, { 'Content-Type': 'text/plain' });
            respuesta.end('Ruta no encontrada');
        }
    } 
    // POST - Crear 
    else if (peticion.method === 'POST') {
        if (peticion.url === '/v1/productos') {
            crearProducto(peticion, respuesta);
        } else {
            respuesta.writeHead(404, { 'Content-Type': 'text/plain' });
            respuesta.end('Ruta no encontrada');
        }
    } 
    // PUT - Modificar
    else if (peticion.method === 'PUT') {
        if (peticion.url.match('/v1/productos')) {
            modificarProducto(peticion, respuesta);
        } else {
            respuesta.writeHead(404, { 'Content-Type': 'text/plain' });
            respuesta.end('Ruta no encontrada');
        }
    } 
    // DELETE - Eliminar
    else if (peticion.method === 'DELETE') {
        if (peticion.url.match('/v1/productos')) {
            eliminarProducto(peticion, respuesta);
        } else {
            respuesta.writeHead(404, { 'Content-Type': 'text/plain' });
            respuesta.end('Ruta no encontrada');
        }
    } else {
        respuesta.writeHead(405, { 'Content-Type': 'text/plain' });
        respuesta.end('Método no permitido');
    }
});

servidor.listen(PUERTO);
