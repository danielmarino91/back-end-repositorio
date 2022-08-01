const socket = io.connect();

const element = document.querySelector("#element");
const myButton = document.querySelector("#myButton");

const render = (data) => {
    const html = data.map(e => {
        return (`<div style="display:flex; column-gap: 0.2rem;">
        <strong style="color:#7986CB;">${e.email}</strong> 
        <p style="color:#7986CB;">[${e.time}]</p>
        <i style="color:white;">${e.text}</i></div>`)
    }).join(" ");
    document.querySelector(".mensajes").innerHTML = html;
}

const getTemplate = async () => {
    const template = await fetch("http://localhost:8080/template.html");
    const templateData = await template.text();
    return templateData;
}

const addProducto = () => {
    const producto = {
        title: document.querySelector("#title").value,
        price: document.querySelector("#price").value,
        thumbnail: document.querySelector("#thumbnail").value,
    }
    socket.emit("nuevo-producto", producto);
    return false;
}

myButton.addEventListener("click", () => addProducto());

const addMessage = (e) => {
    const mensaje = {
        email: document.querySelector("#email").value,
        text: document.querySelector("#texto").value,
    }

    document.querySelector("#texto").value = "";
    socket.emit("new-message", mensaje);
    return false;
}

socket.on("Mensajes", data => {
    render(data);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on("MensajeIndividual", data => {
    document.querySelector(".mensajes").innerHTML += `
    <div style="display:flex; column-gap: 0.2rem;">
        <strong style="color:blue;">${data.email}</strong> 
        <p style="color:brown;">[${data.time}]</p>
        <i style="color:green;">${data.text}</i></div>               
`
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on("Productos", async data => {
    const templateData = await getTemplate();
    const template = ejs.compile(templateData);

    const templateRendered = data.map(e => {
        return template({
            title: e.title,
            price: e.price,
            thumbnail: e.thumbnail,
            id: e.id,
        })
    }).join(" ");

    element.innerHTML = templateRendered;
});

socket.on("ProductoIndividual", async data => {
    const templateData = await getTemplate();
    const template = ejs.compile(templateData);

    const templateRendered = template({
        title: data.title,
        price: data.price,
        thumbnail: data.thumbnail,
        id: data.id,
    })

    console.log(templateRendered);

    element.innerHTML += templateRendered;
})