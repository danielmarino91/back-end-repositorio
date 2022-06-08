import express from "express";
const { Router } = express;
import Api from "./api.js";
import { Server as IOServer } from "socket.io";
import { Server as HttpServer } from "http";
import Cart from "./cart.js";

const app = express()
const router = Router();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const PORT = process.env.PORT || 8080;

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor Http escuchando en el puerto ${PORT}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));
app.use('/api', router);

app.set("view engine", "ejs");
app.set("views", "./views")

app.use((req, res, next) => {
    res.status(404).send({ Error: -2, descripcion: `Ruta ${req.originalUrl} método ${req.method} no implementada` });
});

let productos = [
    {
        title: "Crash Bandicoot 4: It's About Time",
        price: 9000,
        thumbnail: "https://static.wikia.nocookie.net/doblaje/images/1/12/Crash_bandicoot_4_boxart.jpg/revision/latest?cb=20200622214620&path-prefix=es",
        id: 1,
    },
    {
        title: "Cyberpunk 2077",
        price: 11000,
        thumbnail: "https://www.elsotanoperdido.com/images/EntradillasExtra/Cyberpunk2077_ENtra4.jpg",
        id: 2,
    },
];

const miAPI = new Api("productos.json");
const miCarrito = new Cart("cart.json");

//Productos
router.get('/productos/:id', (req, res) => {
    return miAPI.getProduct(req, res)
})

router.get('/productos', async (req, res) => {
    return await miAPI.getProducts(req, res)
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

//Carrito
router.get('/carrito/:id/productos', (req, res) => {
    return miCarrito.getCartProducts(req, res)
})

router.post('/carrito/', async (req, res) => {
    return await miCarrito.newCart(req, res)
})

router.get('/carrito/', (req, res) => {
    return miCarrito.getCart(req, res)
})

router.post('/carrito/:id/productos', (req, res) => {
    return miCarrito.postProduct(req, res)
})

router.delete("/carrito/:id", (req, res) => {
    return miCarrito.deleteCart(req, res)
})

router.delete("/carrito/:id/productos/:id_prod", (req, res) => {
    return miCarrito.deleteCartProduct(req, res)
})