import fs from "fs";

class Api {
    constructor(archivo) {
        this.archivo = archivo;
    }

    async getProducts(req, res) {
        try {
            const data = await fs.promises.readFile(this.archivo, "utf-8")
            const objetos = data ? (JSON.parse(data)) : []
            res.json({ productos: objetos });
        }
        catch (error) {
            console.log(error)
        }
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.archivo, "utf-8")
            const objetos = data ? (JSON.parse(data)) : []
            return objetos;
        }
        catch (error) {
            console.log(error)
        }
    }

    async getProduct(req, res) {
        const objetos = await this.getAll();
        const producto = objetos.find(elem => elem.id === Number(req.params.id))
        if (producto) {
            res.json({ producto })
        } else {
            res.status(404).json({ error: "Producto no encontrado" })
        }
    }

    async addProduct(req, res) {
        const productoNuevo = req.body;
        let archivo = this.archivo;

        if (productoNuevo.name && productoNuevo.price && productoNuevo.photo &&
            productoNuevo.desc && productoNuevo.code && productoNuevo.stock && productoNuevo.pass === "123456" &&
            Object.keys(productoNuevo).length === 7) {
            const objetos = await this.getAll();
            if (objetos.length) {
                let longit = objetos.length;
                longit ? productoNuevo.id = objetos[longit - 1].id + 1 : productoNuevo.id = 1;
                productoNuevo.timestamp = Date.now();
                delete productoNuevo.pass;
                async function add() {
                    try {
                        let contenidoNuevo = objetos;
                        contenidoNuevo.push(productoNuevo);
                        await fs.promises.writeFile(archivo, JSON.stringify(contenidoNuevo, null, 2))
                        res.json({ POST: "OK" })
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
                add();
            } else {
                productoNuevo.id = 1;
                productoNuevo.timestamp = Date.now();
                async function startJSON() {
                    try {
                        let contenidoNuevo = [productoNuevo];
                        await fs.promises.writeFile(archivo, JSON.stringify(contenidoNuevo, null, 2))
                        res.json({ POST: "OK" })
                    }
                    catch (error) {
                        console.log("Hubo un error", error);
                    }
                }
                startJSON();
            }
        } else {
            return res.status(400).send({ error: "Parámetros incorrectos" });
        }
    }

    async modifyProduct(req, res) {
        let archivo = this.archivo;
        const objetos = await this.getAll();
        const prodMod = req.body;

        const format = prodMod.name && prodMod.price && prodMod.photo &&
            prodMod.desc && prodMod.code && prodMod.stock && prodMod.pass === "123456" &&
            Object.keys(prodMod).length === 7 ? true : null;

        const prodIndex = objetos.findIndex(elem => elem.id === Number(req.params.id))
        const producto = objetos.find(elem => elem.id === Number(req.params.id));

        if (format && producto) {
            let newProducts = objetos;
            prodMod.id = objetos[prodIndex].id;
            delete prodMod.pass;
            newProducts[prodIndex] = prodMod;
            async function modify() {
                try {
                    await fs.promises.writeFile(archivo, JSON.stringify(newProducts, null, 2))
                    return res.send("Producto modificado");
                }
                catch (e) {
                    console.log(e);
                }
            }
            modify();
        }

        if (!producto) {
            return res.status(404).send({ Error: "Producto no encontrado" })
        }

        if (!format) {
            res.send({ Error: "El formato del producto no es correcto" })
        }
    }

    async deleteProduct(req, res) {
        const pass = req.body.pass;
        const objetos = await this.getAll();
        const archivo = this.archivo;

        if (pass === "123456") {
            const prodIndex = objetos.findIndex(elem => elem.id === Number(req.params.id));

            if (prodIndex < 0) {
                return res.status(404).send({ Error: "Producto no encontrado" })
            }

            const newProducts = objetos;
            newProducts.splice(prodIndex, 1);
            async function release() {
                try {
                    await fs.promises.writeFile(archivo, JSON.stringify(newProducts, null, 2))
                    return res.send("Producto eliminado");
                }
                catch (e) {
                    console.log(e);
                }
            }
            release();
        } else {
            res.json({ Mensaje: "No estás autorizado a acceder a esta ruta" });
        }
    }
}

export default Api;