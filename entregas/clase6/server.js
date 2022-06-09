const express = require("express")
const Contenedor = require("./api.js")
const fs = require("fs")

const app = express()
const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${PORT}`)
})

server.on("error", error => console.log(`Error en el servidor: ${error}`))

app.get('/', (req, res) => {
    res.send(`<h1 style="color: blue; font-family: Roboto">Bienvenidos al servidor express</h1>`)
})

app.get('/productos', (req, res) => {
    ; (async () => {
        const contenedor = new Contenedor("./productos.txt")
        const getAll = await contenedor.getAll()
        res.send(getAll) //Resultado en JSON
    })()
})

app.get('/productorandom', (req, res) => {
    ; (async () => {
        const contenedor = new Contenedor("./productos.txt")
        const getRandom = await contenedor.getRandom()
        res.send(getRandom) //Resultado en JSON
    })()
})

app.get('*', (req, res) => {
    res.status(404).send(`<h1 style="color: red; font-family: Roboto">La ruta escrita no es valida</h1>`)
});