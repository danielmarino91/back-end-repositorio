import normalizr from 'normalizr';
import { normalize, denormalize, schema } from 'normalizr';
import { readFile, writeFile } from "fs/promises";

const myJson = {
    "id": "mensajes",
    "mensajes": [
    ]
}
const newPS = (value, parent, key) => {
    console.log(parent.author)
}

const authorSchema = new normalizr.schema.Entity('author', {}, { idAttribute: 'alias' })

const textSchema = new normalizr.schema.Entity('text', { 'author': authorSchema }, { idAttribute: '_id', });

const mensajeSchema = new normalizr.schema.Entity('mensajes', { 'mensajes': [textSchema] })

const normalizedChat = normalizr.normalize(myJson, mensajeSchema);

console.log('#### LONGITUD DE ARCHIVO SIN NORMALIZAR ####')
console.log(JSON.stringify(myJson, null, 2).length)
console.log('#### LONGITUD DE ARCHIVO NORMALIZADO ####')
console.log(JSON.stringify(normalizedChat, null, 2).length)

export const normalizedMessages = (data) => {
    return normalize(data, chatSchema)
}