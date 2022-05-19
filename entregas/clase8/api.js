class API {
    constructor(producto) {
        this.productos = producto
    }

    getProduct(req, res) {
        const producto = this.productos.find(e => e.id === Number(req.params.id))

        if (!producto) {
            return res.status(400).json({ Error: "Producto no encontrado." })
        } else {
            return res.json({ producto })
        }
    }

    getAll(req, res) {
        return res.json({ Productos: this.productos })
    }

    addProduct(req, res) {
        const productoNuevo = req.body

        if (!isNaN(productoNuevo.price) == false) {
            return res.json("El precio ingresado no es un número.")
        } else if (productoNuevo.title && productoNuevo.price && productoNuevo.thumbnail && Object.keys(productoNuevo).length === 3) {
            const longitudProducto = this.productos.length
            longitudProducto ? productoNuevo.id = this.productos[longitudProducto - 1].id + 1 : productoNuevo.id = 1
            this.productos.push(productoNuevo)
            return res.json(this.productos)
        } else {
            return res.status(400).json({ Error: "Complete todos los campos." })
        }
    }

    modifyProduct(req, res) {
        const productoModificado = req.body

        const producto = this.productos.find(e => e.id === Number(req.params.id))

        const productoIndex = this.productos.findIndex(e => e.id === Number(req.params.id))

        const formato = Object.keys(productoModificado).length === 3 ? true : null

        if (isNaN(productoModificado.price) == true) {
            return res.json({ Error: "El ID y el precio tienen que ser números." })
        }

        if (!producto) {
            return res.status(404).json({ Error: "Producto no encontrado." })
        }

        if (!formato) {
            return res.json({ Error: "Se tiene que ingresar un titulo, precio e imagen para modificar el producto." })
        }

        if (formato && producto) {
            productoModificado.id = this.productos[productoIndex].id
            this.productos[productoIndex] = productoModificado
            return res.json("Se modifico el producto.")
        }
    }

    deleteProduct(req, res) {
        const productoIndex = this.productos.findIndex(e => e.id === Number(req.params.id))

        if (productoIndex < 0) {
            return res.status(400).json({ Error: "Producto no encontrado." })
        }

        this.productos.splice(productoIndex, 1)
        res.json("Producto eliminado.")
    }
}

module.exports = API