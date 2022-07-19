import mongoose from "mongoose";

export const db = mongoose.connect("",
    { useNewUrlParser: true })

const chatSchema = new mongoose.Schema({
    author: { type: Object, required: true },
    text: { type: String, required: true },
    time: { type: String, required: true }
}, {
    versionKey: false
})

export const msgsModel = mongoose.model("Msgs", chatSchema);

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 25 },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    photo: { type: String, required: true },
    code: { type: String, required: true, max: 10 },
    desc: { type: String, required: true, max: 100 },
})

export const productsModel = mongoose.model("Products", productSchema);