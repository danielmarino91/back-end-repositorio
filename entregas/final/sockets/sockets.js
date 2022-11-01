import contenedorMongo from "../contenedores/contenedorMongoDB.js";
import { productService } from "../controllers/productsController.js";
import { db, msgsModel } from "../dbmodels/dbsConfig.js";

const myChat = new contenedorMongo(db, msgsModel);

export const ioSockets = (io) => {
    io.on("connection", async socket => {
        console.log("Se conecto un nuevo usuario");

        socket.emit("Mensajes", await myChat.getElems());
        socket.emit("Productos", await productService.getProducts());

        socket.on("new-message", async data => {
            data.time = new Date().toLocaleString();
            io.sockets.emit("MensajeIndividual", data)
        })

        socket.on("nuevo-producto", async data => {
            const prods = await productService.getProducts();
            if (prods.length === 0) {
                data.id = 1;
            } else {
                data.id = prods[prods.length - 1].id + 1;
            }
            io.sockets.emit("ProductoIndividual", data)
        })
    })
}