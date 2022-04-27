class Usuario
{
    constructor(nombre, apellido, libro, mascotas)
    {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libro = libro;
        this.mascotas = mascotas;
    }

    getFullName()
    {
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(varMascota)
    {
        this.mascotas.push(varMascota);
    }

    countMascotas()
    {
        return this.mascotas.length;
    }

    addBook(varName, varAuthor)
    {
        return this.libros.push({ nombre: varName, autor: varAuthor });
    }

    getBookNames()
    {
        let books = [];
        this.libro.forEach(e => { books.push(e.nombre) });
        return books;
    }
}

const usuario = new Usuario("Daniel", "Mariño", [{ nombre: "A Game of Thrones", autor: "G. R. R. Martin" }, { nombre: "A Clash of Kings", autor: "G. R. R. Martin" }, { nombre: "A Storm of Swords", autor: "G. R. R. Martin" }], ["Wally", "Ronnie", "Hara"])

console.log(`Nombre completo: ${usuario.getFullName()}`);
console.log(`Cantidad de mascotas: ${usuario.countMascotas()}`);
console.log(`Libros: ${usuario.getBookNames()}`);
