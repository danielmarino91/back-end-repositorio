import express from "express";

import productsRouter from "./routers/productsRouter.js";
import cartRouter from "./routers/cartRouter.js";

const app = express()

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));

app.use('/api/products', productsRouter)

app.use('/api/cart', cartRouter)

app.use((req, res, next) => {
    res.status(404).send({ error: -2, descripcion: `Ruta ${req.originalUrl} método ${req.method} no implementada` });
});