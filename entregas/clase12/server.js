const express = require('express');
const { Router } = express;
const Api = require("./api.js");
const Chat = require("./chat.js");
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");

const app = express()
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const router = Router();

const PORT = 8080;

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor Http escuchando en el puerto ${PORT}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views")

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

const myApi = new Api(productos);
const myChat = new Chat("messages.json");

io.on("connection", async socket => {

    console.log("Un nuevo cliente se ha conectado");
    socket.emit("Productos", productos);
    socket.emit("Mensajes", await myChat.getAll());

    socket.on("new-message", async data => {
        data.time = new Date().toLocaleString()
        await myChat.save(data);
        io.sockets.emit("MensajeIndividual", data)
    })

    socket.on("nuevo-producto", data => {
        io.sockets.emit("ProductoIndividual", data)
    })
})

app.use('/', router);

router.get('/productos/:id', (req, res) => {
    return myApi.getProduct(req, res)
})

router.get('/productos', (req, res) => {
    return myApi.getAll(req, res)
})

router.post('/productos', (req, res) => {
    return myApi.addProduct(req, res)
})

router.put("/productos/:id", (req, res) => {
    return myApi.modifyProduct(req, res)
})

router.delete("/productos/:id", (req, res) => {
    return myApi.deleteProduct(req, res)
})

router.get("/", (req, res) => {
    res.render("pages/index", { productos: productos });
});