import { mariaOptions } from "./mariaDB.js";
import knex from 'knex';
const knex2 = knex(mariaOptions);

knex2("juegos").del()
    .then(() => console.log("Mensajes eliminados"))
    .catch(err => { console.log(err); throw err })
    .finally(() => knex2.destroy());