const Contenedor = require('../js/clase4.js')
const express = require('express')

const app = express()

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

app.get('', (req, res) => {
    res.send({ mensaje: 'Hola mundo' })
})

app.get('/productos', (req, res) => {
    const contenedor = new Contenedor('test.txt')
    contenedor.getRandom()
    res.send('Endpoint de productos')
})

app.get('/visitas', (req, res) => {
    res.send('Endpoint de visitas')
})


server.on('error', (error) => console.log(`Error en servidor: ${error}`))