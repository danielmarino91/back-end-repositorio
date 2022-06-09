const fs = require("fs")

class Contenedor {
    constructor(file) {
        this.file = file
    }

    async save(item) {
        let data
        try {
            data = await fs.promises.readFile(`./${this.file}`)
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

        return fs.promises.writeFile(`./${this.file}`, JSON.stringify(data, null, 2))
    }

    async getById(id) {
        let data
        try {
            data = await fs.promises.readFile(`./${this.file}`)
            data = JSON.parse(data)
        } catch (error) {
            data = []
            console.log(`No se encontro el archivo (${error})`)
        }

        return data.find(item => item.id === id)
    }

    async getRandom() {
        let data
        try {
            data = await fs.promises.readFile(`./${this.file}`)
            data = JSON.parse(data)
        } catch (error) {
            data = []
            console.log(`No se encontro el archivo (${error})`)
        }

        let randomId = parseInt(Math.random() * (4 - 1) + 1)
        return data.find(item => item.id === randomId)
    }

    async getAll() {
        let data
        try {
            data = await fs.promises.readFile(`./${this.file}`)
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
            data = await fs.promises.readFile(`./${this.file}`)
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

        return fs.promises.writeFile(`./${this.file}`, JSON.stringify(data, null, 2))
    }

    async deleteAll() {
        console.log(`Se vacio la lista de productos de ${this.file}`)
        return fs.promises.writeFile(`./${this.file}`, '')
    }
}

module.exports = Contenedor