import request from 'supertest';
const myReq = request('http://localhost:8080');
import { expect } from 'chai';

describe('Tests a los metodos CRUD de los productos', function() {

    it('should list all products (GET /api/products)', async function() {
        let response = await myReq.get('/api/products')
        expect(response.status).to.eql(200);
        expect(response.body.productos.length).to.eql(0);
    })

    it('should add a product (POST /api/products)', async function() {
        const product = {
            name: "name1",
            price: 10,
            stock: 10,
            photo: "photo1",
            code: "code1",
            desc: "desc1"
        }

        let response = await myReq.post('/api/products').send(product);
        expect(response.status).to.be.equal(201);

        const newProduct = response.body.product;
        expect(newProduct).to.include.keys('name', 'price', 'stock', 'photo', 'code', 'desc');
        expect(newProduct.name).to.eql(product.name);
        expect(newProduct.price).to.eql(product.price);
        expect(newProduct.stock).to.eql(product.stock);
        expect(newProduct.photo).to.eql(product.photo);
        expect(newProduct.code).to.eql(product.code);
        expect(newProduct.desc).to.eql(product.desc);

        let allProducts = await myReq.get('/api/products')
        expect(allProducts.body.productos.length).to.eql(1);
    })

    it('should return an status 400 if product format is wrong (POST /api/products)', async () => {
        const product = {
            name: "name2",
            price: 20,
            stock: 20,
            photo: "photo2",
            code: "code2",
            desc: "desc2"
        }

        let response = await myReq.post('/api/products').send(product);
        expect(response.status).to.be.equal(400);
    })

    it('shoud list product with given id (GET /api/products/:id)', async function() {
        let allProducts = await myReq.get('/api/products')
        let prodId = allProducts.body.productos[0].id;

        let productResponse = await myReq.get(`/api/products/${prodId}`)
        let product = productResponse.body.producto;
        expect(productResponse.status).to.eql(200);
        expect(product.id).to.eql(prodId);
    })

    it('should return an status 404 if product with given id does not exist (GET /api/products/:id)', async () => {
        let prodId = '6320cdfnoexia86897262ac8'

        let productResponse = await myReq.get(`/api/products/${prodId}`)
        expect(productResponse.status).to.eql(404);
    })

    it('should update product with given id (PUT /api/products/:id)', async function() {
        let allProducts = await myReq.get('/api/products')
        let prodId = allProducts.body.productos[0].id;

        const updatedProduct = {
            name: "name3",
            price: 30,
            stock: 30,
            photo: "photo3",
            code: "code3",
            desc: "desc3"
        }

        let response = await myReq.put(`/api/products/${prodId}`).send(updatedProduct);
        expect(response.status).to.eql(201);
        expect(response.body.product).to.eql(updatedProduct);
    })

    it('should delete product with given id (DELETE /api/products/:id)', async function() {
        let allProducts = await myReq.get('/api/products');
        let prodId = allProducts.body.productos[0].id;

        let response = await myReq.delete(`/api/products/${prodId}`);
        allProducts = await myReq.get('/api/products');

        expect(response.status).to.eql(200);
        expect(allProducts.body.productos.length).to.eql(0);
    })

    before(function() {
        console.log('\n Test start')
    })

    after(function() {
        console.log('\n Test end')
    })
})