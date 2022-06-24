import { mariaOptions } from "./mariaDb.js";
import knex from 'knex';
const knex2 = knex(mariaOptions);

knex2.schema.createTable("juegos", table => {
    table.increments("id")
    table.string("name", 25)
    table.float("price")
    table.integer("stock")
    table.string("photo")
    table.string("code", 10)
    table.string("desc", 50)
})
    .then(() => console.log("Tabla creada"))
    .catch(err => { console.log(err); throw err })
    .finally(() => knex2.destroy());