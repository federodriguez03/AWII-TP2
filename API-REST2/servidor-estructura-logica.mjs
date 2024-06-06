// Importamos el módulo para crear servidor
import {createServer} from 'node:http'

// Puerto
const PUERTO = 3000

const servidor = createServer((peticion, respuesta)=>{
    // OPTIONS - Preflight 
        // Avisamos que se puede enviar los datos CORS
    // GET - Obtener
    if(peticion.method === 'GET'){
        // RUTA 1 - Obtener productos
        // /v1/productos
        if (peticion.url === '/v1/productos'){
        
        
        } 
        // RUTA 2 - Obtener 1 producto por ID
        // /v1/productos/{id}
        else if (peticion.url.match === '/v1/productos/{id}'){

        } else {
            // respondemos que la ruta no existe

        }
        
    }
    // POST - Crear 
    else if(peticion.method === 'POST'){
        // RUTA - Crear nuevo producto
        // /v1/productos
        if(peticion.url === '/v1/productos'){

        } else {
            //
        }
    }
    // PUT - Modificar
    else if(peticion.method === 'PUT'){
        // RUTA - Modificar un producto por su ID
        // /v1/productos/{id}
        if (peticion.url.match === '/v1/productos/{id}'){

        } else {

        }
    }
    // DELETE - Eliminar
    else if(peticion.method === 'DELETE'){
        // RUTA - Eliminar un producto
        //v1/productos/{id}
        if (peticion.url.match === 'v1/productos/{id}'){

        } else {
            //            
        }
    } else {
        respuesta.end('Ruta no encontrada')
    }
})

servidor.listen(PUERTO);