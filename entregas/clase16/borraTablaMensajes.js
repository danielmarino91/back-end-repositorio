import { sqliteOptions } from "./sqlite.js";
import knex from 'knex';
const knex2 = knex(sqliteOptions);

knex2("mensajes").del()
    .then(() => console.log("Mensajes eliminados"))
    .catch(err => { console.log(err); throw err })
    .finally(() => knex2.destroy());