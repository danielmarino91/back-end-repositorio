import contenedorMongoDB from "../contenedores/contenedorMongoDB.js";
import { db, cartModel } from "../dbmodels/dbsConfig.js";

class CartDAOMongoDB extends contenedorMongoDB {
    constructor() {
        super(db, cartModel)
    }

    async getCartProds(id) {
        return this.db
            .then(_ => this.model.findOne({ _id: id }))
            .then(data => {
                return data;
            })
    }

    async getCart(id) {
        return this.db
            .then(_ => this.model.findOne({ owner: id }))
            .then(data => {
                return data;
            })
    }

    async addToCart(product, id) {
        return this.db
            .then(_ => this.model.findOne({ owner: id }))
            .then(data => {
                if (data) {
                    const found = data.products.find(e => e.code === product.code);
                    if (found) {
                        found.quantity += product.quantity;
                        data.save();
                    } else {
                        data.products.push(product)
                        data.save();
                    }
                } else {
                    const newCart = new this.model();
                    newCart.owner = id;
                    newCart.products.push(product);
                    return this.db.then(_ => newCart.save())
                }
            })
    }

    async deleteCartProd(id, idProd) {
        return this.db
            .then(_ => this.model.findOne({ owner: id }))
            .then(cart => {
                cart.products.id(idProd).remove()
                cart.save();
            })
    }
}

export default CartDAOMongoDB;