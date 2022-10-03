let x = {
    name: "Objeto",
    price: 100,
    stock: 10,
    photo: "photo",
    code: "code",
    desc: "desc"
}

const getJson = () => {
    return JSON.stringify(x, null, 2);
}

console.log(getJson());