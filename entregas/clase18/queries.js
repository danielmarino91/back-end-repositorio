const mensajes = [
    { text: "Hola", email: "mailfalso1@gmail.com" },
    { text: "Hola1", email: "mailfalso2@gmail.com" },
    { text: "Hola2", email: "mailfalso3@gmail.com" },
    { text: "Hola3", email: "mailfalso1@gmail.com" },
    { text: "Hola4", email: "mailfalso2@gmail.com" },
    { text: "Hola5", email: "mailfalso3@gmail.com" },
    { text: "Hola6", email: "mailfalso1@gmail.com" },
    { text: "Hola7", email: "mailfalso2@gmail.com" },
    { text: "Hola8", email: "mailfalso3@gmail.com" },
    { text: "Hola9", email: "mailfalso4@gmail.com" }
]

db.mensajes.insertMany(mensajes)

const productos = [
    {
        name: "Crash Bandicoot 4: It's About Time", price: 9000,
        stock: 10, photo: "none", code: "fhtdr", desc: "juego1"
    },
    {
        name: "Cyberpunk 2077", price: 6000,
        stock: 11, photo: "none", code: "svgdr", desc: "juego2"
    },
    {
        name: "DeathLoop", price: 10000,
        stock: 9, photo: "none", code: "crdavnts", desc: "juego3"
    },
    {
        name: "Doom Eternal", price: 3800,
        stock: 5, photo: "none", code: "dvl", desc: "juego4"
    },
    {
        name: "GTA The Trilogy", price: 12000,
        stock: 8, photo: "none", code: "nvcts1", desc: "juego5"
    },
    {
        name: "Guilty Gear Strive", price: 10000,
        stock: 7, photo: "none", code: "mbznts", desc: "juego6"
    },
    {
        name: "It Takes Two", price: 8100,
        stock: 8, photo: "none", code: "ldlfn", desc: "juego7"
    },
    {
        name: "Metroid Dread", price: 11000,
        stock: 10, photo: "none", code: "gss", desc: "juego8"
    },
    {
        name: "Nioh 2", price: 9000,
        stock: 11, photo: "none", code: "trr1", desc: "juego9"
    },
    {
        name: "Psychonauts 2", price: 9000,
        stock: 9, photo: "none", code: "zr3am", desc: "juego10"
    },
]

db.productos.insertMany(productos)

db.mensajes.find()
db.productos.count()
db.mensajes.count()

db.productos.insertOne({
    name: "Yakuza Like a Dragon", price: 4800,
    stock: 5, photo: "none", code: "zr8am", desc: "juego11"
})

db.productos.find({ price: { $lt: 1000 } })

db.productos.find({ $and: [{ price: { $gte: 1000 } }, { price: { $lte: 3000 } }] })

db.productos.find({ price: { $gt: 3000 } })

db.productos.find({}).sort({ price: 1 }).skip(2).limit(1)

db.productos.updateMany({}, { $set: { stock: 100 } })

db.productos.updateMany({ price: { $gt: 4000 } }, { $set: { stock: 0 } })

db.productos.deleteMany({ price: { $lt: 1000 } })

db.createUser(
    {
        user: "pepe",
        pwd: "asd456",
        roles: [
            { role: "read", db: "ecommerce" }
        ]
    }
)