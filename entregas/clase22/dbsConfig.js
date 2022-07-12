import mongoose from "mongoose";

export const db = mongoose.connect("",
    { useNewUrlParser: true })

const chatSchema = new mongoose.Schema({
    author: { type: Object, required: true },
    text: { type: String, required: true, max: 100 }
}, { timestamps: true })

export const msgsModel = mongoose.model("Msgs", chatSchema);