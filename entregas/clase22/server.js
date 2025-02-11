import express from "express";
const { Router } = express;
import { db, msgsModel } from "./dbsConfig.js";
import contenedorMongo from "./contenedorMongoDB.js";
import { Server as IOServer } from "socket.io";
import { Server as HttpServer } from "http";
import cors from "cors";
import { randomData } from "./fakerRP.js";
import { normalizedMessages } from "./normalizr.js";
import { readFile, writeFile } from "fs/promises";

const app = express()
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const router = Router();

const PORT = process.env.PORT || 8080;

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views")
app.use(cors());

const myChat = new contenedorMongo(db, msgsModel);

io.on("connection", async socket => {
    console.log("Un nuevo cliente se ha conectado");

    socket.emit("Mensajes", await myChat.getElems());
    socket.on("new-message", async data => {
        data.time = new Date().toLocaleString();
        io.sockets.emit("MensajeIndividual", data)
    })
})

router.get('/productos-test', async (req, res) => {
    return res.json(randomData(5));
})

router.get('/mensajes', async (req, res) => {
    return await myChat.getElems(req, res)
})

router.post('/mensajes', async (req, res) => {
    return await myChat.postElem(req, res)
})

router.get("/", (req, res) => {
    res.render("pages/index.ejs");
});

app.use('/api', router);
app.use((req, res, next) => {
    res.status(404).send({ error: -2, descripcion: `Ruta ${req.originalUrl} método ${req.method} no implementada` });
});