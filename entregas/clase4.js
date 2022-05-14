const fs = require("fs")

class Contenedor {
    constructor(file) {
        this.file = file
    }

    async save(item) {
        let data
        try {
            data = await fs.promises.readFile(`../textos/${this.file}`)
            data = JSON.parse(data)
            console.log(`${this.file} guardado!`)
        } catch (error) {
            data = []
            console.log(`Se ha creado ${this.file}`)
        }

        const lastItem = data[data.length - 1]

        let id = 1

        if (lastItem) {
            id = lastItem.id + 1
        }

        item.id = id

        data.push(item)

        return fs.promises.writeFile(`../textos/${this.file}`, JSON.stringify(data, null, 2))
    }

    async getById(id) {
        let data
        try {
            data = await fs.promises.readFile(`../textos/${this.file}`)
            data = JSON.parse(data)
        } catch (error) {
            data = []
            console.log(`No se encontro el archivo (${error})`)
        }

        return data.find(item => item.id === id)
    }

    async getAll() {
        let data
        try {
            data = await fs.promises.readFile(`../textos/${this.file}`)
            data = JSON.parse(data)
        } catch (error) {
            data = []
            console.log(`Error (${error})`)
        }

        return data
    }

    async deleteById(id) {
        let data
        try {
            data = await fs.promises.readFile(`../textos/${this.file}`)
            data = JSON.parse(data)
        } catch (error) {
            data = []
            console.log(`Error (${error})`)
        }

        const productIndex = data.findIndex(item => item.id === id)

        if (productIndex === -1) {
            console.log(`No se encontro producto con el ID ${id}`)
            return
        }

        data.splice(productIndex, 1)

        console.log(`Se elimino el producto de ID ${id}`)

        return fs.promises.writeFile(`../textos/${this.file}`, JSON.stringify(data, null, 2))
    }

    async deleteAll() {
        console.log(`Se vacio la lista de productos de ${this.file}`)
        return fs.promises.writeFile(`../textos/${this.file}`, '')
    }
}

module.exports = Contenedor

    ; (async () => {
        const contenedor = new Contenedor("productos.txt")

        const newProduct = {
            title: 'Producto 1',
            price: 10.0,
            thumbnail: 'https://image.com/producto1'
        }

        await contenedor.save(newProduct)

        const getProductID = await contenedor.getById(1)
        console.log(getProductID)

        const getAllProductsID = await contenedor.getAll()
        console.log(getAllProductsID)

        await contenedor.deleteById(1)

        await contenedor.deleteAll()
    })()