import axios from "axios";

const host = 'http://localhost:8080/api';
const testProduct = {
    name: "Producto de prueba 1",
    price: 10,
    stock: 10,
    photo: "photo1",
    code: "code1",
    desc: "desc1"
}

const testModProduct = {
    name: "Producto de prueba 2",
    price: 20,
    stock: 20,
    photo: "photo2",
    code: "code2",
    desc: "desc2"
}

const sameStatus = (resStatus, preStatus) => {
    return resStatus === preStatus
}

const getProducts = async () => {
    return await axios.get(`${host}/products`)
        .then(response => {
            console.log('Productos listados')
            console.log(response.data);
            console.log(`La respuesta tiene el status esperado: ${sameStatus(response.status, 200)}`)
        })
        .catch(err => {
            console.log(err)
        })
}

const addProduct = async () => {
    return await axios.post(`${host}/products`, testProduct)
        .then(response => {
            console.log('Producto añadido')
            console.log(response.data);
            console.log(`La respuesta tiene el status esperado: ${sameStatus(response.status, 201)}`)
        })
        .catch(err => {
            console.log(err)
        })
}

const getProduct = async () => {
    return await axios.get(`${host}/products`)
        .then(response => {
            const products = response.data;
            console.log(products.productos[0].id)
            axios.get(`${host}/products/${products.productos[0].id}`)
                .then(product => {
                    console.log('Producto mostrado')
                    console.log(product.data);
                    console.log(`La respuesta tiene el status esperado: ${sameStatus(product.status, 200)}`)
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err)
        })
}

const updatedProduct = async () => {
    return await axios.get(`${host}/products`)
        .then(response => {
            const products = response.data;
            axios.put(`${host}/products/${products.productos[0].id}`, testModProduct)
                .then(response => {
                    console.log('Producto modificado')
                    console.log(response.data);
                    console.log(`La respuesta tiene el status esperado: ${sameStatus(response.status, 201)}`)
                })
                .catch(err => {
                    console.log(err);
                })
        })
}

const deleteProduct = async () => {
    return await axios.get(`${host}/products`)
        .then(response => {
            const products = response.data;
            axios.delete(`${host}/products/${products.productos[0].id}`)
                .then(response => {
                    console.log('Producto eliminado')
                    console.log(response.data);
                    console.log(`La respuesta tiene el status esperado: ${sameStatus(response.status, 200)}`)
                })
                .catch(err => {
                    console.log(err);
                })
        })
}

getProducts();
addProduct();
getProduct();
updatedProduct();
deleteProduct();