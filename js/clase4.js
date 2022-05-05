const fs = require("fs");

class Contenedor
{
    constructor(archivo)
    {
        this.archivo = archivo;
    }

    save(obj)
    {
        let archivo = this.archivo;
        fs.promises.readFile(`./${archivo}`, "utf-8")
            .then(con =>
            {
                if (con.length) {
                    let textLength = JSON.parse(con).length;
                    obj.id = JSON.parse(con)[textLength - 1].id + 1;
                    async function agregar()
                    {
                        try {
                            let nuevoContenido = JSON.parse(con);
                            nuevoContenido.push(obj);
                            await fs.promises.writeFile(`./${archivo}`, JSON.stringify(nuevoContenido, null, 2))
                            console.log(`ID: ${obj.id}`);
                        }
                        catch (e) {
                            console.log(e);
                        }
                    }
                    agregar();
                } else {
                    obj.id = 1;
                    async function iniciarJson()
                    {
                        try {
                            let nuevoContenido = [obj];
                            await fs.promises.writeFile(`./${archivo}`, JSON.stringify(nuevoContenido, null, 2))
                            console.log(`ID: ${obj.id}`);
                        }
                        catch (err) {
                            console.log("Error", err);
                        }
                    }
                    iniciarJson();
                }
            })
            .catch((err) =>
            {
                console.log(err);
            })
    }

    getById(id)
    {
        let archivo = this.archivo;
        fs.promises.readFile(`./${archivo}`, "utf-8")
            .then(con =>
            {
                const resultado = JSON.parse(con).find(element => element.id === id)
                if (resultado) {
                    console.log(resultado);
                } else {
                    console.log(null);
                }
            })
            .catch(err =>
            {
                console.log("No se pudo encontrar", err)
            })
    }

    getAll()
    {
        let archivo = this.archivo;
        fs.promises.readFile(`./${archivo}`, "utf-8")
            .then(con =>
            {
                console.log(JSON.parse(con))
            })
            .catch(err =>
            {
                console.log("No hay contenido", err)
            })
    }

    deleteById(id)
    {
        let archivo = this.archivo;
        fs.promises.readFile(`./${archivo}`, "utf-8")
            .then(con =>
            {
                let contenidoFiltrado = JSON.parse(con).filter(elem => elem.id !== id)
                let existeId = JSON.parse(con).some(elem => elem.id === id);
                async function eliminar()
                {
                    try {
                        await fs.promises.writeFile(`./${archivo}`, JSON.stringify(contenidoFiltrado, null, 2))
                        !existeId ? console.log("No se encontro el objeto") : console.log("Objeto borrado");
                    }
                    catch (err) {
                        console.log("No se puede eliminar", err)
                    }
                }
                eliminar();
            })
            .catch(err =>
            {
                console.log("Error", err)
            })
    }

    deleteAll()
    {
        let archivo = this.archivo;
        async function borrarTodo()
        {
            try {
                await fs.promises.writeFile(`./${archivo}`, "");
                console.log("Contenido del archivo borrado");
            }
            catch (err) {
                console.log("No se pudo eliminar el contenido del archivo", err)
            }
        }
        borrarTodo();
    }
}

const contenido = new Contenedor("test.txt");

contenido.save({ title: "producto", precio: 500, thumbnail: "www.producto.com/producto.png" });