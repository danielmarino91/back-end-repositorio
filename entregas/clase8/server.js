const express = require("express")
const { Router } = express
const API = require("./api.js")

const app = express()
const router = Router()

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando el puerto ${PORT}`)
})

server.on("error", error => console.log(`Error del servidor: ${error}`))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router)
app.use(express.static(__dirname + '/public'));

let productos = [
    {
        title: "Crash Bandicoot 4",
        price: 9000,
        thumbnail: "imagen1",
        id: 1
    }
];

const miAPI = new API(productos);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

router.get('/productos', (req, res) => {
    return miAPI.getAll(req, res)
})

router.get('/productos/:id', (req, res) => {
    return miAPI.getProduct(req, res)
})

router.post('/productos', (req, res) => {
    return miAPI.addProduct(req, res)
})

router.put("/productos/:id", (req, res) => {
    return miAPI.modifyProduct(req, res)
})

router.delete("/productos/:id", (req, res) => {
    return miAPI.deleteProduct(req, res)
})