const express = require('express')

const app = express()

const productos = [
    {
        id: 1,
        title: ("Crash Bandicoot"),
        price: 500,
        thumbnail: "../images/producto1"
    }
]

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${PORT}`)
})

server.on('error', error => console.log(`Error en servidor: ${error}`))


app.get('/api/productos', (req, res) => {
    console.log(`Request recibido`)

    return res.json(productos)
})

app.get("/api/productos/:id", (request, responsive) => {
    console.log("Request recibido")

    const parametro = request.params.id

    const productoEncontrado = productos.filter(e => e.id === parametro)

    return responsive.json(productoEncontrado)
})

app.post('/api/productos', (req, res) => {
    console.log("Request recibido")

    const requestBody = req.body

    productos.id = productos.length + 1

    productos.push(requestBody)

    return res.json(requestBody)
})

app.put('/api/productos/:id', (req, res) => {
    console.log("Request recibido")

    const { id } = req.params

    const productoEncontrado = productos.find(message => message.id === Number(id))

    return res.json({ message: productoEncontrado, new: req.body })
})

app.delete('/api/productos/:id', (req, res) => {
    console.log("Request recibido")
    
    const { id } = req.params

    const productoEncontrado = productos.find(message => message.id === Number(id))

    return res.json({ message: productoEncontrado })
})