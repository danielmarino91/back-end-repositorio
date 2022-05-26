const express = require('express');
const { Router } = express;
const API = require("../api.js");

const app = express()
const router = Router()

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use('/api', router);

app.set("view engine", "ejs");
app.set("views", "./views")

let productos = [
    {
        title: "Crash Bandicoot 4",
        price: 9000,
        thumbnail: "imagen1",
        id: 1
    }
];

const myApi = new API(productos);

router.get("/", (req, res) => {
    res.render("pages/index", { productos: productos });
});

router.get('/productos', (req, res) => {
    res.render("pages/productos", { productos: productos })
})

router.get('/productos/:id', (req, res) => {
    return myApi.getProduct(req, res)
})

router.post('/productos', (req, res) => {
    return myApi.addProduct(req, res)
})

router.put("/productos/:id", (req, res) => {
    return myApi.addProduct(req, res)
})

router.delete("/productos/:id", (req, res) => {
    return myApi.deleteProduct(req, res)
})
