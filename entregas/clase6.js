// const Contenedor = require('../js/clase4b.js')
// const express = require('express')
const http = require("http")

const server = http.createServer((peticion, respuesta) => {

    const url = peticion.url

    switch (url) {
        case '/':
            return respuesta.end('Hola Mundo')
        case '/productos':
            return respuesta.end('Endpoint de productos')
        case '/visitas':
            return respuesta.end('Endpoint de visitas')
        default:
            return respuesta.end('Endpoint no encontrado')
    }
}
)

const connectedServer = server.listen(8080, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${connectedServer.address().port}`)
})

// const app = express()

// const PORT = 8080

// const server = app.listen(PORT, () => {
//     console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
// })

// app.get('', (req, res) => {
//     res.send({ mensaje: 'Hola mundo' })
// })

// app.get('/productos', (req, res) => {
//     const contenedor = new Contenedor('test.txt')
//     contenedor.getRandom()
//     res.send('Endpoint de productos')
// })

// app.get('/visitas', (req, res) => {
//     res.send('Endpoint de visitas')
// })

// server.on('error', (error) => console.log(`Error en servidor: ${error}`))